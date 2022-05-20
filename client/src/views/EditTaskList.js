import { useState } from "react";
import { Alert, Container, Button, Form, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { selectCurrentTaskList, setCurrentTaskList } from "../state/editSlice";
import { useModifyTaskListMutation } from "../state/taskListsApiSlice";
import { Task } from "./components/Task";

export const EditTaskList = ({ setCurrentPage }) => {
    const dispatch = useDispatch();

    const [err, setErr] = useState(undefined);
    const selectedTaskList = useSelector(selectCurrentTaskList);
    const [modifyTaskListFn] = useModifyTaskListMutation();


    const [stateTaskList, setStateTaskList] = useState(selectedTaskList);

    if (!stateTaskList) {
        return "betöltés"
    }

    console.log("loaded tasklist", stateTaskList);

    function handleCancel() {
        dispatch(setCurrentTaskList({ taskList: null }));
        setCurrentPage('myTaskLists');
    }

    function handleChange(event) {
        setStateTaskList({ ...stateTaskList, [event.target.name]: event.target.value });
    }

    function toggleStatus() {
        setStateTaskList({ ...stateTaskList, status: stateTaskList.status === "published" ? "draft" : "published" });
    }

    async function handleSubmit(event) {
        event.preventDefault();

        try {
            const result = await modifyTaskListFn({ ...stateTaskList });
            if (result.data) {
                dispatch(setCurrentTaskList({ taskList: result.data }));
                setStateTaskList(result.data);
            }

            if (result.error) {
                console.error(result.error.data?.errors[0]?.message || "Unexpected error");
                setErr(result.error.data?.errors[0]?.message || "Unexpected error");
                return;
            }
        } catch (err) {
            console.error(err);
        }
    }

    const canSubmit = stateTaskList.title && stateTaskList.status;
    const createdAtDate = new Date(stateTaskList.createdAt);
    const updatedAtDate = new Date(stateTaskList.updatedAt);
    return (
        <Container className="pt-3">
            <Form onSubmit={handleSubmit}>
                {err && <Alert variant="danger">{err}</Alert>}
                <Row>
                    <div className="d-flex justify-content-end">
                        <Button variant="success" className="me-2" type="submit" disabled={!canSubmit}>Mentés</Button>
                        <Button variant="danger" onClick={() => handleCancel()}>Szerkesztés lezárása</Button>
                    </div>
                </Row>
                <Form.Label>Feladatsor címe:</Form.Label>
                <Form.Control
                    type="text"
                    id="title"
                    name="title"
                    value={stateTaskList.title}
                    onChange={handleChange}
                    required
                />
                <Form.Check
                    type="switch"
                    id="status"
                    checked={stateTaskList.status === "published"}
                    onChange={() => toggleStatus()}
                    label="Publikálva"
                />
                <Form.Label>Leírás:</Form.Label>
                <Form.Control
                    type="text"
                    id="description"
                    name="description"
                    value={stateTaskList.description}
                    onChange={handleChange}
                    required
                />
                <div>Létrehozás: {`${createdAtDate.getFullYear()}. ${createdAtDate.getMonth()}. ${createdAtDate.getDate()}`}</div>
                <div>Módosítás: {`${updatedAtDate.getFullYear()}. ${updatedAtDate.getMonth()}. ${updatedAtDate.getDate()}`}</div>
                Maximum összpontszám: {stateTaskList?.tasks?.reduce((acc, t) => acc + t.points, 0)}
                <div className="border rounded p-3">
                    {stateTaskList?.tasks?.map((task, taskId) => {
                        return <div key={taskId}>
                            <Task
                                taskId={task.id}
                                postFixNode={<>
                                    <div>{task.points} pont</div>
                                    <div>
                                        <div>Megjegyzés:
                                            <br />
                                            {task.notes}
                                        </div>
                                    </div>
                                </>}
                            />
                        </div>
                    })}
                </div>
            </Form>
        </Container >
    );
}
import { useRef, useState } from "react";
import { Alert, Container, Button, Form, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { selectCurrentTaskList, setCurrentTaskList } from "../state/editSlice";
import { Task } from "./components/Task";

export const EditTaskList = ({ setCurrentPage }) => {
    const dispatch = useDispatch();

    const [err, setErr] = useState(undefined);
    const selectedTaskList = useSelector(selectCurrentTaskList);

    const [stateTaskList, setStateTaskList] = useState(selectedTaskList);

    const { title, status, description, tasks, createdAt, updatedAt } = stateTaskList;



    function handleCancel() {
        dispatch(setCurrentTaskList({ taskList: null }));
        setCurrentPage('myTaskLists');
    }

    function handleChange(event) {
        setStateTaskList({ ...stateTaskList, [event.target.name]: event.target.value });
    }

    function toggleStatus() {
        setStateTaskList({ ...stateTaskList, status: status === "published" ? "draft" : "published" });
    }

    async function handleSubmit(event) {
        event.preventDefault();

        try {
            console.log({ ...stateTaskList, });
            // const result = await loginFn({ strategy: 'local', email: email, password: password });
            // if (result.data) {
            //     dispatch(setCredentials(result.data));
            // }

            // if (result.error) {
            //     console.error(result.error.data?.errors[0]?.message || "Unexpected error");
            //     setErr(result.error.data?.errors[0]?.message || "Unexpected error");
            //     return;
            // }
        } catch (err) {
            console.error(err);
        }
    }

    const canSubmit = title && status;
    const createdAtDate = new Date(createdAt);
    const updatedAtDate = new Date(updatedAt);
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
                    value={title}
                    onChange={handleChange}
                    required
                />
                <Form.Check
                    type="switch"
                    id="status"
                    checked={status === "published"}
                    onClick={() => toggleStatus()}
                    label="Publikálva"
                />
                <Form.Label>Leírás:</Form.Label>
                <Form.Control
                    type="text"
                    id="description"
                    name="description"
                    value={description}
                    onChange={handleChange}
                    required
                />
                <div>Létrehozás: {`${createdAtDate.getFullYear()}. ${createdAtDate.getMonth()}. ${createdAtDate.getDate()}`}</div>
                <div>Módosítás: {`${updatedAtDate.getFullYear()}. ${updatedAtDate.getMonth()}. ${updatedAtDate.getDate()}`}</div>
                Maximum összpontszám: {tasks.reduce((acc, t) => acc + t.points, 0)}
                <div className="border rounded p-3">
                    {tasks.map((task, taskId) => {
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
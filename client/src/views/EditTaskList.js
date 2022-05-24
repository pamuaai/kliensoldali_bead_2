import { useState } from "react";
import { Alert, Container, Button, Form, Row, Accordion } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { selectCurrentTaskList, setCurrentTaskList } from "../state/editSlice";
import { useGetAllTaskListsQuery, useModifyTaskListMutation } from "../state/taskListsApiSlice";
import { Task } from "./components/Task";

export const EditTaskList = ({ setCurrentPage }) => {
    const dispatch = useDispatch();
    const [err, setErr] = useState(undefined);
    const [modifyTaskListFn] = useModifyTaskListMutation();
    const [stateTaskList, setStateTaskList] = useState(useSelector(selectCurrentTaskList));
    const { refetch } = useGetAllTaskListsQuery();

    if (!stateTaskList) {
        return "betöltés"
    }

    function handleCancel() {
        dispatch(setCurrentTaskList({ taskList: null }));
        setCurrentPage('myTaskLists');
    }

    function handleChange(event) {
        setStateTaskList({ ...stateTaskList, [event.target.name]: event.target.value });
    }

    function changeTaskPoints(taskId, event) {
        setStateTaskList({ ...stateTaskList, tasks: [...stateTaskList.tasks.map((t) => t.id === taskId ? { ...t, points: parseInt(event.target.value) } : t)] });
    }

    function changeTaskNotes(taskId, event) {
        setStateTaskList({ ...stateTaskList, tasks: [...stateTaskList.tasks.map((t) => t.id === taskId ? { ...t, notes: event.target.value } : t)] });
    }

    function removeTask(taskId) {
        setStateTaskList({ ...stateTaskList, tasks: [...stateTaskList.tasks.filter((t) => t.id !== taskId)] });
    }

    function toggleStatus() {
        setStateTaskList({ ...stateTaskList, status: stateTaskList.status === "published" ? "draft" : "published" });
    }

    async function handleSubmit(event) {
        event.preventDefault();

        try {
            const result = await modifyTaskListFn(stateTaskList);
            if (result.data) {
                dispatch(setCurrentTaskList({ taskList: result.data }));
                setStateTaskList(result.data);
                refetch();
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
        <Container className="py-3">
            <Form onSubmit={handleSubmit}>
                {err && <Alert variant="danger">{err}</Alert>}
                <h4>Feladatsor címe:</h4>
                <Form.Control
                    type="text"
                    id="title"
                    name="title"
                    value={stateTaskList.title}
                    onChange={handleChange}
                    required
                />
                <h4>Publikálva:</h4>
                <Form.Check
                    type="switch"
                    id="status"
                    checked={stateTaskList.status === "published"}
                    onChange={() => toggleStatus()}
                />
                <h4>Leírás:</h4>
                <Form.Control
                    className="mb-3"
                    type="text"
                    id="description"
                    name="description"
                    value={stateTaskList.description}
                    onChange={handleChange}
                    required
                />
                <h4>Létrehozás: {`${createdAtDate.getFullYear()}. ${createdAtDate.getMonth()}. ${createdAtDate.getDate()}`}</h4>
                <h4>Módosítás: {`${updatedAtDate.getFullYear()}. ${updatedAtDate.getMonth()}. ${updatedAtDate.getDate()}`}</h4>
                <h4>Maximum összpontszám: {stateTaskList?.tasks?.reduce((acc, t) => acc + t.points, 0)}</h4>
                <Accordion className="mt-3" def>
                    <Accordion.Item eventKey="0">
                        <Accordion.Header>
                            <h4>Feladatok ({stateTaskList.tasks.length} db)</h4>
                        </Accordion.Header>
                        <Accordion.Body>
                            {stateTaskList?.tasks?.map((task, taskId) => {
                                return <div key={taskId}>
                                    <Task
                                        taskId={task.id}
                                        postFixNode={<>
                                            <Form.Label>Pontérték:</Form.Label>
                                            <Form.Control
                                                type="number"
                                                id={`task-${taskId}-points`}
                                                name={`task-${taskId}-points`}
                                                defaultValue={task.points}
                                                onChange={(e) => changeTaskPoints(task.id, e)}
                                                required
                                            />
                                            <Form.Label className="mt-3">Megjegyzés:</Form.Label>
                                            <Form.Control
                                                type="text"
                                                id={`task-${taskId}-notes`}
                                                name={`task-${taskId}-notes`}
                                                defaultValue={task.notes}
                                                onChange={(e) => changeTaskNotes(task.id, e)}
                                            />
                                            <Button variant="danger" className="mt-3" onClick={() => removeTask(task.id)}>Törlés</Button>
                                        </>}
                                    />
                                </div>
                            })}
                        </Accordion.Body>
                    </Accordion.Item>
                </Accordion>
                <Row className="mt-3">
                    <div className="d-flex justify-content-end">
                        <Button variant="success" className="me-2" type="submit" disabled={!canSubmit}>Mentés</Button>
                        <Button variant="danger" onClick={() => handleCancel()}>Szerkesztés lezárása</Button>
                    </div>
                </Row>
            </Form>
        </Container >
    );
}
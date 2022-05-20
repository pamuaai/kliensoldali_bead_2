import { Alert, Container, Accordion, Row, Button } from "react-bootstrap";
import { useAddTaskListMutation, useGetAllTaskListsQuery } from "../state/taskListsApiSlice";
import { Task } from "./components/Task";
import { useDispatch, useSelector } from "react-redux";
import { selectCurrentTaskList, setCurrentTaskList } from "../state/editSlice";

export const TaskListBank = ({ setCurrentPage }) => {
    const dispatch = useDispatch();
    const selectedTaskList = useSelector(selectCurrentTaskList);
    const { data: taskLists, isLoading } = useGetAllTaskListsQuery();
    const [addNewTaskListFn] = useAddTaskListMutation();


    if (isLoading) {
        return "Betöltés alatt...";
    }
    if (!taskLists) {
        return <Container>
            <Alert variant="warning">
                Nincsenek feladatok
            </Alert>
        </Container>;
    }

    function handleSelect(tl) {
        dispatch(setCurrentTaskList({ taskList: tl }));
        setCurrentPage('editTaskList');
    }

    async function createNewTaskList() {
        try {

            const result = await addNewTaskListFn({
                "title": "new tasklist",
                "description": "",
                "status": "draft",
                "tasks": []
            });
            if (result.error) {
                console.error(result.error.data?.errors[0]?.message || "Unexpected error");
                return;
            }
            if (result.data?.id) {
                dispatch(setCurrentTaskList({ taskList: result.data }));
            }

            setCurrentPage('editTaskList');
        } catch (err) {
            console.error(err);
        }
    }

    return (
        <Container className="py-3">
            <Row>
                <h1 className="d-inline-block">Feladatsoraim</h1>
            </Row>
            <Button variant="success" className="mb-2" onClick={() => createNewTaskList()}>Új feladatsor</Button>
            <Accordion>
                {taskLists.data.map((taskList, id) => {
                    const createdAtDate = new Date(taskList.createdAt);
                    const updatedAtDate = new Date(taskList.updatedAt);
                    return <Accordion.Item eventKey={id} key={id}>
                        <Accordion.Header >
                            <div className="d-inline-block text-truncate w-100">
                                <h2 className={`d-inline me-3 ${taskList.status === 'published' ? 'text-success' : 'text-warning'}`}>{taskList.title}</h2>
                                <span className="me-2">{taskList.status === 'published' ? 'publikálva' : 'vázlat'}</span>
                                <span className="me-2">Feladatok: {taskList.tasks.length}</span>
                                <span className="me-2">Létrehozás: {`${createdAtDate.getFullYear()}. ${createdAtDate.getMonth()}. ${createdAtDate.getDate()}`}</span>
                                <span className="me-2">Módosítás: {`${updatedAtDate.getFullYear()}. ${updatedAtDate.getMonth()}. ${updatedAtDate.getDate()}`}</span>
                                <div className="me-2">
                                    {taskList.description}
                                </div>
                            </div>
                        </Accordion.Header>
                        <Accordion.Body>
                            <div>
                                Maximum összpontszám: {taskList.tasks.reduce((acc, t) => acc + t.points, 0)}
                            </div>
                            <div>
                                {taskList.tasks.map((task, taskId) => {
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
                            {!selectedTaskList &&
                                <Button variant="success" onClick={() => handleSelect(taskList)}>Feladatsor szerkesztése</Button>
                            }
                        </Accordion.Body>
                    </Accordion.Item>
                })}
            </Accordion>
        </Container >
    );
}
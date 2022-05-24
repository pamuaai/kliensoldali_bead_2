import { useGetSomeTasksQuery } from "../state/tasksApiSlice";
import { Button, Alert, Container, Accordion, Row } from "react-bootstrap";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { selectCurrentUser } from "../state/authSlice";
import { Task } from "./components/Task";
import { useAddTaskListMutation, useGetAllTaskListsQuery, useModifyTaskListMutation } from "../state/taskListsApiSlice";
import { selectCurrentTaskList, setCurrentTaskList } from "../state/editSlice";

export const TaskBank = () => {
    const limit = 10;
    const dispatch = useDispatch();
    const [offset, setOffset] = useState(0);
    const [modifyTaskListFn] = useModifyTaskListMutation();
    const [addTaskListFn] = useAddTaskListMutation();
    const [stateTaskList, setStateTaskList] = useState(useSelector(selectCurrentTaskList));
    const user = useSelector(selectCurrentUser);
    const { data: currentTasks, isLoading } = useGetSomeTasksQuery(offset, limit);
    const { refetch } = useGetAllTaskListsQuery();

    if (isLoading) {
        return "Betöltés alatt...";
    }

    if (!currentTasks) {
        return <Container>
            <Alert variant="warning">
                Nincsenek feladatok
            </Alert>
        </Container>;
    }

    const constructModifiedTaskList = (taskToAdd) => {
        if (!stateTaskList) {
            return {
                userId: user.id,
                title: "new tasklist",
                description: "new description",
                status: "draft",
                tasks: [
                    {
                        id: taskToAdd.id,
                        notes: "",
                        points: 0,
                    }
                ]
            };
        }

        return {
            ...stateTaskList,
            tasks: [
                ...stateTaskList?.tasks,
                {
                    id: taskToAdd.id,
                    notes: "",
                    points: 0,
                }
            ]
        };
    };

    async function addTaskToEditedList(taskToAdd) {
        const newTaskList = constructModifiedTaskList(taskToAdd);
        try {

            const result = stateTaskList ? await modifyTaskListFn(newTaskList) : await addTaskListFn(newTaskList);
            if (result.data) {
                dispatch(setCurrentTaskList({ taskList: result.data }));
                setStateTaskList(result.data);
                refetch();
            }

            if (result.error) {
                console.error(result.error.data?.errors[0]?.message || "Unexpected error");
                return;
            }
        } catch (err) {
            console.error(err);
        }
    }

    const taskIsSelected = (task) => {
        if (stateTaskList) {
            return stateTaskList.tasks.some((t) => t.id === task.id);
        }
        return false;
    }

    return (
        <Container className="pt-3">
            <Row>
                <div className="d-flex justify-content-between align-items-end pb-2">
                    <h1 className="d-inline-block">Feladatbank</h1>
                    <span>Oldal: {Math.ceil((offset + 1) / limit)}/{Math.ceil(currentTasks.total / limit)}</span>
                </div>
            </Row>
            <Accordion>
                {currentTasks.data.map((task, id) => {
                    return <Accordion.Item eventKey={id} key={id}>
                        <Accordion.Header>
                            <div className="d-inline-block text-truncate w-100">
                                <h2 className="d-inline me-3">{task.title}</h2>
                                {task.description}
                            </div>
                        </Accordion.Header>
                        <Accordion.Body>
                            <Task taskId={task.id} postFixNode={user &&
                                (!taskIsSelected(task) ?
                                    <Button variant="success" onClick={() => addTaskToEditedList(task)}>Kiválaszt</Button> :
                                    <Button variant="info" disabled>Kiválasztva</Button>)
                            } />
                        </Accordion.Body>
                    </Accordion.Item>
                })}
            </Accordion>
            <Row className="mt-3">
                <div className="d-flex justify-content-between">
                    <Button variant="primary" onClick={() => setOffset(offset - 10)} disabled={offset === 0}>
                        Hátra
                    </Button>
                    <Button variant="primary" onClick={() => setOffset(offset + 10)} disabled={currentTasks.data.length < limit}>
                        Előre
                    </Button>
                </div>
            </Row>
        </Container >
    );
}
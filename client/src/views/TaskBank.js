import { useGetSomeTasksQuery } from "../state/tasksApiSlice";
import { Button, Alert, Container, Accordion, Row } from "react-bootstrap";
import { useState } from "react";
// import { setTasks } from "../state/tasksSlice";
import { useSelector } from "react-redux";
import { selectCurrentUser } from "../state/authSlice";
import { Task } from "./components/Task";

export const TaskBank = () => {
    const [offset, setOffset] = useState(0);
    const limit = 10;
    const user = useSelector(selectCurrentUser);
    const { data: currentTasks, isLoading } = useGetSomeTasksQuery(offset, limit);
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
                            <Task taskId={task.id} />
                            {user &&
                                <Button variant="success" onClick={() => { }}>Kiválaszt</Button>
                            }
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
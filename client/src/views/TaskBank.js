import { useGetSomeTasksQuery } from "../state/tasksApiSlice";
import { Button, Alert, Container, Accordion, Row } from "react-bootstrap";
import { useState } from "react";
// import { setTasks } from "../state/tasksSlice";
import "./taskBank.css";

export const TaskBank = () => {
    const [offset, setOffset] = useState(0);
    const limit = 10;

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
        <Container>
            <h1>Feladatbank</h1>
            <Accordion>
                {currentTasks.data.map((task, id) => {
                    return <Accordion.Item eventKey={id}>
                        <Accordion.Header>
                            {task.title}
                        </Accordion.Header>
                        <Accordion.Body>
                            {task.description}
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
            <br />
            <Button variant="success" onClick={() => console.log('ÚJ')} disabled={!currentTasks}>
                Új feladat
            </Button>
        </Container >
    );
}
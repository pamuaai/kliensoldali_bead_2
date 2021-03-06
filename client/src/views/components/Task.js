import { Container, Alert } from "react-bootstrap";
import { useGetOneTaskQuery } from "../../state/tasksApiSlice";

export const Task = ({ taskId, postFixNode = null }) => {
    const { data: task, isLoading } = useGetOneTaskQuery(taskId);

    if (isLoading) {
        return "Betöltés alatt...";
    }

    if (!task) {
        return <Container>
            <Alert variant="warning">
                Nem létezik feladat {taskId} azonosítóval.
            </Alert>
        </Container>;
    }

    return (
        <Container className="p-3 my-3 border rounded bg-light">
            <h4>{task.title}</h4>
            <div>
                {task.description}
            </div>
            {postFixNode && <><hr /> {postFixNode}</>}
        </Container>
    );
}
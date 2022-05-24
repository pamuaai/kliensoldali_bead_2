import { Alert, Container, Button } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { selectCurrentUser, setCredentials } from "../state/authSlice";
import { setCurrentTaskList } from "../state/editSlice";
import { useGetAllTaskListsQuery } from "../state/taskListsApiSlice";

export const Profile = ({ setCurrentPage }) => {
    const dispatch = useDispatch();

    const user = useSelector(selectCurrentUser);
    const { data: taskLists, isLoading } = useGetAllTaskListsQuery();

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

    function logout() {
        try {
            dispatch(setCredentials({ user: null, token: null }));
            dispatch(setCurrentTaskList({ taskList: null }));
            setCurrentPage('home');
        } catch (err) {
            console.error(err);
        }
    }


    return (
        <Container className="pt-3">
            <h1>{user.fullname}</h1>
            <h2>{user.email}</h2>
            <h3>Feladatsorok száma: {taskLists.data.length}</h3>
            <Button variant="danger" onClick={() => logout()}>Kijelentkezés</Button>
        </Container >
    );
}
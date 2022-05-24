import { useDispatch } from "react-redux";
import { Navbar, Container, Nav } from "react-bootstrap";
import { selectCurrentUser, setCredentials } from "../state/authSlice";
import { useSelector } from 'react-redux';
import { selectCurrentTaskList, setCurrentTaskList } from "../state/editSlice";

export const Header = ({ setCurrentPage }) => {
    const dispatch = useDispatch();
    const user = useSelector(selectCurrentUser);
    const selectedTaskList = useSelector(selectCurrentTaskList);
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
        <Navbar bg="light" expand="lg">
            <Container>
                <Navbar.Brand onClick={() => setCurrentPage("home")}>TaskMaster</Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="me-auto">
                        <Nav.Link onClick={() => setCurrentPage("taskBank")}>Feladatbank</Nav.Link>
                        {user && <>
                            <Nav.Link onClick={() => setCurrentPage("myTaskLists")}>Feladatsoraim</Nav.Link>
                            {selectedTaskList &&
                                <Nav.Link onClick={() => setCurrentPage("editTaskList")}>Szerkesztett feladatsor</Nav.Link>
                            }
                            <Nav.Link onClick={() => setCurrentPage("profile")}>Profil</Nav.Link>
                        </>}
                    </Nav>
                </Navbar.Collapse>
                <Navbar.Collapse className="justify-content-end">
                    {user ? (<>
                        <Navbar.Text>
                            Üdv <strong>{user.fullname}</strong>!
                        </Navbar.Text>
                        <Nav.Link onClick={() => logout()}>Kijelentkezés</Nav.Link>
                    </>) : (<>
                        <Nav.Link onClick={() => setCurrentPage("login")}>Bejelentkezés</Nav.Link>
                        <Nav.Link onClick={() => setCurrentPage("register")}>Regisztráció</Nav.Link>
                    </>)}
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
}
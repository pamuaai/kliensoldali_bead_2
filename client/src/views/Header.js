import { useDispatch } from "react-redux";
import { Navbar, Container, Nav } from "react-bootstrap";
import { setCredentials } from "../state/authSlice";

export const Header = ({ setCurrentPage, loggedInUser }) => {
    const dispatch = useDispatch();

    function logout() {

        try {
            dispatch(setCredentials({ user: null, token: null }));
        } catch (err) {
            console.log(err);
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
                        {loggedInUser && <>
                            <Nav.Link onClick={() => setCurrentPage("myTaskLists")}>Feladatsoraim</Nav.Link>
                            <Nav.Link onClick={() => setCurrentPage("a")}>a</Nav.Link>
                            <Nav.Link onClick={() => setCurrentPage("profile")}>Profil</Nav.Link>
                        </>}
                    </Nav>
                </Navbar.Collapse>
                <Navbar.Collapse className="justify-content-end">
                    {loggedInUser ? (<>
                        <Navbar.Text>
                            Üdv <strong>{loggedInUser.fullname}</strong>!
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
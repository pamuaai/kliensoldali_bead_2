import { useEffect, useRef, useState } from "react";
import { Alert, Container } from "react-bootstrap";

const Login = ({ login, setCurrentPage, userList }) => {
    const userNameRef = useRef();
    const passwordRef = useRef();

    const [values, setValues] = useState({ username: '', password: '' });
    const [err, setErr] = useState(undefined);
    const handleChange = (event) =>
        setValues({ ...values, [event.target.name]: event.target.value });

    const { username, password } = values;


    const handleSubmit = (event) => {
        event.preventDefault();
        if (userList.some(u => u.username === username && u.password === password)) {
            login({ username, password });
            setCurrentPage('home');
        }
        setErr("Hiba a bejelentkezés során");
        return;
    }

    const canSubmit = password && username;

    useEffect(() => {
        userNameRef.current.focus();
    }, []);

    return (
        <Container className="p-3">
            <form onSubmit={handleSubmit}>
                {err && <Alert variant="danger">{err}</Alert>}
                <label htmlFor="username">Felhasználónév: </label>
                <input
                    ref={userNameRef}
                    type="text"
                    id="username"
                    name="username"
                    value={username}
                    onChange={handleChange}
                    label="Felhasználónév"
                    required
                />
                <br />
                <label htmlFor="password">Jelszó: </label>
                <input
                    ref={passwordRef}
                    type="password"
                    id="password"
                    name="password"
                    value={password}
                    onChange={handleChange}
                    label="Jelszó"
                    required
                />
                <br />
                <button type="submit" disabled={!canSubmit}> Elküld</button>
            </form>
        </Container>
    );
};

export default Login;

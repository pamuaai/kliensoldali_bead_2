import { useEffect, useRef, useState } from "react";
import { useDispatch } from "react-redux";
import { Alert, Button, Container, Form } from "react-bootstrap";
import { useLoginMutation } from "../../state/authApiSlice";
import { setCredentials } from "../../state/authSlice";

const Login = () => {

    const dispatch = useDispatch();
    const emailRef = useRef();

    const [loginFn] = useLoginMutation();

    const [values, setValues] = useState({ password: '', email: '' });
    const [err, setErr] = useState(undefined);
    const handleChange = (event) =>
        setValues({ ...values, [event.target.name]: event.target.value });

    const { password, email } = values;


    async function handleSubmit(event) {
        event.preventDefault();

        try {
            const result = await loginFn({ strategy: 'local', email: email, password: password });
            if (result.data) {
                dispatch(setCredentials(result.data));
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

    const canSubmit = password && email;

    useEffect(() => {
        emailRef.current.focus();
    }, []);

    return (
        <Container className="p-3">
            <h1>Bejelentkezés</h1>
            <Form onSubmit={handleSubmit}>
                {err && <Alert variant="danger">{err}</Alert>}
                <Form.Label>Email: </Form.Label>
                <Form.Control
                    ref={emailRef}
                    type="email"
                    id="email"
                    name="email"
                    value={email}
                    onChange={handleChange}
                    label="E-mail"
                    required
                />
                <Form.Label>Jelszó: </Form.Label>
                <Form.Control
                    type="password"
                    id="password"
                    name="password"
                    value={password}
                    onChange={handleChange}
                    label="Jelszó"
                    required
                />

                <Button variant="success" type="submit" className="mt-2" disabled={!canSubmit}>Bejelentkezés</Button>
            </Form>
        </Container>
    );
};

export default Login;

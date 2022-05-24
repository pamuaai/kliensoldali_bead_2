import { useEffect, useRef, useState } from "react";
import { Alert, Button, Container, Form } from "react-bootstrap";
import { useRegisterMutation } from "../../state/authApiSlice";

const Register = ({ setCurrentPage }) => {
    const fullNameRef = useRef();

    const [registerFn] = useRegisterMutation();

    const [values, setValues] = useState({ fullname: '', password: '', email: '' });
    const [err, setErr] = useState(undefined);
    const handleChange = (event) =>
        setValues({ ...values, [event.target.name]: event.target.value });

    const { fullname, password, email } = values;

    async function handleSubmit(event) {
        event.preventDefault();
        try {

            const result = await registerFn({ email: email, password: password, fullname: fullname });
            if (result.error) {
                console.error(result.error.data?.errors[0]?.message || "Unexpected error");
                setErr(result.error.data?.errors[0]?.message || "Unexpected error");
                return;
            }

            setCurrentPage('login');
        } catch (err) {
            console.error(err);
        }
    }

    const canSubmit = password && fullname && email;

    useEffect(() => {
        fullNameRef.current.focus();
    }, []);

    return (
        <Container className="p-3">
            <h1>Regisztráció</h1>

            <Form onSubmit={handleSubmit}>
                {err && <Alert variant="danger">{err}</Alert>}
                <Form.Label>Teljes név: </Form.Label>
                <Form.Control
                    ref={fullNameRef}
                    type="text"
                    id="fullname"
                    name="fullname"
                    value={fullname}
                    onChange={handleChange}
                    label="Teljes név"
                    required
                />
                <Form.Label>Email: </Form.Label>
                <Form.Control
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
                <Button variant="success" type="submit" className="mt-2" disabled={!canSubmit}>Elküld</Button>
            </Form>
        </Container>
    );
};

export default Register;

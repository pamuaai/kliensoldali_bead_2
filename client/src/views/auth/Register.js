import { useEffect, useRef, useState } from "react";
import { Alert, Container } from "react-bootstrap";
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
            <form onSubmit={handleSubmit}>
                {err && <Alert variant="danger">{err}</Alert>}
                <label htmlFor="fullname">Teljes név: </label>
                <input
                    ref={fullNameRef}
                    type="text"
                    id="fullname"
                    name="fullname"
                    value={fullname}
                    onChange={handleChange}
                    label="Teljes név"
                    required
                />
                <br />
                <label htmlFor="password">E-mail: </label>
                <input
                    type="email"
                    id="email"
                    name="email"
                    value={email}
                    onChange={handleChange}
                    label="E-mail"
                    required
                />
                <br />
                <label htmlFor="password">Jelszó: </label>
                <input
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

export default Register;

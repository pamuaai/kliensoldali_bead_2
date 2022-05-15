import { useEffect, useRef, useState } from "react";
import { useDispatch } from "react-redux";
import { Alert, Container } from "react-bootstrap";
import { useLoginMutation } from "../../state/authApiSlice";
import { setCredentials } from "../../state/authSlice";

const Login = () => {

    const dispatch = useDispatch();
    const emailRef = useRef();
    const passwordRef = useRef();

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
            console.log("result", result);
            if (result.data) {
                dispatch(setCredentials(result.data));
                console.log(result.data);
            }

            if (result.error) {
                console.error(result.error.data?.errors[0]?.message || "Unexpected error");
                setErr(result.error.data?.errors[0]?.message || "Unexpected error");
                return;
            }
        } catch (err) {
            console.log(err);
        }
    }

    const canSubmit = password && email;

    useEffect(() => {
        emailRef.current.focus();
    }, []);

    return (
        <Container className="p-3">
            <h1>Bejelentkezés</h1>
            <form onSubmit={handleSubmit}>
                {err && <Alert variant="danger">{err}</Alert>}
                <label htmlFor="fullname">Email: </label>
                <input
                    ref={emailRef}
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

import { useState } from "react";
import { login } from "../services/authService.js";

export default function LoginForm({ onLogin }) {
    const [credentials, setCredentials] = useState({
        email: "",
        password: ""
    });
    const [error, setError] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();
        try{
            const user = await login(credentials);
            onLogin(user);
        } catch {
            setError("Login incorrecto");
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <input name='email' onChange={e => setCredentials({...credentials, email: e.target.value})}/>
            <input name='password' onChange={e => setCredentials({...credentials, password: e.target.value})}/>
            <button>Login</button>
            {error && <p>{error}</p>}
        </form>
    );
}
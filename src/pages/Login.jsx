import "../styles/Login.css";
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuthStore } from "../store/authStore.jsx";
import validator from 'validator';
<<<<<<< HEAD
const API_URL = import.meta.env.VITE_API_URL
=======

>>>>>>> adcbce6 (Add all project files including backend models)
export default function Login() {
    const [submitting, setSubmitting] = useState(false);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errors, setErrors] = useState({});
    const login = useAuthStore(state => state.login);
    const navigate = useNavigate();

    const validate = () => {
        const newErrors = {};

        if (!email.trim()) {
            newErrors.email = "Email is required.";
        } else if (!validator.isEmail(email)) {
            newErrors.email = "Enter a valid email.";
        }

        if (!password.trim()) {
            newErrors.password = "Password is required.";
        }

        return newErrors;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const newErrors = validate();
        setErrors(newErrors);

        if (Object.keys(newErrors).length === 0) {
            try {
                setSubmitting(true);
<<<<<<< HEAD
                const response = await fetch(`${API_URL}/api/login`, {
=======
                const response = await fetch("http://localhost:8000/api/login", {
>>>>>>> adcbce6 (Add all project files including backend models)
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ email, password }),
                });

<<<<<<< HEAD
                if (!response.ok) {
                    throw new Error(`Login failed (Status: ${response.status})`);
                }

                const result = await response.json();

                if (result.success) {
                    login({ user: result.user, token: result.token });
                    navigate("/app/dashboard");
                } else if (result.errors) {
                    setErrors({ ...result.errors, general: "" });
=======
                const result = await response.json();

                if (result.success) {
                    login({
                        user: result.user,
                        token: result.token
                    });
                    navigate('/app/dashboard');
                } else if (result.errors) {
                    setErrors(prev => ({ ...prev, ...result.errors }));
>>>>>>> adcbce6 (Add all project files including backend models)
                } else {
                    setErrors({ general: "Invalid email or password" });
                }
            } catch (err) {
<<<<<<< HEAD
                console.error("Login error:", err);
                setErrors({ general: err.message || "Network or server error. Please try again." });
=======
                console.error("Network/server error:", err);
                setErrors({ general: "An error occurred. Please try again." });
>>>>>>> adcbce6 (Add all project files including backend models)
            } finally {
                setSubmitting(false);
            }
        }
    };

    return (
        <div className="login-container">
            <form onSubmit={handleSubmit}>
                <h2>Log In</h2>
<<<<<<< HEAD
=======

                {errors.general && (
                    <div className="error-text" style={{ marginBottom: '1rem' }}>
                        {errors.general}
                    </div>
                )}

>>>>>>> adcbce6 (Add all project files including backend models)
                <input
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => {
                        setEmail(e.target.value);
                        setErrors(prev => ({ ...prev, email: '' }));
                    }}
                    className={`login-input ${errors.email ? 'input-error' : ''}`}
                />
                {errors.email && <div className="error-text">{errors.email}</div>}

                <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => {
                        setPassword(e.target.value);
                        setErrors(prev => ({ ...prev, password: '' }));
                    }}
                    className={`login-input ${errors.password ? 'input-error' : ''}`}
                />
                {errors.password && <div className="error-text">{errors.password}</div>}
<<<<<<< HEAD
                {errors.general && <div className="error-text">{errors.general}</div>}
=======
>>>>>>> adcbce6 (Add all project files including backend models)

                <button
                    type="submit"
                    className="login-button"
                    disabled={submitting}
                >
                    {submitting ? <div className="loader"></div> : "Log In"}
                </button>
            </form>
        </div>
    );
}
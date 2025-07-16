import "../styles/Signup.css";
import {useSignupStore} from "../store/signupStore.jsx";
import {useState} from 'react';
import validator from 'validator';
import zxcvbn from 'zxcvbn';
import {isValidPhoneNumber} from 'libphonenumber-js';
import {useNavigate} from 'react-router-dom';
import {useAuthStore} from "../store/authStore.jsx";
const API_URL = import.meta.env.VITE_API_URL

export default function Signup() {
    const [submitting, setSubmitting] = useState(false);
    const login = useAuthStore(state => state.login);
    const {
        username, age, email, userClass, board, language, phone, password,
        errors,
        setUsername, setAge, setEmail, setUserClass, setBoard, setLanguage, setPhone, setPassword, setErrors
    } = useSignupStore();
    const schoolClasses = [
        'class5', 'class6',
        'class7', 'class8', 'class9', 'class10', 'class11', 'class12'
    ];
    const navigate = useNavigate();

    const checkUsername = async () => {
        if (!username.trim()) return;

        if (!/^[a-zA-Z0-9_.-]+$/.test(username)) {
            setErrors(prev => ({...prev, username: "Only letters, numbers, ., _, or - allowed."}));
            return;
        }

        try {
            const res = await fetch(`${API_URL}/api/check-username?username=${encodeURIComponent(username)}`);
            if (!res.ok) {
                throw new Error("Failed to check username");
            }
            const data = await res.json();
            if (data.exists) {
                setErrors(prev => ({...prev, username: "Username already taken"}));
            }else {
                setErrors({ ...errors, username: "" });
            }
        } catch (err) {
            setErrors({ ...errors, username: "Error checking username. Please try again." });
            console.error("Error checking username:", err);
        }
    };

    const validate = () => {
        const newErrors = {...errors};

        if (!username.trim()) newErrors.username = "Username is required.";
        else if (!/^[a-zA-Z0-9_.-]+$/.test(username)) {
            newErrors.username = "Username can only contain letters, numbers, dots, underscores, or hyphens.";
        }
        if (!age || isNaN(age) || Number(age) <= 0) newErrors.age = "Enter a valid age.";

        if (!email.trim()) newErrors.email = "Email is required.";
        else if (!validator.isEmail(email)) newErrors.email = "Enter a valid email.";

        if (!userClass.trim()) newErrors.userClass = "Your target is required.";
        if (schoolClasses.includes(userClass) && !board.trim()) {
            newErrors.board = "Select a board.";
        }
        if (!language.trim()) newErrors.language = "Select a language.";

        if (!password.trim()) newErrors.password = "Password is required.";
        else if (zxcvbn(password).score < 2) newErrors.password = "Password too weak.";

        if (phone && !isValidPhoneNumber(phone, 'IN')) {
            newErrors.phone = "Enter a valid Indian phone number.";
        }


        return newErrors;
    };

    const handleSubmit = async () => {
        const newErrors = validate();
        setErrors(newErrors);
        if (!validationErrors.username && username.trim()) {
            try {
                const res = await fetch(`${API_URL}/api/check-username?username=${encodeURIComponent(username)}`);
                if (!res.ok) throw new Error("Failed to check username");

                const data = await res.json();
                if (data.exists) {
                    setErrors(prev => ({...prev, username: "Username already taken"}));
                    return; // Stop submission if username exists
                }
            } catch (err) {
                setErrors({...errors, username: "Error checking username. Please try again."});
                return; // Stop submission on network error
            }
        }

        if (Object.keys(newErrors).length === 0) {
            try {
                setSubmitting(true);
                const requestBody = schoolClasses.includes(userClass)
                    ? {username, age, email, userClass, board, language, phone, password}
                    : {username, age, email, userClass, language, phone, password};

                const response = await fetch(`${API_URL}/api/signup`, {
                    method: "POST",
                    headers: {"Content-Type": "application/json"},
                    body: JSON.stringify(requestBody),
                });
                if (!response.ok) {
                    throw new Error(`Signup failed (Status: ${response.status})`);
                }
                const result = await response.json();

                if (result.success) {
                    console.log("User created!");
                    login({
                        user: result.user,
                        token: result.token
                    });
                    setTimeout(() => navigate("/app/dashboard"), 1500);
                } else if (result.errors) {
                    setErrors(prev => ({...prev, ...result.errors}));
                } else {
                    console.error("Unexpected response from server");
                    setErrors({ general: "Unexpected server response. Please try again." });
                }
            } catch (err) {
                console.error("Network/server error:", err);
                setErrors({ general: err.message || "Network or server error. Please try again." });
            } finally {
                setSubmitting(false);
            }
        }
    };

    return (

        <div className="signup-container">
            <form onSubmit={(e) => {
                e.preventDefault();
                handleSubmit();
            }}>
                <h2>Sign Up</h2>
                <input
                    type="text"
                    placeholder="Username"
                    value={username}
                    onChange={(e) => {
                        setUsername(e.target.value);
                        setErrors(prev => ({...prev, username: ''}));
                    }}
                    onBlur={checkUsername}
                    className={`signup-input ${errors.username ? 'input-error' : ''}`}
                />
                {errors.username && <div className="error-text">{errors.username}</div>}

                <input
                    type="number"
                    placeholder="Age"
                    value={age}
                    onChange={(e) => {
                        setAge(e.target.value);
                        setErrors(prev => ({...prev, age: ''}));
                    }}
                    className={`signup-input ${errors.age ? 'input-error' : ''}`}
                />
                {errors.age && <div className="error-text">{errors.age}</div>}

                <input
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => {
                        setEmail(e.target.value);
                        setErrors(prev => ({...prev, email: ''}));
                    }}
                    className={`signup-input ${errors.email ? 'input-error' : ''}`}
                />
                {errors.email && <div className="error-text">{errors.email}</div>}

                <select
                    value={userClass}
                    onChange={(e) => {
                        const val = e.target.value;
                        setUserClass(val);
                        setErrors(prev => ({...prev, userClass: ''}));
                        if (!schoolClasses.includes(val)) {
                            setBoard('');
                        }
                    }}
                    className={`signup-input ${errors.userClass ? 'input-error' : ''}`}
                >
                    <option value="">What are you preparing for?</option>

                    <optgroup label="Primary & Secondary">
                        <option value="class5">Class 5</option>
                        <option value="class6">Class 6</option>
                        <option value="class7">Class 7</option>
                        <option value="class8">Class 8</option>
                        <option value="class9">Class 9</option>
                        <option value="class10">Class 10</option>
                        <option value="class11">Class 11</option>
                        <option value="class12">Class 12</option>
                    </optgroup>

                    <optgroup label="Undergraduate">
                        <option value="btech">B.Tech / B.E</option>
                        <option value="bsc">B.Sc</option>
                        <option value="ba">B.A</option>
                        <option value="bcom">B.Com</option>
                        <option value="bpharm">B.Pharm</option>
                        <option value="barch">B.Arch</option>
                        <option value="bca">B.C.A</option>
                        <option value="bba">BBA</option>
                    </optgroup>

                    <optgroup label="Postgraduate">
                        <option value="mtech">M.Tech / M.E</option>
                        <option value="msc">M.Sc</option>
                        <option value="ma">M.A</option>
                        <option value="mcom">M.Com</option>
                        <option value="mba">MBA</option>
                    </optgroup>

                    <optgroup label="Research">
                        <option value="phd">PhD</option>
                        <option value="postdoc">Postdoc / Fellow</option>
                    </optgroup>

                    <optgroup label="Competitive Exam Prep">
                        <option value="jee">JEE</option>
                        <option value="neet">NEET</option>
                        <option value="aiims">AIIMS</option>
                        <option value="cuet">CUET</option>
                        <option value="gate">GATE</option>
                        <option value="cat">CAT</option>
                        <option value="clat">CLAT</option>
                        <option value="upsc_cse">UPSC</option>
                        <option value="nda">NDA</option>
                        <option value="cds">CDS</option>
                        <option value="ssc_cgl">SSC CGL</option>
                        <option value="bank_po">IBPS/SBI Banking Exams</option>
                    </optgroup>
                </select>
                {errors.userClass && <div className="error-text">{errors.userClass}</div>}


                {schoolClasses.includes(userClass) && (
                    <>
                        <select
                            value={board}
                            onChange={(e) => {
                                setBoard(e.target.value);
                                setErrors(prev => ({...prev, board: ''}));
                            }}
                            className={`signup-input ${errors.board ? 'input-error' : ''}`}
                        >
                            <option value="">Select Board</option>
                            <option value="cbse">CBSE</option>
                            <option value="icse">ICSE</option>
                            {}
                        </select>
                        {errors.board && <div className="error-text">{errors.board}</div>}
                    </>
                )}
                <select
                    value={language}
                    onChange={(e) => {
                        setLanguage(e.target.value);
                        setErrors(prev => ({...prev, language: ''}));
                    }}
                    className={`signup-input ${errors.language ? 'input-error' : ''}`}
                >
                    <option value="">Select Language</option>
                    <option value="hindi">Hindi</option>
                    <option value="english">English</option>
                    {}
                </select>
                {errors.language && <div className="error-text">{errors.language}</div>}

                <input
                    type="tel"
                    placeholder="Phone (optional)"
                    value={phone}
                    onChange={(e) => {
                        setPhone(e.target.value);
                        setErrors(prev => ({...prev, phone: ''}));
                    }}
                    className={`signup-input ${errors.phone ? 'input-error' : ''}`}
                />
                {errors.phone && <div className="error-text">{errors.phone}</div>}

                <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => {
                        setPassword(e.target.value);
                        setErrors(prev => ({...prev, password: ''}));
                    }}
                    className={`signup-input ${errors.password ? 'input-error' : ''}`}
                />
                {errors.password && <div className="error-text">{errors.password}</div>}
                {errors.general && <div className="error-text">{errors.general}</div>}
                <button type="submit" className="signup-button" disabled={submitting}>
                    {submitting ? <div className="loader"></div> : "Sign Up"}
                </button>

            </form>
        </div>

    );
}
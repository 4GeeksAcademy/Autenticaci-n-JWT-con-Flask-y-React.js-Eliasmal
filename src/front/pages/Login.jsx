
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import useGlobalReducer from "../hooks/useGlobalReducer";

export const Login = () => {
    const { dispatch } = useGlobalReducer();
    const [inputs, setInputs] = useState({});
    const navigate = useNavigate();

    function handleInput(event) {
        const name = event.target.name;
        const value = event.target.value;

        setInputs({ ...inputs, [name]: value });
    }
    const loginUser = async (event) => {
        try {
            event.preventDefault();
            const backendUrl = import.meta.env.VITE_BACKEND_URL;

            const response = await fetch(`${backendUrl}/api/token`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(inputs)
            });
            const data = await response.json();
            console.log(data);
            if (response.ok) {
                alert("Login successful!");
                navigate("/private");
            } else {
                throw new Error("Login failed");
            }
            localStorage.setItem("token", data.token);
            dispatch({ type: "login", payload: true });
            navigate("/private");
        } catch (error) {
            alert("An error occurred: " + error.message);
        }

    }

    return (
        <div className="container">
            <h1 className="text-center mt-5">Login</h1>
            <form className="mt-4" onSubmit={loginUser}>
                <div className="mb-3">
                    <label htmlFor="email" className="form-label">Email</label>
                    <input type="email" className="form-control" id="email" name="email" placeholder="Enter your email" onChange={handleInput} />
                </div>
                <div className="mb-3">
                    <label htmlFor="password" className="form-label">Password</label>
                    <input type="password" className="form-control" id="password" name="password" placeholder="Enter your password" onChange={handleInput} />
                </div>
                <div className="mb-3">
                    <Link to="/signup">Don't have an account? Sign Up</Link>
                </div>
                <button type="submit" className="btn btn-primary">Login</button>
            </form>
        </div>
    );
}


import { useState } from "react";
import { Link,useNavigate } from "react-router-dom";


export const Signup = () => {
   const [inputs,setInputs] = useState({})
   const navigate = useNavigate();

    function handleInput(event) {
        const email = event.target.name;
        const value = event.target.value;
        
        setInputs({ ...inputs, [email]: value });
    }

    const registerUSer = async (event) => {

        try {
            event.preventDefault();
            const backendUrl = import.meta.env.VITE_BACKEND_URL

            const response = await fetch(`${backendUrl}/api/signup`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(inputs)
            });
            const data = await response.json();
            if (response.ok) {
                alert("User registered successfully!");
            if (response.status === 409) {
                throw new Error("User already exists");
            }

            localStorage.setItem("token", data.token);
            navigate("/login");  
            }
        } catch (error) {
            alert("An error occurred: " + error.message);
        }
        
    }
    return (
        <div>
            <div className="container">
                <h1 className="text-center mt-5">Sign Up</h1>
                <form className="mt-4" onSubmit={registerUSer}>
                    {/* <div className="mb-3">
                        <label htmlFor="username" className="form-label">Username</label>
                        <input type="text" className="form-control" id="username" name="username" placeholder="Enter your username" onChange={handleInput} />
                    </div> */}
                    <div className="mb-3">
                        <label htmlFor="email" className="form-label">Email</label>
                        <input type="email" className="form-control" id="email" name="email" placeholder="Enter your email" onChange={handleInput} />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="password" className="form-label">Password</label>
                        <input type="password" className="form-control" id="password" name="password" placeholder="Enter your password" onChange={handleInput} />
                    </div>
                    <button type="submit" className="btn btn-primary">Sign Up</button>
                </form>
                <p className="mt-3 text-center">
                    Already have an account? <Link to="/login">Login here</Link>
                </p>
            </div>
        </div>

    );
}

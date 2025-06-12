import { useEffect, useState } from 'react';
import  useGlobalReducer  from '../hooks/useGlobalReducer';
import { useNavigate } from 'react-router-dom';

export const Private = () => {
    const { dispatch } = useGlobalReducer();
    const [message, setMessage] = useState("");
    const backendUrl = import.meta.env.VITE_BACKEND_URL;
    const navigate = useNavigate();

    async function fetchPrivateData() {
        try {
            const response = await fetch(`${backendUrl}/api/private`, {
                method: "GET",
                headers: {
                    "Authorization": `Bearer ${localStorage.getItem("token")}`
                }
            });

            if (response.ok) {
                const data = await response.json();
                setMessage(data.message);
            } else {
                throw new Error("Failed to fetch private data");
            }
        } catch (error) {
            setMessage("You are not authorized to view this page. Please log in.");
            console.error("Error fetching private data:", error);
        }
    }
    useEffect(() => {
        fetchPrivateData();
    }
        , []);

    const handleLogout = () => {
        localStorage.removeItem("token");
        dispatch({ type: "login" , payload: false });
        setMessage("You have been logged out.");
        navigate("/login");
    };

    useEffect(() => {
        if (!localStorage.getItem("token")) {
            navigate("/login");  // esta linea se podria colocar la linea 50 y eliminar el useEffect?
        }
    }, [navigate]);

    if (!localStorage.getItem("token")) {
        return null;
    }

    return (
        <div className="container">
            <div>
                <h1 className="text-center mt-5">Private Page</h1>
                <h5>Esta pagina solo puede ser vista por un usuario logueado</h5>
                {message && <p className="mt-3">{message}</p>}
                <div className="mt-4">
                    <button className="btn btn-primary" onClick={() => handleLogout()}>
                        Logout
                    </button>
                </div>
            </div>
        </div>
    );
}
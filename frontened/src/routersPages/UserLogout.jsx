import axios from "axios";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const UserLogout = ()=>{
    const navigate = useNavigate();
    useEffect(() => {
        const logoutUser = async () => {
            const token = localStorage.getItem("token");

            try {
                const response = await axios.get("http://localhost:3000/userLogout", {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });

                if (response.status === 200) {
                    localStorage.removeItem("token");
                    navigate("/login");
                }
            } catch (error) {
                console.error("Logout failed:", error.response?.data || error.message);
            }
        };

        logoutUser();
    }, [navigate]);
    return<>
    <h1>logout</h1>
    </>
}
export default UserLogout;
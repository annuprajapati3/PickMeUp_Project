/* eslint-disable react-hooks/exhaustive-deps */
import axios from "axios";
import { useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { CaptainData } from "../context/CaptainContext";

const CaptainProtectedWrapper = ({ children }) => {
    const { Captain , SetCaptain } = useContext(CaptainData); // No need for Captain
    const navigate = useNavigate();
    const token = localStorage.getItem("token");

    useEffect(() => {
        if (!token) {
            navigate("/captain/login");
            return;
        }

        axios.get("http://localhost:3000/getCaptainDetails", {
            headers: { Authorization: `Bearer ${token}` }
        })
        .then((res) => {
            console.log("Captain Data:", res.data);
            SetCaptain(res.data);
            console.log("Captain Data: 2 ", Captain);
        })
        .catch(() => {
            localStorage.removeItem("token"); // ✅ Fix key name
            navigate("/captain/login"); // ✅ Redirect if error occurs
        });

    }, [token, navigate, SetCaptain]); // ✅ Removed `Captain` from dependencies

    return <>{children}</>;
};

export default CaptainProtectedWrapper;

/* eslint-disable react-hooks/exhaustive-deps */
import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {UserDataContext} from "../context/UserContext"

const UserProtectWraaper = ({children})=>{
    const {user , setUser} = useContext(UserDataContext)
    const navigate = useNavigate();
    const token = localStorage.getItem("token");
    const [loading , setLoading] = useState(true)
    useEffect(()=>{
        if(!token){
            navigate("/login")
        }
    
    axios.get("http://localhost:3000/getUserDetails" ,  {
        headers: {
          Authorization: `Bearer ${token}`, 
        },
      },
    ).then((res)=>{
        setUser(res.data);
        console.log(user)
        setLoading(false)
    }).catch((err)=>{
        localStorage.removeItem(token);
        console.log(err);
    })
    },   [token , setUser , navigate])
    if(loading){
        return <div>loading....</div>
    }
    return<>{children}</>
}
export default UserProtectWraaper
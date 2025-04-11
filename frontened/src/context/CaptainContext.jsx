/* eslint-disable react-refresh/only-export-components */
import {  createContext, useState } from "react";
export const CaptainData = createContext();
const CaptainContext = ({children})=>{
    const [Captain , SetCaptain] = useState({
        captainName : "",
        email : "",
        password : "",
        drivingLicence : "",
        vehical : {
            vName :  "",
            vColor: "",
            vNumber: "",
            vType: "",
            vModel: "",
            vCapacity : "",
        } 
    })
    
    return <>
    <div>
        <CaptainData.Provider value = {{Captain , SetCaptain}}>
            {children}
        </CaptainData.Provider>
    </div>
    </>
}
export default CaptainContext;
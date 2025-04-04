import { useEffect, useState } from "react";


const useOnlineStatus = () => {
    //try to check if online by using event listener provided by window event
        const [onlineStatus,setOnlineStatus] =useState(true);
        useEffect(()=>{

            window.addEventListener("offline", () => {
                setOnlineStatus(false);
            })

            window.addEventListener("online", () => {
                setOnlineStatus(true);
            })

        },[]);
    
    //boolean value
    return onlineStatus
}

export default useOnlineStatus;
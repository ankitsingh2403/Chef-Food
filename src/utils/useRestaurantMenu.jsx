import { useEffect, useState } from "react";
import { MENU_API } from "./constants";


//custom hook
const useRestaurantMenu = (resId) => {
    
    const [resInfo,setResInfo] = useState(null);
    
    
    //fetch Data
     useEffect(()=>{
        fetchData();

    },[]);

    const fetchData =async () => {
        const data=await fetch(MENU_API + resId);
        const json= await data.json();
        setResInfo(json?.data);
    }

    return  resInfo;

}

export default useRestaurantMenu
import React,{useState,useContext,useEffect} from "react";
import UserContext from "../Context/UserContext";
import axios from "axios";
import { useNavigate } from "react-router-dom";



const Dashboard = ()=>{
    const {token, setToken}= useContext(UserContext);
    const [message, setMessage]=useState("");
    const [name, setName] = useState(""); 
    let navigate = useNavigate();

    useEffect(()=>{
        token && getJoke()
    },[token])

    useEffect(()=>{
        if(!token){
            let jsonToken = localStorage.getItem("token");
            if(!jsonToken){
                navigate("/login")
            }else{
                setToken(JSON.parse(jsonToken))
            }
        }
    })

    async function getJoke(){
        try {
            const response = await axios.get("https://instagram-express-app.vercel.app/api/auth/zuku",
            {
                headers:{"authorization": `Bearer ${token}`},
            })
            setMessage(response.data.data.message);
            setName(response.data.data.user.name)
        } catch (error) {
            console.log(error)
        }
    }

    async function logout(){
        try {
            const response = await axios.delete("https://instagram-express-app.vercel.app/api/auth/logout",{
                headers:{
                    'authorization' :`Bearer ${token}`
                }
            })
            setToken("");
            setName("");
            setMessage("");
            alert("Logout Successfull");
            navigate("/login")

        } catch (error) {
            
        }
    }
    return(
        <div>
            <div className="logout">
                <button onClick={logout}>Logout</button>
            </div>
            <h1 className="text-center mt-5">Welcome {name}</h1>
            {
                message && <p>{message}</p>
            }
        </div>
    )
}

export default Dashboard
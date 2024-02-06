import React,{useState,useContext} from "react";
import axios from "axios";
import UserContext from "../Context/UserContext";
import { useNavigate } from "react-router-dom";



const Login = ()=>{

    const  [user , setUser] = useState({email:"",password:""});
    const  {email, password}= user;
     // login token
     const {setToken} = useContext(UserContext)


    // importing the usenavigate to allow redirecting
    const navigate = useNavigate();

    // useState variables to handle the succes and error messages
    const [successMessage, setSuccessMessage]=useState("");
    const [errorMessage,setErrorMessage]=useState("");

   

    function updateUser(e){
        const key = e.target.name;
        const value = e.target.value;
        setUser({...user, [key]: value})
    }

    async function handleLogin(e){
        e.preventDefault();

        // validations
        if (!email || !password){
            alert("All fields are required");
        }

        try {
            const response = await axios.post("https://instagram-express-app.vercel.app/api/auth/login",
            {email,password});

            console.log("success",response.data.data.token);
            setSuccessMessage(response.data.message);
            // set token
            setToken(response.data.data.token);
            // storing the token in local storage
            localStorage.setItem("token", JSON.stringify(response.data.data.token))
            setErrorMessage("") //set the error message to empty wen success
            //reset form
            setUser({
                email: "",
                password: "",
            })
            alert("UserLogged In")
            navigate("/dashboard")
            
        } catch (error) {
            console.log("failure",error.response.data.message);
            setErrorMessage(error.response.data.message);
            setSuccessMessage("") //set success message empty wen failed
        }
    }

    return (
        <div className="container"> 
            {successMessage  && <h5 className="success">{successMessage}</h5>}
            {errorMessage && <h5 className='danger'>{errorMessage}</h5>}
            <h1>Login </h1>
            <form onSubmit={handleLogin}>
                <input type='text' name='email' placeholder='Email...'
                    onChange={updateUser}
                    value={email}
                />
                <input type='password' name='password' placeholder='Password'
                    onChange={updateUser}
                    value={password}
                />
                <button type="submit">Login</button>
            </form>
        </div>
    )
}

export default Login;
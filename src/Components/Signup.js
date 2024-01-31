import React,{useState} from "react";
import axios from "axios";




const Signup = ()=>{

    const  [user , setUser] = useState({name:"",email:"",password:"",confirmPassword:""});
    const  { name, email, password, confirmPassword }= user;

    // useState variables to handle the succes and error messages
    const [successMessage, setSuccessMessage]=useState("");
    const [errorMessage,setErrorMessage]=useState("");


    function updateUser(e){
        const key = e.target.name;
        const value = e.target.value;
        setUser({...user, [key]: value})
    }

    async function handleSignup(e){
        e.preventDefault();

        // validations
        if (!name || !email || !password || !confirmPassword){
            alert("All fields are required");
        }else if (password !== confirmPassword) {
            alert("Passwords do not match");
            return;
        }
        try {
            const response = await axios.post("https://instagram-express-app.vercel.app/api/auth/signup",
            {
                name: name,
                "email": email,
                "password": password,
            });
            console.log("success",response.data.message);
            setSuccessMessage(response.data.message);
            setErrorMessage("")
            
        } catch (error) {
            console.log("failure",error.response.data.message);
            setErrorMessage(error.response.data.message);
            setSuccessMessage("")
        }
    }

    return (
        <div className="container"> 
            {successMessage  && <h5 className="sucess">{successMessage}</h5>}
            {errorMessage && <h5 className='danger'>{errorMessage}</h5>}
            <h1>Sign Up</h1>
            <form onSubmit={handleSignup}>
                <input type='text' name='name' placeholder='Name...'
                    onChange={updateUser}
                    value={name}
                />
                <input type='text' name='email' placeholder='Email...'
                    onChange={updateUser}
                    value={email}
                />
                <input type='password' name='password' placeholder='Password'
                    onChange={updateUser}
                    value={password}
                />
                <input type='password' name='confirmPassword' placeholder='Confirm Password'
                    onChange={updateUser}
                    value={confirmPassword}
                />
                <button type="submit">Signup</button>
            </form>
        </div>
    )
}

export default Signup;
import React,{useState} from "react";




const Signup = ()=>{

    const  [user , setUser] = useState({name:"",email:"",password:"",confirmPassword});
    const  { name, email, password, confirmPassword }= user;


    function updateUser(e){
        const key = e.target.name;
        const value = e.target.value;
        setUser({...user, [key]: value})
    }



    return (
        <div className="container"> 
            <h1>Sign Up</h1>
            <form onSubmit={handleSubmit}>
                <input type='text' name='name' placeholder='Name'
                    onChange={updateUser}
                    value={name}
                />
                <input type='text' name='email' placeholder='Email'
                    onChange={updateUser}
                    value={email}
                />
                <input type='text' name='password' placeholder='Password'
                    onChange={updateUser}
                    value={password}
                />
                <input type='text' name='confirmPassword' placeholder='Confirm Password'
                    onChange={updateUser}
                    value={confirmpassword}
                />

            </form>
        </div>
    )
}
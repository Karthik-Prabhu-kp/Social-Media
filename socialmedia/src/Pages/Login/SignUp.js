import React, { useState } from 'react'
import axios from "axios";
import "./SignUp.css"



function SignUp() {

    const [firstName,setFirstName] = useState("");
    const [lastName,setLastName] = useState("");
    const [username,setUsername] = useState("");
    const [password,setPassword] = useState("");



    const clickHandler = async() => { //post the urser sihnups
        try{
          const response = await axios.post('/api/auth/signup',{
            firstName: firstName,
            lastName: lastName,
            username: username,
            password: password
          });
          console.log(response)//.data.encodedToken ==> pt this to state ? or local host
        } catch{
          console.error("error !!")
        }
        /**
     * This handler handles user signups.
     * send POST Request at /api/auth/signup
     * body contains {firstName, lastName, username, password}
     * */
      };


  return (
    <div className="signup-container">
        <label className='label'>First name:</label>
        <input
        className='signin-input'
        type='input'
        name='firstName'
        placeholder='First name'
        onChange={(e) => setFirstName(e.target.value)}
        />
        <label >Last name:</label>
        <input
        className='signin-input'
        type='input'
        name='lastName'
        placeholder='Last name'
        onChange={(e) => setLastName(e.target.value)}
        />
        <label>User name:</label>
        <input
        className='signin-input'
        type='input'
        name='userName'
        placeholder='User name'
        onChange={(e) => setUsername(e.target.value)}
        />
        <label>Password</label>
        <input
        className='signin-input'
        type='input'
        name='password'
        placeholder='Password'
        onChange={(e) => setPassword(e.target.value)}
        />
        <button className="btn" onClick={clickHandler}>Sign-up</button>
    </div>
  )
}

export default SignUp
import React, { useState,useEffect } from 'react'
import axios from "axios";
import { useLocation, useNavigate } from 'react-router';

import "./SignUp.css"
import SideBar from '../../components/sideBar/SideBar';
import NavBar from '../../components/navBar/NavBar';
import { useData } from '../../context/DataContext';
import { ACTION_TYPE } from '../../utils/constants';

function Login() {

  const [user,setUser] = useState("");
  const [userPassword,setPassword] = useState("");
  const {dataDispatch} = useData();
  const location = useLocation();
  const navigate = useNavigate();

  const clickHandler = async() => {
    let username = user;
    let password = userPassword
    try{
      const response = await axios.post('/api/auth/login',{
        username,
        password
      });
      console.log(response.data) //dispatch both user and token ah ?
      dataDispatch({
        type: ACTION_TYPE.SET_AUTH_TOKEN,
          payload: {
            token: response.data.encodedToken,
            user: response.data.foundUser,
          }
      })
      navigate(location?.state?.from?.pathname);
    } catch{
      console.error("error !!")
    }
  };
  /**
 * This handler handles user login.
 * send POST Request at /api/auth/login
 * body contains {username, password}
 * */


  return (
    <>
    <NavBar />
    <SideBar />
    <div className="signup-container">
        <label className='label'>User name</label>
        <input 
        type='input'
        className='signin-input'
        placeholder='User name'
        name='userName'
        onChange={(event) => setUser(event.target.value)}
        />
        <label className='label'>Password</label>
        <input 
        type='password'
        className='signin-input'
        placeholder='Password'
        name='password'
        onChange={(event) => setPassword(event.target.value)}
        />
        <button onClick={clickHandler}>Login</button>
        <span onClick={() => navigate('/SignUp')} >Create an account</span>
    </div>
    </>
  )
}

export default Login
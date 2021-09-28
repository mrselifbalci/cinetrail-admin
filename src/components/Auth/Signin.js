import React, { useState, useEffect} from 'react';
import axios from 'axios'
import '../../styles/auth.css'
import {  useHistory } from 'react-router'
import swal from 'sweetalert';

export default function Signin({isLoggedIn,setIsLoggedIn,apiBaseUrl,setUrl,token}) {
 const[email,setEmail]=useState('')
 const[password,setPassword]=useState('')
 const history = useHistory()
 const handleSubmit= async (e)=>{
     e.preventDefault()
     await axios.post(`${apiBaseUrl}/users/signin`,{
        email,password})
    .then (res=>{
        if(res.data.status && res.data.role==="admin"){
            localStorage.setItem('token', JSON.stringify(res.data.token))
            localStorage.setItem('userinfo', JSON.stringify(res.data))
            localStorage.setItem('url', JSON.stringify(res.data.mediaId.url))
            setIsLoggedIn(true)
            console.log(res.data)
            history.push('/dashboard')  
            return
        }else{
            swal({
                title: "Wrong password or email",
                text: "Please, try again!",
                icon: "warning",
                button: "OK",
               });
            return 
        }         
    })
    .catch(err=>console.log(err))
 }    
  return (
        <div className="signin-form-container">
            {
                isLoggedIn || token
                ? <div className="already-loggedin-text">You have already logged in.</div>
                : <form onSubmit={handleSubmit} className="signin-form">
                        <div className="signin-form-title">SIGN IN</div>
                        <div className="signin-form-email">
                            <input value={email}  onChange={(e)=>setEmail(e.target.value)} placeholder="Email"/>
                        </div>
                        <div className="signin-form-password">
                            <input value={password} onChange={(e)=>setPassword(e.target.value)} placeholder="Password" type="password"/>
                        </div>
                        <button type="submit" className="submit-button signin-button">Submit</button>
                 </form>
            }                  
        </div>
    )
}
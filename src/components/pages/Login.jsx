import React,{useState} from "react";
import { useNavigate } from "react-router-dom";
import {saveAuth} from "../../utils/authFetch";
import "./Login.css"

const Login=()=>{
  const [username,setUsername]=useState("");
  const [password,setPassword]=useState("");
  const navigate=useNavigate();

  const handleLogin=async(e)=>{
    e.preventDefault();

    try{
      const token=btoa(username + ":" + password);

      const res=await fetch("http://localhost:8080/auth/me",{
        method: "GET",
        headers:{
          Authorization: "Basic "+token,
        },
      })

      if(!res.ok){
        alert("Invalid username or password")
        return
      }

      const userData=await res.json();

      const role=userData.authorities[0].authority

      saveAuth(username, password);

      localStorage.setItem("role",role.replace("ROLE_", ""));

      alert("Login Successful");
      navigate("/dashboard",{replace:true});
    }
    catch(err){
      console.log(err);
      alert("Server error");
    }
  };

  return(
    <div className="login-container">
      <h2>Training Academy Login</h2>
      <p className="text-muted mb-3">Enter your credentials to continue</p>

      <form onSubmit={handleLogin}>
        <input type="text" 
        placeholder="Username"
        className="form-control mb-2"
        value={username}
        onChange={(e)=>setUsername(e.target.value)}/>

        <input
        type="password"
        placeholder="Password"
        className="form-control mb-2"
        value={password}
        onChange={(e)=>setPassword(e.target.value)}/>

        <button className="btn btn-primary w-100">Login</button>
      </form>
    </div>
  )
}

export default Login; 
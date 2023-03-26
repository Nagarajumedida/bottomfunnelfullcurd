import { Box, Button, Heading, Input } from "@chakra-ui/react";
import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate()

  function handleSubmit() {
    const payload = {
      email,
      password,
    };
    fetch("https://hilarious-poncho-lion.cyclic.app/login",{
        method:"POST",
        body:JSON.stringify(payload),
        headers:{
     'Content-Type':"application/json"
        }
    })
    .then((res)=>res.json())
    .then((res)=> {
        console.log(res)
        localStorage.setItem("psctoken",res.token)
        alert("Login Successfull")
        navigate("/notes")

    })
    .catch((error)=>console.log(error))
  }
  return (
    
    <Box  w='50%' p={4}  style={{width:"500px"}}>
    <Heading>Login</Heading>
    <Input
      type="text"
      placeholder="email"
      value={email}
      onChange={(e) => setEmail(e.target.value)}
    />
 
    <Input
      type="text"
      placeholder="password"
      value={password}
      onChange={(e) => setPassword(e.target.value)}
    />
    <Button onClick={handleSubmit}>Submit</Button>
  </Box>
  );
};

export default Login;

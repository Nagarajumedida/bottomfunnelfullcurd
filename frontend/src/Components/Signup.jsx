import { Box, Button, Heading, Input } from "@chakra-ui/react";
import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Signup = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate=useNavigate()

  function handleSubmit() {
    const payload = {
      email,
      password,
    };
    fetch("http://localhost:8003/signup",{
        method:"POST",
        body:JSON.stringify(payload),
        headers:{
     'Content-Type':"application/json"
        }
    })
    .then((res)=>res.json())
    .then((res)=> console.log(res),
    alert("Signup Sucessfully"),
       navigate("/login")
    )
    .catch((error)=>console.log(error))
  }
  return (
    <Box  w='50%' p={4}  style={{width:"500px"}}>
      <Heading>Signup</Heading>
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

export default Signup;

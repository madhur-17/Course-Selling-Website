import React from 'react'
import { useState } from 'react';
import TextField from '@mui/material/TextField';
import Card from '@mui/material/Card';
import Button from '@mui/material/Button';
function Login() {
  
    const [email,setEmail]=useState("");
    const [password,setPassword]=useState("");
    return<>
        <center>
        <h1>Welcome to Study point Login</h1>    
        <Card variant="outlined" style={{width:400}}>
        <br/>
        <TextField id="email" label="Email" variant="outlined" onChange={(e)=>setEmail(e.target.value)} /><br/>
        <br/>
        <TextField id="password" label="Password" variant="outlined" type='password' onChange={e=>setPassword(e.target.value)} /><br/><br/>
        <Button size='large' variant="outlined">Login</Button>
        </Card>
        </center>
    </>
  
}

export default Login

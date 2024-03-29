import React, { useState } from 'react';
import TextField from '@mui/material/TextField';
import Card from '@mui/material/Card';
import Button from '@mui/material/Button';

function Signup(){
    const [email,setEmail]=useState("");
    const [password,setPassword]=useState("");
    return<>
        <center>
        <h1>Welcome to Study point Sign up</h1>    
        <Card variant="outlined" style={{width:400}}>
        <br/>
        <TextField id="email" label="Email" variant="outlined" onChange={(e)=>setEmail(e.target.value)} /><br/>
        <br/>
        <TextField id="password" label="Password" variant="outlined" type='password' onChange={e=>setPassword(e.target.value)} /><br/><br/>
        <Button size='large' variant="outlined"
        onClick={()=>{
            fetch("http://localhost:3000/admin/signup",{
                method:"POST",
                body:JSON.stringify({
                    username:email,
                    password
                }),
                headers:{"Content-type":"applocation/json"}
            }).then(res=>res.json()).then(data=>{
                console.log(data);
                localStorage.setItem("token",data.token);
            });
        }}
        
        >Sign Up</Button>
        </Card>
        </center>
    </>

}
export default Signup;
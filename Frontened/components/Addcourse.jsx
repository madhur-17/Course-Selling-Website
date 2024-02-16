import React ,{ useState }from 'react'
import TextField from '@mui/material/TextField';
import Card from '@mui/material/Card';
import Button from '@mui/material/Button';

function Addcourse() {
    const [title,setTitle]=useState("");
    const [description,setDescription]=useState("");
    return<>
        <center>
         
        <Card variant="outlined" style={{width:400}}>
        <br/>
        <TextField fullWidth={"true"} id="email" label="Title" variant="outlined" onChange={(e)=>setTitle(e.target.value)} /><br/>
        <br/>
        <TextField fullWidth id="password" label="Description" variant="outlined" type='password' onChange={e=>setDescription(e.target.value)} /><br/><br/>
        <Button size='large' variant="outlined" 
        onClick={()=>{
            fetch("http://localhost:3000/admin/courses",{
                method:"POST",
                body:JSON.stringify({
                    title,
                    description,
                    price:300,
                    imagelink:"",
                    published:true,
                }),
                headers:{
                    "Content-type":"applocation/json",
                    "Authorization":"Bearer "+localStorage.getItem("token"),
                }
            }).then(res=>res.json()).then(data=>console.log(data));
        }}
        >Submit</Button>
        </Card>
        </center>
    </>
}

export default Addcourse

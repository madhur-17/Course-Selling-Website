import { Button } from '@mui/material'
import { Link} from 'react-router-dom'
import React, { useEffect } from 'react'
import { useState } from 'react'

function Appbar() {
  const [logged,setlogged]=useState(false);
  useEffect(()=>{
    fetch("http://localhost:3000/admin/me",{
      method:"GET",
      headers:{
        "Authorization":"Bearer "+localStorage.getItem("token")
      }
    }).then(res=>res.json()).then(data=>setlogged(true))
  },[])

  if(logged){
    return(
      <div style={{  display:"flex",justifyContent:"space-between"}}>
      <div>
        <Link to="/">StudyPoint</Link>
      </div>
      <div>
         
        <Link to ="/"><Button onClick={()=>{
          localStorage.setItem("token",null);
        }}>Logout</Button></Link>
      </div>
    </div>
    )
  }
  return (
    <div style={{  display:"flex",justifyContent:"space-between"}}>
      <div>
        <Link to="/">StudyPoint</Link>
      </div>
      <div>
         <Link to="/login"><Button>Login</Button></Link>
        <Link to ="/signup"><Button>Signin</Button></Link>
      </div>
    </div>
  )
}

export default Appbar

import { Button } from '@mui/material'
import { Link } from 'react-router-dom'
import React from 'react'

function Appbar() {
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

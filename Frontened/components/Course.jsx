import React, { useEffect, useState } from 'react'

function Course() {
    const [course,setCourse]=useState([]);
    useEffect(()=>{
        fetch("http://localhost:3000/admin/course",{
            method:"GET",
            headers:{
                "Authorization":"Bearer "+localStorage.getItem("token"),
            }
        }).then(res=>res.json).then(data=>setCourse(data.course));
    },[])
  return (
    <div>
      {course.map(data=>{
        return(
        <div style={{border:"2px solid black",width:"400",margin:10}}>
            <h1>{data.title}</h1>
        <p>{data.description }</p>
        </div>
        );
      })}
    </div>
  )
}

export default Course

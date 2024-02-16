import React from "react";
import { useParams } from "react-router-dom";

function Opencourse() {
  let { courseid } = useParams();
  const [course, setCourse] = useState([]);
  useEffect(() => {
    fetch("http://localhost:3000/admin/course", {
      method: "GET",
      headers: {
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
    })
      .then((res) => res.json)
      .then((data) => setCourse(data.course));
  }, []);
  let data = course.find((res) => res.id === courseid);
  if (!data) {
    return <div>loading...</div>;
  }
  return (<>
   <Coursecard data={data} />
   <Updatecourse course={course} setCourse={setCourse} data={data}/>
   </>
  );
}
function Coursecard(props){
    let data=props.data;
    return(
        <div style={{ border: "2px solid black", width: "400", margin: 10 }}>
      <h1>{data.title}</h1>
      <p>{data.description}</p>
    </div>
    );
}
function Updatecourse(props){
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
            fetch("http://localhost:3000/admin/course/:"+props.data.id,{
                method:"PUT",
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
            }).then(res=>res.json()).then((data)=>{
                    let updatecourse=[];
                    for(let i=0;i<props.course.length;i++){
                        if(props.course[i].id==props.data.id){
                            props.course[i].title=title;
                            props.course[i].description=description;
                            updatecourse.push(props.course[i]);
                        }

                        else{
                            updatecourse.push(props.course[i]);
                        }
                    }
                    props.setCourse(updatecourse);
            })
        }}
        >Update</Button>
        </Card>
        </center>
        </>
}

export default Opencourse;

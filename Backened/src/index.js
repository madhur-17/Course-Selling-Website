const express=require('express');
const app=express();
const jwt=require('jsonwebtoken');
const mongoose=require('mongoose');

app.use(express.json());

const secret="SECRET";

const userSchema= new mongoose.Schema({
    username:{type:String},
    password:String,
    purchasedcourses:{type:mongoose.Schema.Types.ObjectId,ref:'Course'},

});
const adminSchema=new mongoose.Schema({
    name:{type:String},
    password:String,
});
const courseSchema=new mongoose.Schema({
    title:String,
    description:{type:String},
    price:Number,
    imagelink:String,
    published:{type:Boolean},
});

const User=mongoose.model('User',userSchema);
const Admin=mongoose.model('Admin',adminSchema);
const Course=mongoose.model('Course',courseSchema);

//mongoose.connect();

const authenticateJwt=(req,res,next)=>{
    const head=req.headers.authorization;
    if(head){
    const token=head.split(' ')[1];
    jwt.verify(token,secret,(err,user)=>{
        req.user=user;
        next();
    })
    }
    else{
        res.status(404).send("Something went wrong");
    }
};
//
/*Amin api call*/
//

app.post('/admin/signup',async (req,res)=>{
    const {username,password}=req.body;
    const admin=await Admin.findOne({username});
    if(admin){
        res.status(403).json({message:'Admin Already Exists'});
    }
    else{
        const newAdmin=new Admin({username,password});
        newAdmin.save();
        const token=jwt.sign({username,role:'Admin'},secret,{expiresIn:'1h'});
        res.status(101).json({message:"Signuped Succesfully", token});
        
    }
});
app.post('/admin/login',(req,res)=>{
    const {username,password}=req.headers;
    const admin=Admin.findOne({username,password});
    if(admin){
        const token=jwt.sign({username,role:'Admin'},secret,{expiresIn:'1hr'});
        res.status(101).json({message:"logged in succesfully",token});
    }
    else{
        res.status(404).json({message:"Invalid Username or Password"});
    }

});
app.post('/admin/course',authenticateJwt,(req,res)=>{
    const course=new Course(req.body);
    course.save();
    res.json({message:"Course created succesfully"});
});

app.put('/admin/course/:courseid',(req,res)=>{
    const course=Course.findByIdAndUpdate(req.params.courseid,req.body,{new:true});
    if(course){
        res.json({message:"course updated succesfully"});
    }
    else{
        res.status(404).json({ message: 'Course not found' });
    }
});

app.get('/admin/course',async(req,res)=>{
    const course=await Course.find({});
    res.json({course});
})


//
/*Client Api Calls*/
//

app.post('/user/signup',async(req,res)=>{
    const{username,password}=req.body;
    const user=await User.findOne({username});
    if(user){
        res.status(404).send("user exists");
    }
    else{
        const newuser=new User(req.body);
        await newuser.save();
        const token=jwt.sign({username,role:"User"},secret,{expiresIn:'1hr'});
        res.json({token});
        }
})

app.post('/user/login',(req,res)=>{
    
    const user=User.findOne(req.headers);
    if(user){
         const token=jwt.sign({username:req.headers.username,role:"User"},secret,{expiresIn:'1hr'});
        res.send(token);
    }
    else{
        res.send("invalid");
    }
})
app.get('/user/course', authenticateJwt, async (req, res) => {
    const courses = await Course.find({published: true});
    res.json({ courses });
  });

app.post('/user/course/:courseid',authenticateJwt,async(req,res)=>{
    const course=await Course.findByID(req.params.courseid);
    if(course){
        const user=User.findOne({username:req.user.username});
        if(user){
            user.purchasedcourses.push(course);
            await user.save();
            res.json({ message: 'Course purchased successfully' });
        }
        else {
            res.status(403).json({ message: 'User not found' });
          }

    }
    else{
        res.send("course not found");
    }
});
app.get('/user/purchasedcourses',authenticateJwt,async(req,res)=>{
    const user=await User.findOne({username:req.user.username}).populate('purchasedcourses');
    res.json({purchasedcourses:user.purchasedcourses||[]});

})
app.listen(3000,()=>console.log("Server running at 3000"));

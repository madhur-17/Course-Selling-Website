const { User, Admin, Course } = require("../db");
const { secret, authenticateJwt } = require("../middleware");
const jwt = require("jsonwebtoken");
const router = express.Router();



router.post('/signup',async(req,res)=>{
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

router.post('/login',(req,res)=>{
    
    const user=User.findOne(req.headers);
    if(user){
         const token=jwt.sign({username:req.headers.username,role:"User"},secret,{expiresIn:'1hr'});
        res.send(token);
    }
    else{
        res.send("invalid");
    }
})
router.get('/course', authenticateJwt, async (req, res) => {
    const courses = await Course.find({published: true});
    res.json({ courses });
  });

router.post('/course/:courseid',authenticateJwt,async(req,res)=>{
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
router.get('/purchasedcourses',authenticateJwt,async(req,res)=>{
    const user=await User.findOne({username:req.user.username}).populate('purchasedcourses');
    res.json({purchasedcourses:user.purchasedcourses||[]});

})

module.exports = router;
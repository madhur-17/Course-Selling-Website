const { User, Admin, Course } = require("../db");
const { secret, authenticateJwt } = require("../middleware");
const jwt = require("jsonwebtoken");
const router = express.Router();

router.post("/signup", async (req, res) => {
  const { username, password } = req.body;
  const admin = await Admin.findOne({ username });
  if (admin) {
    res.status(403).json({ message: "Admin Already Exists" });
  } else {
    const newAdmin = new Admin({ username, password });
    newAdmin.save();
    const token = jwt.sign({ username, role: "Admin" }, secret, {
      expiresIn: "1h",
    });
    res.status(101).json({ message: "Signuped Succesfully", token });
  }
});
router.post("/login", (req, res) => {
  const { username, password } = req.headers;
  const admin = Admin.findOne({ username, password });
  if (admin) {
    const token = jwt.sign({ username, role: "Admin" }, secret, {
      expiresIn: "1hr",
    });
    res.status(101).json({ message: "logged in succesfully", token });
  } else {
    res.status(404).json({ message: "Invalid Username or Password" });
  }
});
router.post("/course", authenticateJwt, (req, res) => {
  const course = new Course(req.body);
  course.save();
  res.json({ message: "Course created succesfully" });
});

router.put("/course/:courseid", (req, res) => {
  const course = Course.findByIdAndUpdate(req.params.courseid, req.body, {
    new: true,
  });
  if (course) {
    res.json({ message: "course updated succesfully" });
  } else {
    res.status(404).json({ message: "Course not found" });
  }
});

router.get("/course", authenticateJwt, async (req, res) => {
  const course = await Course.find({});
  res.json({ course });
});
router.get("/me", authenticateJwt, (req, res) => {
  res.send("User is logged in");
});

module.exports = router;

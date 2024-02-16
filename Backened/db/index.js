const mongoose = require("mongoose");
const userSchema = new mongoose.Schema({
  username: { type: String },
  password: String,
  purchasedcourses: { type: mongoose.Schema.Types.ObjectId, ref: "Course" },
});
const adminSchema = new mongoose.Schema({
  name: { type: String },
  password: String,
});
const courseSchema = new mongoose.Schema({
  title: String,
  description: { type: String },
  price: Number,
  imagelink: String,
  published: { type: Boolean },
});

const User = mongoose.model("User", userSchema);
const Admin = mongoose.model("Admin", adminSchema);
const Course = mongoose.model("Course", courseSchema);

module.exports={
    User,
    Admin,
    Course
}
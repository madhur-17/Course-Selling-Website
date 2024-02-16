const express = require("express");
const app = express();
const mongoose = require("mongoose");
const port = 3000;
const adminRoutes = require("./routes/admin");
const userRoutes = require("./routes/user");
const cors = require("cors");

app.use(cors());
app.use(express.json());
app.use("/admin", adminRoutes);
app.use("/user", userRoutes);





//mongoose.connect();




app.listen(port,()=>console.log("Server running at 3000"));

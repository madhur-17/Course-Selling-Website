import React from "react";
import Signup from "../components/Signup";
import Appbar from "../components/Appbar";
import Login from "../components/Login";
import Addcourse from "../components/Addcourse";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Landing from "../components/Landing";

function App() {
  return (
    <>
      <div
        style={{  width: "100%", height:"100vh", background: "#eeeeee" }}
      >
        <Router>
          <Appbar/>
          <Routes>
          <Route path={"/"} element={<Landing/>} />
            <Route path={"/signup"} element={<Signup/>} />
            <Route path={"/login"} element={<Login/>} />
            <Route path={"/addcourse"} element={<Addcourse/>} />
          </Routes>
        </Router>
      </div>
    </>
  );
}

export default App;

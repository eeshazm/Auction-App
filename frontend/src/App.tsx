import React from 'react';
// import './App.css';
import { Routes, Route } from 'react-router-dom';
import Home from "./components/Home";
import Login from "./components/Login";
import Signup from "./components/Signup";
import CreateAuction from "./components/CreateAuction";
import Profile from "./components/Profile";
import Browse from "./components/Browse";
import Navbar from './components/navbar';
import { useLocation} from "react-router-dom";


function App() {
  const location = useLocation(); 
  const showNavbarPaths = ["/home", "/browse","/profile","/createAuction"]; //add paths here for navbars
  const shouldShowNavbar = showNavbarPaths.includes(location.pathname);
  return (
    <>
    {shouldShowNavbar && <Navbar />}
      <Routes>
        <Route path="/home" element={<Home />} />
        <Route path="/" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/createAuction" element={<CreateAuction />} />
        <Route path="/browse" element={<Browse />} />
      </Routes>
    </>
  );
}

export default App;

import React from "react";
import "../css/navbar.css"
import { useNavigate} from "react-router-dom";
import { NavLink } from "react-router-dom";

export default function Navbar() {
    const navigate = useNavigate();
    const handleLogout = () => {
        sessionStorage.removeItem("username");
        navigate("/");
      };
    return (
        <div>
        <ul className="navbar_container">
            <span className="sub-container">
            <li>
            <NavLink to="/home" className="nav-link-home">
                Home
            </NavLink>
            </li>
            <NavLink to="/browse" className="nav-link-home">
                Browse
            </NavLink>
            </span>
            <span className="sub-container"> 
                <li>
                <NavLink to="/profile" className="nav-link-profile">
                    Profile
                </NavLink>
                </li>
                <li className="logout" onClick={handleLogout}>Logout</li>
            </span>
        </ul>
    </div>
    );
}
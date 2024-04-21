import React from "react";
import "../css/navbar.css"
import { useNavigate} from "react-router-dom";
import { NavLink } from "react-router-dom";

export default function Navbar() {
    const history = useNavigate();
    const handleLogout = () => {
        localStorage.removeItem("token");
        history("/");
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
                <li>Browse</li>
            </span>
            <span className="sub-container"> 
                <li><img src="../assets/user.png" width="40px" /></li>
                <li className="logout" onClick={handleLogout}>Logout</li>
            </span>
        </ul>
    </div>
    );
}
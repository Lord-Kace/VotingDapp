import React from "react";
import { Link } from "react-router-dom";
import "./Navbar.css";
const Navbar = () => {
 return (
 <nav className="navbar">
 <h1>Secret Voting DApp</h1>
 <div className="nav-links">
 <Link to="/">Home</Link>
 <Link to="/voting">Vote</Link>
 <Link to="/results">Results</Link>
 </div>
 </nav>
 );
};
export default Navbar;
import React from "react";
import { Link } from "react-router-dom";
const Navbar = () => {
 return (
 <nav className="navbar">
 <div className="navbar-brand">Voting DApp</div>
 <ul className="navbar-links">
 <li><Link to="/">Home</Link></li>
 <li><Link to="/proposals">Proposals</Link></li>
 <li><Link to="/admin">Admin</Link></li>
 <li><Link to="/login">Login</Link></li>
 </ul>
 </nav>
 );
};
export default Navbar;
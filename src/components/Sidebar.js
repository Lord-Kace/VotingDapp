import React, { useState } from "react";
import { Link } from "react-router-dom";
const Sidebar = () => {
 const [isOpen, setIsOpen] = useState(false);
 const toggleSidebar = () => {
 setIsOpen(!isOpen);
 };
 return (
 <div className={`sidebar ${isOpen ? "open" : ""}`}>
 <button onClick={toggleSidebar} className="toggle-btn">
 {isOpen ? "Close" : "Open"} Menu
 </button>
 <ul className="sidebar-links">
 <li><Link to="/">Home</Link></li>
 <li><Link to="/proposals">Proposals</Link></li>
 <li><Link to="/admin">Admin</Link></li>
 <li><Link to="/login">Login</Link></li>
 </ul>
 </div>
 );
};
export default Sidebar;
// Sidebar.js
import React from "react";
import "./Sidebar.css";
const Sidebar = () => {
 return (
 <div className="sidebar">
 <h2>Navigation</h2>
 <ul>
 <li><a href="/">Home</a></li>
 <li><a href="/voting">Vote</a></li>
 <li><a href="/results">Results</a></li>
 </ul>
 </div>
 );
};
export default Sidebar;
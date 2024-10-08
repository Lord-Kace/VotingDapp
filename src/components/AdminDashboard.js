import React from "react";
import ProposalCreate from "./ProposalCreate";
const AdminDashboard = ({ client }) => {
 return (
 <div>
 <h2>Admin Dashboard</h2>
 <ProposalCreate client={client} />
 </div>
 );
};
export default AdminDashboard;
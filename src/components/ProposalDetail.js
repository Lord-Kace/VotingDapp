import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import LoadingSpinner from "./LoadingSpinner";
const ProposalDetail = ({ client }) => {
 const { id } = useParams();
 const [proposal, setProposal] = useState(null);
 const [isLoading, setIsLoading] = useState(true);
 const fetchProposal = async () => {
 try {
 const response = await client.query({
 get_proposal: { proposal_id: parseInt(id) },
 });
 setProposal(response);
 } catch (error) {
 console.error("Failed to fetch proposal:", error);
 } finally {
 setIsLoading(false);
 }
 };
 useEffect(() => {
 fetchProposal();
 }, [id]);
 return (
 <div>
 {isLoading ? (
 <LoadingSpinner />
 ) : proposal ? (
 <div>
 <h3>{proposal.title}</h3>
 <p>{proposal.description}</p>
 <p>Yes Votes: {proposal.yes_votes}</p>
 <p>No Votes: {proposal.no_votes}</p>
 <p>Status: {proposal.status}</p>
 </div>
 ) : (
 <p>Proposal not found</p>
 )}
 </div>
 );
};
export default ProposalDetail;
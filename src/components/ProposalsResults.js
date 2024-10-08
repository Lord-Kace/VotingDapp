import React, { useEffect, useState } from "react";
const ProposalResults = ({ proposalId, client }) => {
 const [proposal, setProposal] = useState(null);
 const [isLoading, setIsLoading] = useState(true);
 const fetchProposalResults = async () => {
 const response = await client.query({
 get_proposal: { proposal_id: proposalId },
 });
 setProposal(response);
 setIsLoading(false);
 };
 useEffect(() => {
 fetchProposalResults();
 }, [proposalId]);
 return (
 <div>
 {isLoading ? (
 <p>Loading results...</p>
 ) : proposal ? (
 <div>
 <h3>{proposal.title} - Results</h3>
 <p>Yes Votes: {proposal.yes_votes}</p>
 <p>No Votes: {proposal.no_votes}</p>
 <p>Status: {proposal.status}</p>
 <p>Expires At: {new Date(proposal.expires_at * 1000).toLocaleString()}</p>
 </div>
 ) : (
 <p>Proposal not found</p>
 )}
 </div>
 );
};
export default ProposalResults;

import React, { useEffect, useState } from "react";
import LoadingSpinner from "./LoadingSpinner";
const ProposalList = ({ client }) => {
 const [proposals, setProposals] = useState([]);
 const [isLoading, setIsLoading] = useState(true);
 const fetchProposals = async () => {
 try {
 const response = await client.query({
 list_proposals: {},
 });
 setProposals(response.proposals);
 } catch (error) {
 console.error("Failed to fetch proposals:", error);
 } finally {
 setIsLoading(false);
 }
 };
 const vote = async (proposalId, vote) => {
 try {
 const msg = {
 vote: {
 proposal_id: proposalId,
 vote: vote,
 },
 };
 const tx = await client.tx.broadcast([msg], {
 gasLimit: 200_000,
 memo: "Vote",
 });
 console.log("Voted: ", tx);
 fetchProposals(); // Refresh the list
 } catch (error) {
 console.error("Failed to vote:", error);
 }
 };
 useEffect(() => {
 fetchProposals();
 }, []);
 return (
 <div>
 <h2>Proposals</h2>
 {isLoading ? (
 <LoadingSpinner />
 ) : proposals.length === 0 ? (
 <p>No proposals available.</p>
 ) : (
 <ul>
 {proposals.map((proposal) => (
 <li key={proposal.id}>
 <h3>{proposal.title}</h3>
 <p>{proposal.description}</p>
 <p>Yes: {proposal.yes_votes}</p>
 <p>No: {proposal.no_votes}</p>
 <p>Status: {proposal.status}</p>
 <button onClick={() => vote(proposal.id, true)}>Vote Yes</button>
 <button onClick={() => vote(proposal.id, false)}>Vote No</button>
 </li>
 ))}
 </ul>
 )}
 </div>
 );
};
export default ProposalList;
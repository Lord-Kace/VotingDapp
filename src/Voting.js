import React, { useState, useEffect } from 'react';
import { getSecretClient } from './secretNetwork';
const Voting = () => {
 const [contestants, setContestants] = useState([]);
 useEffect(() => {
 const fetchContestants = async () => {
 try {
 const { secretjs } = await getSecretClient();
 const query = { get_contestants: {} };
 const response = await 
secretjs.query.compute.queryContract({
 contractAddress: "secret1...contestcontract",
 codeHash: "your_contract_code_hash",
 query,
 });
 setContestants(response.contestants);
 } catch (error) {
 console.error('Error fetching contestants:', 
error);
 }
 };
 fetchContestants();
 }, []);
 const handleVote = async (contestantId) => {
 try {
 const { secretjs, address } = await 
getSecretClient();
 const msg = { vote: { contestant_id: contestantId 
} };
 const tx = await 
secretjs.tx.compute.executeContract(
 {
 sender: address,
 contractAddress: "secret1...contestcontract",
 msg,
 codeHash: "your_contract_code_hash",
 },
 {
 gasLimit: 100_000,
 }
 );
 alert('Vote cast successfully!');
 } catch (error) {
 alert('Failed to cast vote');
 }
 };
 return (
 <div>
 <h2>Vote for your favorite contestant</h2>
 <ul>
 {contestants.map(contestant => (
 <li key={contestant.id}>
 {contestant.name} ({contestant.party_name})
 <button onClick={() => 
handleVote(contestant.id)}>Vote</button>
 </li>
 ))}
 </ul>
 </div>
 );
};
export default Voting;

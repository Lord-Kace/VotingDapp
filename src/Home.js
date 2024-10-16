import React, { useState } from 'react';
import { getSecretClient } from './secretNetwork';
const Home = () => {
 const [contestant, setContestant] = useState({
 name: '',
 partyName: '',
 partyLogo: '',
 profile: ''
 });
 const handleSubmit = async () => {
 try {
 const { secretjs, address } = await 
getSecretClient();
 const msg = {
 register_contestant: {
 name: contestant.name,
 party_name: contestant.partyName,
 party_logo: contestant.partyLogo,
 profile: contestant.profile,
 },
 };
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
 alert('Contestant Registered Successfully!');
 } catch (error) {
 alert('Failed to register contestant');
 }
 };
 return (
 <div>
 <h2>Add Contestant</h2>
 <form>
 <label>Name:</label>
 <input type="text" value={contestant.name} 
onChange={(e) => setContestant({ ...contestant, 
name: e.target.value })} />
 
 <label>Party Name:</label>
 <input type="text" 
value={contestant.partyName} onChange={(e) => 
setContestant({ ...contestant, partyName: 
e.target.value })} />
 
 <label>Party Logo URL:</label>
 <input type="text" 
value={contestant.partyLogo} onChange={(e) => 
setContestant({ ...contestant, partyLogo: 
e.target.value })} />
 
 <label>Profile:</label>
 <textarea value={contestant.profile} 
onChange={(e) => setContestant({ ...contestant, 
profile: e.target.value })}></textarea>
 
 <button type="button" 
onClick={handleSubmit}>Submit</button>
 </form>
 </div>
 );
};
export default Home;
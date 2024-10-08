import React, { useState } from "react";
import { sendVote } from "../secret";

const Vote = ({ proposalId, contractAddress, wallet }) => {
  const [vote, setVote] = useState(null);

  const handleVote = async (choice) => {
    setVote(choice);
    try {
      await sendVote(contractAddress, proposalId, choice, wallet);
      alert("Vote cast successfully!");
    } catch (error) {
      console.error("Error casting vote:", error);
    }
  };

  return (
    <div>
      <h3>Cast your vote</h3>
      <button onClick={() => handleVote(true)}>Yes</button>
      <button onClick={() => handleVote(false)}>No</button>
    </div>
  );
};

export default Vote;
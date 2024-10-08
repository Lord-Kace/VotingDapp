// src/Results.js
import React from 'react';



const Results = () => {
  const results = [
    { candidate: 'Candidate A', votes: 10 },
    { candidate: 'Candidate B', votes: 5 },
  ];

  return (
    <div>
      <h2>Results</h2>
      <ul>
        {results.map((result, index) => (
          <li key={index}>
            {result.candidate} - {result.votes} votes
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Results;

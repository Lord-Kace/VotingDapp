Voting DApp on Secret Network


Overview

This is a decentralized voting application (DApp) built on the Secret Network. The DApp allows users to
register candidates, vote for contestants, and view election results in a privacy-preserving manner. The backend
of the app is powered by a smart contract deployed on the Secret Network, ensuring that transactions are secure
and private.

The app includes:

 Home Page: Register contestants (name, party name, party logo, and profile).
 
 Voting Page: Vote for registered contestants.
 
 Results Page: View the election results.
 
 Wallet Integration: Connect with the Keplr wallet for interacting with the Secret Network.
 
 Time-Limited Voting: Voting is available only between specified start and end times.
 
Features

 Contestant Registration: Users can register candidates with a name, party name, logo, and profile. 
 

Once registered, the contestant's data cannot be changed.

 Secure Voting: Only one vote is allowed per user, and votes cannot be changed after casting.
 
 Results Display: View the results of the election once the voting period has ended.
 
 Blockchain Integration: All actions (registering contestants, voting, etc.) are recorded on the Secret
Network, ensuring data privacy and immutability.

 Time-Based Voting: Voting starts and ends at a specific time, set when the smart contract is instantiated.
 
Prerequisites


To run and interact with this project, you'll need the following:

 Node.js: Install Node.js (version 14 or higher).
 
 Keplr Wallet: Download and install the Keplr wallet browser extension for interacting with the Secret
Network.

 Secret Network Tokens:
 
 Testnet: Use a testnet faucet to obtain SCRT tokens for testing.

 
 Mainnet: Obtain SCRT tokens from an exchange or the Osmosis DEX.
 
 Rust and CosmWasm Setup: If you're working on the backend smart contract, install Rust and the CosmWasm
toolchain.
Installation

Frontend Setup

 Clone the repository: 

 
cd voting-dapp-secret-network

Install dependencies:

npm install

Run the application:

 npm start
 
 The app will run at http://localhost:3000/.
 
Smart Contract Deployment

1. Compile the Contract
2. 
If you haven't already compiled the smart contract, follow these steps to compile it:
 Install Rust:

 bash
curl --proto '=https' --tlsv1.2 -sSf https://sh.rustup.rs | sh
Set up CosmWasm Environment:

bash
rustup default stable
rustup target add wasm32-unknown-unknown
cargo install cargo-generate --features vendored-openssl
Compile the Smart Contract: In the contract folder, run:
bash
 cargo wasm
This will generate a .wasm file for the contract.
4. Deploy the Contract
Once you have the .wasm file, you can deploy the contract to the Secret Network:
 Install secretjs:
 bash
npm install secretjs
Deploy the Contract: Use SecretJS to deploy the contract. Here's an example script to upload the contract:
javascript
const { SecretNetworkClient } = require("secretjs");
const fs = require("fs");
async function deployContract() {
 const secretjs = await SecretNetworkClient.create({
 grpcWebUrl: "https://grpc-secret-4.scrtlabs.com",
 chainId: "secret-4",
 wallet: keplrWallet,
 walletAddress: keplrAddress,
 });
 const wasmByteCode = fs.readFileSync("path/to/contract.wasm");
 const storeCodeTx = await secretjs.tx.compute.storeCode(
 {
 sender: keplrAddress,
 wasmByteCode,
 },
 {
 gasLimit: 200_000,
 }
 );
 const codeId = storeCodeTx.codeId;
 console.log(`Contract deployed with codeId: ${codeId}`);
}
deployContract();
Instantiate the Contract: After uploading the contract, instantiate it:
javascript
 const initMsg = {
 voting_start: startTimeInUnix, // Voting start time in Unix timestamp
 voting_end: endTimeInUnix, // Voting end time in Unix timestamp
 };
 const instantiateTx = await secretjs.tx.compute.instantiateContract(
 {
 sender: keplrAddress,
 codeId: codeId,
 initMsg,
 label: "Voting DApp",
 }
 );
 const contractAddress = instantiateTx.contractAddress;
 console.log(`Contract instantiated at address: ${contractAddress}`);
5. Update Frontend with Contract Address
Once the contract is deployed and instantiated, copy the contract address and code hash, and update your
frontend with this information in the file where you're interacting with the smart contract (e.g.,
secretNetwork.js).
javascript
const contractAddress = "secret1..."; // Replace with your contract address
const codeHash = "your_contract_code_hash"; // Replace with your contract code hash
Frontend Components
1. Home Page
This page allows users to register contestants. Contestants can add their name, party name, logo, and profile.
Once a contestant is registered, the data is sent to the smart contract and stored on-chain.
2. Voting Page
Users can see all registered contestants and cast their vote. Each user is allowed to vote only once, and the vote
is immutable once cast.
3. Results Page
Once the voting period ends, the results page will display the outcome of the election, showing the total votes
each contestant received.
4. Wallet Integration
Users must connect their Keplr wallet to the app to interact with the Secret Network. They need SCRT tokens
for transaction fees.
Interaction with Secret Network
The app uses SecretJS to interact with the Secret Network blockchain:
 Register Contestant: Sends a transaction to the smart contract to add a new contestant.
 Vote: Sends a transaction to cast a vote for a contestant. This transaction is recorded on-chain.
 View Results: Queries the smart contract for the voting results.
Example Interaction (Voting)
Here's a simplified example of how voting is handled on the frontend:
javascript
const handleVote = async (contestantId) => {
 try {
 const { secretjs, address } = await getSecretClient();
 const voteMsg = {
 vote: { contestant_id: contestantId },
 };
 const tx = await secretjs.tx.compute.executeContract(
 {
 sender: address,
 contractAddress: "secret1...your_contract_address",
 msg: voteMsg,
 codeHash: "your_contract_code_hash",
 },
 {
 gasLimit: 100_000,
 }
 );
 alert("Vote cast successfully!");
 } catch (error) {
 console.error("Failed to cast vote:", error);
 }
};
Smart Contract Files
The smart contract is written in Rust with CosmWasm. The main contract files are:
 contract.rs: The contract logic, including registering candidates, voting, and fetching results.
 msg.rs: Defines the messages and data structures that the contract accepts (e.g., RegisterContestant, Vote).
 state.rs: Manages the state, such as storing contestants and votes.
 lib.rs: Links everything together and runs the contract.
License
This project is licensed under the MIT License.
Contributing
Feel free to open issues or submit pull requests. Contributions are welcome!
Contact
For any questions or support, contact:
 Email: zugifty88@gmail.com
 Telegram: t.me/Lordkace

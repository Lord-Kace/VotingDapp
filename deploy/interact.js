const { SecretNetworkClient, Wallet } = require("secretjs");
const fs = require("fs");
require("dotenv").config();
async function main() {
 const wallet = new Wallet(process.env.MNEMONIC);
 const secretjs = await SecretNetworkClient.create({
 grpcWebUrl: "https://grpc.pulsar.scrttestnet.com",
 chainId: "pulsar-2",
 wallet: wallet,
 walletAddress: wallet.address,
 });
 // Load contract details
 const { codeId, codeHash, contractAddress } = JSON.parse(fs.readFileSync("contract-details.json"));
 console.log(`Interacting with contract at address: ${contractAddress}`);
 // Example: Register a contestant
 console.log("Registering contestant...");
 const registerTx = await secretjs.tx.compute.executeContract(
 {
 sender: wallet.address,
 contractAddress,
 codeHash,
 msg: {
 register_contestant: {
 name: "John Doe",
 party_name: "Party XYZ",
 party_logo: "https://example.com/logo.png",
 profile: "Candidate profile here.",
 },
 },
 },
 {
 gasLimit: 200_000,
 }
 );
 console.log("Contestant registered:", registerTx.transactionHash);
 // Example: Query contestants
 console.log("Querying contestants...");
 const queryResponse = await secretjs.query.compute.queryContract({
 contractAddress,
 codeHash,
 query: { get_contestants: {} },
 });
 console.log("Contestants:", JSON.stringify(queryResponse, null, 2));
}
main().catch((err) => {
 console.error(err);
});
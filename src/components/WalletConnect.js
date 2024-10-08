import React, { useState, useEffect } from "react";
import { SecretNetworkClient } from "secretjs";
const WalletConnect = ({ setClient }) => {
 const [walletAddress, setWalletAddress] = useState(null);
 const [balance, setBalance] = useState(null);
 const [status, setStatus] = useState("Disconnected");
 const connectKeplr = async () => {
 if (!window.keplr) {
 alert("Please install Keplr extension");
 return;
 }
 await window.keplr.enable("secret-4");
 const offlineSigner = window.getOfflineSigner("secret-4");
 const accounts = await offlineSigner.getAccounts();
 const address = accounts[0].address;
 setWalletAddress(address);
 const client = new SecretNetworkClient({
 url: "https://lcd.secret-4.network",
 chainId: "secret-4",
 wallet: offlineSigner,
 walletAddress: address,
 });
 setClient(client);
 setStatus("Connected");
 // Fetch wallet balance
 const balance = await client.query.bank.balance({
 address: address,
 denom: "uscrt", // SCRT token denomination
 });
 setBalance(balance.amount / 1e6); // Convert microSCRT to SCRT
 };
 const disconnect = () => {
 setClient(null);
 setWalletAddress(null);
 setBalance(null);
 setStatus("Disconnected");
 };
 return (
 <div>
 <button onClick={connectKeplr}>Connect Wallet</button>
 {walletAddress && (
 <>
 <p>Your Wallet: {walletAddress}</p>
 <p>Balance: {balance} SCRT</p>
 <button onClick={disconnect}>Disconnect</button>
 </>
 )}
 <p>Status: {status}</p>
 </div>
 );
};
export default WalletConnect;
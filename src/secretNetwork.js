import { SecretNetworkClient } from "secretjs";
export const getSecretClient = async () => {
 if (!window.keplr) {
 throw new Error("Please install Keplr extension");
 }
 await window.keplr.enable("pulsar-2");
 const offlineSigner = window.getOfflineSignerOnlyAmino("pulsar-2");
 const accounts = await offlineSigner.getAccounts();
 const secretjs = await SecretNetworkClient.create({
 grpcWebUrl: "https://grpc.pulsar.scrttestnet.com",
 chainId: "pulsar-2",
 wallet: offlineSigner,
 walletAddress: accounts[0].address,
 });
 return { secretjs, address: accounts[0].address };
};
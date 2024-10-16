// Import SecretJS and file system module
import { SecretNetworkClient, Wallet } from "secretjs";
import { readFileSync } from "fs";

// Your wallet address and path to the compiled wasm contract
const walletAddress = "secret1v354z9stxznykwmksmx6smnuwj0vx0uh57s6h5";  // Replace with your actual wallet address
const wasmFilePath = "../backend/target/wasm32-unknown-unknown/release/backend.wasm.gz";

// Secret Network endpoint (testnet or mainnet)
const network = {
  chainId: "pulsar-3",  // For testnet, replace with "secret-4" for mainnet
  url: "https://api.pulsar.scrttestnet.com", // Replace with the actual network RPC URL
};

// Main deploy function
const main = async () => {
  // Create a new wallet (mnemonic stored locally or imported)
  const wallet = new Wallet("tomorrow later lock clown ride judge review victory very saddle muscle meadow eight junk trust inmate kingdom yellow brass wrong drive brown simple game");  // Replace with your wallet mnemonic

  // Initialize the client to interact with the Secret Network
  const secretjs = new SecretNetworkClient({
    url: network.url,
    chainId: network.chainId,
    wallet: wallet,
    walletAddress: walletAddress,
  });

  // Step 1: Upload the contract's WASM code to Secret Network
  console.log("Uploading contract...");

  try {
    // Read the WASM file from the specified path
    const wasmCode = readFileSync(wasmFilePath);
    console.log("WASM code length:", wasmCode.length); // Log the length to ensure it's valid

    const uploadTx = await secretjs.tx.compute.storeCode(
      {
        sender: walletAddress,
        wasmByteCode: wasmCode, // Use the raw WASM code
        source: "",  // Optional: URL of your source code repo
        builder: "", // Optional: Docker image for building
      },
      {
        gasLimit: 2000000, // Adjust gas limit as needed
      }
    );

    // Check if the upload was successful
    if (uploadTx.code !== 0) {
      console.log(`Failed to upload contract: ${uploadTx.rawLog}`);
      return;
    }

    // Get the code ID (needed for contract instantiation)
    const codeId = Number(uploadTx.logs[0].events[0].attributes.find((attr) => attr.key === "code_id").value);
    console.log(`Contract uploaded with Code ID: ${codeId}`);

    // Step 2: Instantiate the contract
    console.log("Instantiating contract...");

    const instantiateTx = await secretjs.tx.compute.instantiateContract(
      {
        sender: walletAddress,
        codeId: codeId,
        initMsg: {
          // Initialization message for your contract
          admin: walletAddress, // Optional: Contract admin address
          // Add any custom initialization parameters here
        },
        label: `MyContract-${Date.now()}`,  // Contract label, can be any string
      },
      {
        gasLimit: 1000000, // Adjust gas limit as needed
      }
    );

    // Check if the contract instantiation was successful
    if (instantiateTx.code !== 0) {
      console.log(`Failed to instantiate contract: ${instantiateTx.rawLog}`);
      return;
    }

    // Get the contract address
    const contractAddress = instantiateTx.logs[0].events[0].attributes.find((attr) => attr.key === "contract_address").value;
    console.log(`Contract instantiated at: ${contractAddress}`);

  } catch (error) {
    console.error("Error during deployment:", error);
  }
};

// Execute the deployment
main()
  .then(() => {
    console.log("Contract deployment complete.");
  })
  .catch((err) => {
    console.error("Failed to deploy contract:", err);
  });

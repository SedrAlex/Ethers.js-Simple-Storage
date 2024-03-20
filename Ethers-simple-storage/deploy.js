const ethers = require("ethers");
const fs = require("fs-extra");
async function main() {
  //compile them in our code
  //compile them seperatly

  const provider = new ethers.providers.JsonRpcProvider(
    "http://127.0.0.1:7545"
  );
  const wallet = new ethers.Wallet(
    "0x593cb2f626f47bb667f20464b4322fd81d63fb1faaf3edcd7af4027c17c02ee8",
    provider
  );
  const abi = fs.readFileSync("./SimpleStorage_sol_SimpleStorage.abi", "utf8");
  const binary = fs.readFileSync(
    "./SimpleStorage_sol_SimpleStorage.bin",
    "utf8"
  );
  const contractFactory = new ethers.ContractFactory(abi, binary, wallet);
  console.log("Deploying, please wait...");
  const contract = await contractFactory.deploy(); // stop here wait the contract for being deployed
  const transactionReceipt = await contract.deployTransaction.wait(1); // after the confirmation
  console.log("Here is the  deployment transaction (transaction response:)");
  console.log(contract.deployTransaction);
  console.log("Here is the  transaction receipt");
  console.log(transactionReceipt);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });

// before using hardhat framework we are gonna use ganach, which is a fake blockchain environment, that is used to test, compile and deploy smart contracts

import Web3 from "web3";
import "bootstrap/dist/css/bootstrap.css";
require("dotenv").config({ path: "../.env" });
const { MNEMONIC, PROJECT_ID } = process.env;
console.log("AA");
const web3 = new Web3(
  Web3.givenProvider || `https://goerli.infura.io/v3/${PROJECT_ID}`
);

async function main() {
  const accounts = await web3.eth.requestAccounts();
  const account = accounts[0];
  document.getElementById("account").innerText = account;
}

main();

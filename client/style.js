import Web3 from "web3";
import "bootstrap/dist/css/bootstrap.css";

const web3 = new Web3(Web3.givenProvider || "http://127.0.0.1:7545");

async function main() {
  const accounts = await web3.eth.requestAccounts();
  const account = accounts[0];
  document.getElementById("account").innerText = account;
}

main();

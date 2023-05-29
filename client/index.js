const express = require("express");
const Web3 = require("web3");
const configuration = require("../build/contracts/Pastebin.json"); // assuming the path is correct
const bodyParser = require("body-parser");
require("dotenv").config({ path: "../.env" });
const { MNEMONIC, PROJECT_ID } = process.env;
const HDWalletProvider = require("@truffle/hdwallet-provider");
const app = express();

app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

const CONTRACT_ADDRESS = configuration.networks["5"].address;
const CONTRACT_ABI = configuration.abi;

const provider = new HDWalletProvider(
  MNEMONIC,
  `https://goerli.infura.io/v3/${PROJECT_ID}`
);
let web3 = new Web3(provider);

// check if connected to network
// web3.eth.getBlockNumber()
// .then((result) => {
//   console.log("Latest block number is:", result);
// })
// .catch((error) => {
//   console.error("Error fetching latest block number:", error);
// });

const contract = new web3.eth.Contract(CONTRACT_ABI, CONTRACT_ADDRESS);
app.get("/favicon.ico", (req, res) => res.status(204).send());
app.get("/", (req, res) => {
  // Serve the index.html file here
  res.sendFile(__dirname + "/index.html");
});

let account;

app.post("/account", (req, res) => {
  account = req.body.account;
  console.log("Connected account:", account);
  // Do whatever you want with the account information
  res.sendStatus(200);
});

app.post("/create", async (req, res) => {
  try {
    const text = req.body.text;
    if (!account) {
      throw new Error("No Ethereum account available.");
    }

    const result = await contract.methods.createPaste(text).send({
      from: account,
      gas: 3000000,
    });

    res.redirect(`/${result.events.NewPaste.returnValues.id}`);
    // res.json(result.events.NewPaste.returnValues.id);
  } catch (err) {
    res.status(500).send(err.toString());
  }
});

app.get("/:id", async (req, res) => {
  const id = req.params.id;
  try {
    const paste = await contract.methods.getPaste(id).call();
    // res.send(paste);
    // res.redirect(`/result/${id}`);
    res.send(paste["0"]);
  } catch (err) {
    res.status(500).send(err.toString());
  }
});

app.listen(1234, () => console.log("Listening on port 1234"));

const express = require("express");
const Web3 = require("web3");
const configuration = require("../build/contracts/Pastebin.json"); // assuming the path is correct
const bodyParser = require("body-parser");

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));

// Parse JSON bodies
app.use(bodyParser.json());

const CONTRACT_ADDRESS = configuration.networks["5777"].address;
const CONTRACT_ABI = configuration.abi;

let web3;

// Check if Web3 provider is available (e.g., MetaMask)
if (typeof window !== "undefined" && typeof window.ethereum !== "undefined") {
  // Use the Web3 provider injected by MetaMask
  web3 = new Web3(window.ethereum);

  // Request access to user accounts
  window.ethereum.enable().catch((error) => {
    console.error("Access to user accounts denied:", error);
  });
} else {
  // Fallback - use local provider
  web3 = new Web3("http://127.0.0.1:7545");
}

const contract = new web3.eth.Contract(CONTRACT_ABI, CONTRACT_ADDRESS);

app.get("/", (req, res) => {
  // Serve the index.html file here
  res.sendFile(__dirname + "/index.html");
});

app.post("/create", async (req, res) => {
  try {
    const text = req.body.text;

    const accounts = await web3.eth.getAccounts();
    const account = accounts[0];

    const result = await contract.methods.createPaste(text).send({
      from: account,
      gas: 3000000,
    });

    // res.send(result.events.NewPaste.returnValues.id);
    res.redirect(`/${result.events.NewPaste.returnValues.id}`);
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

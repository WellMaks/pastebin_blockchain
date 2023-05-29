const web3 = new Web3(
  Web3.givenProvider ||
    "https://mainnet.infura.io/v3/5ce23bd295244445a1658ef97c82fa17"
);

async function main() {
  const accounts = await web3.eth.requestAccounts();
  const account = accounts[0];
  document.getElementById("account").innerText = account;
  fetch("/account", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ account }),
  });
}

main();

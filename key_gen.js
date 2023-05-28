const ethers = require("ethers");
const wallet = ethers.Wallet.createRandom();
console.log("address:", wallet.address);
console.log("mnemonic:", wallet.mnemonic.phrase);
console.log("privateKey:", wallet.privateKey);
console.log("publicKey:", wallet.publicKey);

// address: 0x0D3a0756D893c72A7Ea326239c50e75068C89D0C
// mnemonic: member potato consider fiber bulb hunt melt truth glue light feature prison
// privateKey: 0xab18a32b359ca89670ba12b9f4e0c4b00d75b597a986a0c8d3c7c7d86fec3491
// publicKey: 0x0236b5602b91d6c42338639d96200099a83bfb5983bfe0576ca196f51da2fc4975

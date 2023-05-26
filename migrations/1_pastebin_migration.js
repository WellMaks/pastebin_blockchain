const Pastebin = artifacts.require("Pastebin");

module.exports = function (deployer) {
  deployer.deploy(Pastebin);
};

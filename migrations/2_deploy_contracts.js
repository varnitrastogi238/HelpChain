const Helpchain = artifacts.require("Helpchain");

module.exports = function(deployer) {
  deployer.deploy(Helpchain);
};
const { network } = require("hardhat");
const { verify } = require("../helper-function");
const { developmentChains } = require("../helper-hardhat-config");

module.exports = async function ({ deployments, getNamedAccounts }) {
  const { deploy, log } = deployments;
  const { deployer } = await getNamedAccounts();

  log("Deploying...");
  const myToken = await deploy("MyToken", {
    from: deployer,
    log: true,
    args: [],
  });
  log("MyToken Deployed!");

  // if (!developmentChains.includes(network.name)) {
  //   await verify(myToken.address, [walletAddress]);
  // }
};

module.exports.tags = ["all", "mytoken"];

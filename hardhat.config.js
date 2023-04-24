require("@nomiclabs/hardhat-waffle");
require("solidity-coverage");
require("hardhat-deploy");
require("dotenv").config();

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: "0.8.18",
  networks: {
    hardhat: {
      chainId: 31337,
    },
    localhost: {
      chainId: 31337,
      url: "",
    },
  },
  namedAccounts: {
    deployer: {
      default: 0,
      1: 0,
    },
    client: {
      default: 1,
    },
  },
};

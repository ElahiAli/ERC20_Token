const { network, ethers, getNamedAccounts, deployments } = require("hardhat");
const { developmentChains } = require("../../helper-hardhat-config");
const { assert, expect } = require("chai");

!developmentChains.includes(network.name)
  ? describe.skip
  : describe("MyToken", function () {
      let deployer, myToken;
      beforeEach(async function () {
        deployer = (await getNamedAccounts()).deployer;
        await deployments.fixture(["all"]);
        myToken = await ethers.getContract("MyToken", deployer);
      });

      describe("constructor", function () {
        it("initalizing variable correctly", async () => {
          const totalSuply = 100000;
          const getTotalSupply = await myToken.totalSupply();
          const name = await myToken.getName();
          const symbol = await myToken.getSymbol();
          const myWalletBalance = await myToken.balanceOf(
            process.env.WALLET_ADDRESS
          );

          assert.equal(totalSuply, getTotalSupply.toString());
          assert.equal(name, "MyToken");
          assert.equal(symbol, "MT");
          assert.equal(myWalletBalance.toString(), "100000");
        });
      });

      describe("transfer", function () {
        it("sender should have more than or equal to the specified amount ", async () => {
          //   await expect()
        });
      });
    });

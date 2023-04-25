const { network, ethers, getNamedAccounts, deployments } = require("hardhat");
const { developmentChains } = require("../../helper-hardhat-config");
const { assert, expect } = require("chai");

!developmentChains.includes(network.name)
  ? describe.skip
  : describe("MyToken", function () {
      let deployer, client, myToken;
      beforeEach(async function () {
        deployer = (await getNamedAccounts()).deployer;
        client = (await getNamedAccounts()).client;
        await deployments.fixture(["all"]);
        myToken = await ethers.getContract("MyToken", deployer);
      });

      describe("constructor", function () {
        it("initalizing variable correctly", async () => {
          const totalSuply = 100000;
          const getTotalSupply = await myToken.totalSupply();
          const name = await myToken.getName();
          const symbol = await myToken.getSymbol();
          const myWalletBalance = await myToken.balanceOf(deployer);

          assert.equal(totalSuply, getTotalSupply.toString());
          assert.equal(name, "MyToken");
          assert.equal(symbol, "MT");
          assert.equal(myWalletBalance.toString(), "100000");
        });
      });

      describe("transfer", function () {
        it("sender should have more than or equal to the specified amount ", async () => {
          await expect(myToken.transfer(client, 1000000)).to.be.reverted;
        });
        it("the balance of sender and receiver should changed", async () => {
          await myToken.transfer(client, 3000);
          const balanceOfSender = await myToken.balanceOf(deployer);
          const balanceOfReceiver = await myToken.balanceOf(client);

          assert.equal(balanceOfSender.toString(), 97000);
          assert.equal(balanceOfReceiver.toString(), 3000);
          await expect(myToken.transfer(client, 3000)).to.emit(
            myToken,
            "Transfer"
          );
        });
      });

      describe("approve", function () {
        it("allowing the spender to have limited access to deployer tokens", async () => {
          const success = await myToken.approve(client, 3000);
          const spenderToken = await myToken.allowance(deployer, client);

          assert.equal(spenderToken.toString(), 3000);
          await expect(myToken.approve(deployer, client)).to.emit(
            myToken,
            "Approval"
          );
        });
      });

      describe("transferFrom", function () {
        it("updating the balances", async () => {
          const trasferFromTx = await myToken.transferFrom(
            deployer,
            client,
            3000
          );
          const senderBalance = await myToken.balanceOf(deployer);
          const receiverBalance = await myToken.balanceOf(client);
          const clientReceiveApprove = await myToken.allowance(
            deployer,
            client
          );

          assert.equal(senderBalance.toString(), 97000);
          assert.equal(receiverBalance.toString(), 3000);
          assert.equal(clientReceiveApprove.toString(), 3000);
          await expect(trasferFromTx).to.emit(myToken, "Transfer");
        });
      });
    });

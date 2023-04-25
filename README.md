# ERC20 Token

This repository contains an implementation of an ERC20 token on the Ethereum blockchain. ERC20 is a standard interface for tokens on the Ethereum network, and this implementation provides a basic framework for creating and managing tokens.

## Installation

To use this ERC20 token implementation, you'll need to have Node.js and yarn installed on your system. Once you have those installed, you can install the necessary dependencies by running:

```
yarn add --dev yarn-install
```

## Usage

To deploy the ERC20 token on the Ethereum network, you'll need to have an Ethereum wallet and some ether to pay for gas fees. You also can deploy it on testnet like sepolia or on a localhost.

Once you have those things set up, you can deploy the token to the network by running:

```
yarn hardhat deploy --network hardhat
yarn hardhat deploy --network sepolia
```

This will deploy the token contract to the network and print out the contract address. You can then use an Ethereum wallet to interact with the token contract and transfer tokens.

## Test

You can test the contract by running:

```
yarn hardhat test
```

## Contributing

If you find any issues or have any suggestions for improvements, feel free to open an issue or submit a pull request. Contributions are always welcome.

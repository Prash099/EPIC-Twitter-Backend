# Blockchain Twitter-Lite

This project demonstrates a simple version of Twitter with CRUD operations built using Solidity on Goerli Ethereum test network.

This project contains two smart contracts, tests for those contracts and a script to deploy the contract.

Contract

Deployed Address : 0xD35fDe93914f64c13ff9194427D307504cbF1050

[Contract](https://goerli.etherscan.io/address/0xD35fDe93914f64c13ff9194427D307504cbF1050)

Folder Structure
Contracts and Testing

```
.
│   ├── contracts
│   │   └── EpicApp.sol
│   └── test                            # Unit testing
│       └── EpicTweetConsole.test.js
└── README.md
```

File Description

    EpicApp.sol - Tweet Structure, Tweet post, edit, delete methods
    EpicTweetConsole.test.js - 9 testcases.

Authors

@[Prashanth Raghavendra Rao](https://github.com/Prash099)

@[Sameera Holy Sheik Abdullah](https://github.com/iholy19)

@[Ranjitha Vadivel](https://github.com/Ranjithavadivel)

@[Gayathri Anandhasayanan](https://github.com/GayathriAnandhasayanan)

@Clinton Antony Rajasekar

Pre requisites

    Node js
    Node version manager
    Git
    GitHub repository
    VS code
    Hardhat framework

After cloning the project you must install all the dependencies using:

    npm install

To compile, use the following command:

    npm run compile

To test, use the following command:

    npm test

In order to deploy, copy the .env.example file to a file named .env, and then edit it to fill in the details. Enter your Etherscan API key, your Goerli node URL (eg from Alchemy), and the private key of the account which will send the deployment transaction. With a valid .env file in place, run the following command:

    npm run deploy:goerli

To see the test coverage, run:

    npm run coverage

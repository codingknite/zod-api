# ZOD API

This is the API for the [Zod](https://github.com/codingknite/zod) mobile application. It uses nextjs serverless functions.

##$ Setting Up

Fork or Clone the repository to your local machine.

Aftet cloning the repository, install all the packages

```
yarn install

OR

npm run install
```

### Create Wallet

You will need to create a wallet in order for the smart contract to work. I have written a script to create the wallet for you. The wallet is saved in `wallet.json` in the root of the project. Run the following command to run the script.

Make sure this file is included in `.gitignore`

```
node contract/createWallet.js
```

### Deploy Smart Contract

You will need to deploy the smart contract. The contract is in `contract/contract.js` and the deploy script in `contract/deploy.js`. Run the following command to deploy the smart contract

```
node contract/deploy.js
```

alternatively you can also run `yarn deploy:contract` or `npm run deploy:contract` if you're using NPM.


### Setup ArLocal

The server is entirely running in local development mode. Make sure you have arlocal running to be able to interact with the arweave network. Run the following command in a separate terminal

```
npx arlocal
```

That's all you need to setup arlocal.

### Run the Server

To start the server, simply run the following command

```
yarn dev

OR

npm run dev
```

### API Route

All API Routes can be found in `pages/api`. In the browser you can interact with the routes on `localhost:3000/api/<route>`

> Make sure the server is running correctly while you test the application, otherwise it will not work

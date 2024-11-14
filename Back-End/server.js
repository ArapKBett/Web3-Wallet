// server.js
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const { ethers } = require('ethers');
const walletRoutes = require('./routes/wallet');

const app = express();
app.use(bodyParser.json());

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/web3wallet', { useNewUrlParser: true, useUnifiedTopology: true });

// Define a schema for storing user wallets
const walletSchema = new mongoose.Schema({
  address: String,
  privateKey: String,
  seedPhrase: String,
});

const Wallet = mongoose.model('Wallet', walletSchema);

// Endpoint to create a new wallet
app.post('/create-wallet', async (req, res) => {
  const wallet = ethers.Wallet.createRandom();
  const newWallet = new Wallet({
    address: wallet.address,
    privateKey: wallet.privateKey,
    seedPhrase: wallet.mnemonic.phrase,
  });
  await newWallet.save();
  res.json(newWallet);
});

// Endpoint to get wallet details
app.get('/wallet/:address', async (req, res) => {
  const wallet = await Wallet.findOne({ address: req.params.address });
  res.json(wallet);
});
// Add this to server.js
app.post('/deploy-contract', async (req, res) => {
  const { privateKey, bytecode, abi } = req.body;
  const wallet = new ethers.Wallet(privateKey, ethers.getDefaultProvider('ropsten'));
  const factory = new ethers.ContractFactory(abi, bytecode, wallet);
  const contract = await factory.deploy();
  await contract.deployed();
  res.json({ address: contract.address });
});

// Use wallet routes
app.use('/api', walletRoutes);

app.listen(3000, () => {
  console.log('Server running on port 3000');
});

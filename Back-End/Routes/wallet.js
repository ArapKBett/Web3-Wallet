// routes/wallet.js
const express = require('express');
const router = express.Router();
const { ethers } = require('ethers');
const Wallet = require('../models/wallet');

// Create a new wallet
router.post('/create-wallet', async (req, res) => {
  const wallet = ethers.Wallet.createRandom();
  const newWallet = new Wallet({
    address: wallet.address,
    privateKey: wallet.privateKey,
    seedPhrase: wallet.mnemonic.phrase,
  });
  await newWallet.save();
  res.json(newWallet);
});

// Get wallet details
router.get('/wallet/:address', async (req, res) => {
  const wallet = await Wallet.findOne({ address: req.params.address });
  res.json(wallet);
});

module.exports = router;

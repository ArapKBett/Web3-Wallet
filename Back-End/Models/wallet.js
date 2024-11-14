// models/wallet.js
const mongoose = require('mongoose');

const walletSchema = new mongoose.Schema({
  address: {
    type: String,
    required: true,
    unique: true,
  },
  privateKey: {
    type: String,
    required: true,
  },
  seedPhrase: {
    type: String,
    required: true,
  },
}, { timestamps: true });

const Wallet = mongoose.model('Wallet', walletSchema);

module.exports = Wallet;

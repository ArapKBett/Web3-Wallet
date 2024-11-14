// scripts/app.js
document.getElementById('createWallet').addEventListener('click', async () => {
  const response = await fetch('/api/create-wallet', { method: 'POST' });
  const wallet = await response.json();
  document.getElementById('walletDetails').innerText = JSON.stringify(wallet, null, 2);
});

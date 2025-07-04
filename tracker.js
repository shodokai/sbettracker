import { ethers } from 'https://cdn.jsdelivr.net/npm/ethers@5.7.2/dist/ethers.esm.min.js';

const ALCHEMY_URL = 'https://eth-mainnet.g.alchemy.com/v2/gePM5wxRNuFitwByDRapV';
const SHARPLINK_WALLET = '0xCd9e09B30d481cc33937CE33fEB3d94D434F5F75';

const provider = new ethers.providers.JsonRpcProvider(ALCHEMY_URL);

window.fetchBalance = async () => {
  try {
    const balance = await provider.getBalance(SHARPLINK_WALLET);
    const eth = ethers.utils.formatEther(balance);
    document.getElementById('balance').innerText = `${eth} ETH`;
  } catch (err) {
    document.getElementById('balance').innerText = 'Error fetching balance';
    console.error(err);
  }
};

// Fetch once on load
fetchBalance();

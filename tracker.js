async function fetchBalance() {
  try {
    const res = await fetch('/api/holdings');
    const json = await res.json();

    if (!json.holdings || typeof json.holdings !== 'number') {
      throw new Error('Invalid holdings data');
    }

    document.getElementById('balance').innerText = `${json.holdings.toLocaleString()} ETH`;
    const updated = new Date(json.timestamp);
    document.getElementById('updated').innerText =
      `Last updated: ${updated.toLocaleString()}`;
  } catch (err) {
    console.error('Error fetching balance:', err);
    document.getElementById('balance').innerText = 'Error';
    document.getElementById('updated').innerText = err.message;
  }
}

window.onload = fetchBalance;

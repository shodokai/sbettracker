async function fetchBalance() {
  const res = await fetch('https://sbet-worker.nealsalmen.workers.dev/api/holdings');
  let data;
  try {
    data = await res.json();
  } catch (err) {
    document.getElementById('balance').textContent = 'Error parsing data';
    return;
  }

  if (data.holdings != null) {
    document.getElementById('balance').textContent = data.holdings.toLocaleString();
    const date = new Date(data.timestamp);
    document.getElementById('updated').textContent = `Updated: ${date.toLocaleString()}`;
  } else {
    document.getElementById('balance').textContent = 'No data';
    document.getElementById('updated').textContent = '';
  }
}

// Initial call:
fetchBalance();


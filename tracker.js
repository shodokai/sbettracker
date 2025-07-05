async function fetchBalance() {
  const balanceEl = document.getElementById("balance");
  const updatedEl = document.getElementById("updated");

  try {
    const res = await fetch("https://sbet-worker.nealsalmen.workers.dev/api/holdings");
    const data = await res.json();

    if (data && data.holdings) {
      balanceEl.textContent = `${data.holdings.toLocaleString()} ETH`;
      const date = new Date(data.timestamp);
      updatedEl.textContent = `Last updated: ${date.toLocaleString()}`;
    } else {
      balanceEl.textContent = "N/A";
      updatedEl.textContent = "Failed to load data";
    }
  } catch (err) {
    balanceEl.textContent = "Error";
    updatedEl.textContent = "Could not fetch data.";
    console.error("Fetch error:", err);
  }
}

// Initial load
fetchBalance();


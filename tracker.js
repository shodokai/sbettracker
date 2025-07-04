const API = "https://sbet-worker.nealsalmen.workers.dev/api/holdings";

async function fetchBalance() {
  try {
    const res = await fetch(API);
    const data = await res.json();

    if (data.holdings) {
      document.getElementById("balance").innerText =
        `${Number(data.holdings).toLocaleString()} ETH`;
    } else {
      document.getElementById("balance").innerText = "No data available";
    }

    const dt = new Date(data.timestamp).toLocaleString();
    document.getElementById("updated").innerText = `Last updated: ${dt}`;
  } catch (err) {
    document.getElementById("balance").innerText = "Error fetching data";
    document.getElementById("updated").innerText = "";
    console.error(err);
  }
}

// Auto-run on page load
fetchBalance();

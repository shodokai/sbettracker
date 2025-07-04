async function fetchBalance() {
  try {
    const res = await fetch("https://sbet-worker.nealsalmen.workers.dev/api/holdings");
    const data = await res.json();

    if (data.holdings != null) {
      document.getElementById("balance").innerText = `${data.holdings} ETH`;
      const time = new Date(data.timestamp).toLocaleString();
      document.getElementById("updated").innerText = `Last updated: ${time}`;
    } else {
      document.getElementById("balance").innerText = "Error fetching data";
      document.getElementById("updated").innerText = "";
    }
  } catch (err) {
    document.getElementById("balance").innerText = "Error fetching data";
    document.getElementById("updated").innerText = "";
  }
}

window.onload = fetchBalance;

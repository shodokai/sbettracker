async function fetchBalance() {
  const res = await fetch("https://sbet-worker.nealsalmen.workers.dev/api/holdings");
  const json = await res.json();

  if (json.holdings && typeof json.holdings === "number") {
    document.getElementById("balance").innerText =
      `${json.holdings.toLocaleString()} ETH`;
    document.getElementById("updated").innerText =
      `Last updated: ${new Date(json.timestamp).toLocaleString()}`;
  } else {
    document.getElementById("balance").innerText = "Error fetching data";
    document.getElementById("updated").innerText = "";
  }
}

fetchBalance();

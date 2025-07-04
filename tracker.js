async function fetchBalance() {
  try {
    const res = await fetch("https://sbet-worker.nealsalmen.workers.dev/api/holdings");
    const data = await res.json();

    if (data && data.holdings) {
      document.getElementById("balance").textContent = data.holdings + " ETH";
      const updatedTime = new Date(data.timestamp).toLocaleString();
      document.getElementById("updated").textContent = `Updated: ${updatedTime}`;
    } else {
      document.getElementById("balance").textContent = "Error fetching data";
    }
  } catch (err) {
    document.getElementById("balance").textContent = "Error fetching data";
  }
}

function showHoldings() {
  document.getElementById("newsSection").style.display = "none";
  document.getElementById("holdings").style.display = "block";
}

function showNews() {
  document.getElementById("holdings").style.display = "none";
  document.getElementById("newsSection").style.display = "block";
  fetchNews();
}

async function fetchNews() {
  try {
    const res = await fetch("https://sbet-worker.nealsalmen.workers.dev/api/news");
    const news = await res.json();

    const list = document.getElementById("newsList");
    list.innerHTML = "";

    news.forEach(item => {
      const li = document.createElement("li");
      li.innerHTML = `<a href="${item.link}" target="_blank">${item.title}</a>`;
      list.appendChild(li);
    });
  } catch (err) {
    const list = document.getElementById("newsList");
    list.innerHTML = "<li>Error loading news. Try again later.</li>";
  }
}

// Initial load
fetchBalance();

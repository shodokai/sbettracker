# 📊 SBETTracker – Sharplink ETH Holdings Monitor

This project tracks the Ethereum (ETH) holdings of Sharplink Gaming, displaying the most recent publicly available figure from their press releases.

---

## ✅ Current Status (as of July 4, 2025)

- Live site URL: [https://sbettracker.com](https://sbettracker.com)
- Backend Worker: [Cloudflare Worker @ sbet-worker](https://sbet-worker.nealsalmen.workers.dev/api/holdings)
- GitHub repo: https://github.com/shodokai/sbettracker

---

## 💻 Files In Use

- `index.html`: Front-end display (latest ETH holdings shown, auto-refresh button)
- `src/index.js`: Cloudflare Worker logic fetching ETH from Sharplink's press release
- `wrangler.toml`: Configuration file for Worker + KV binding
- KV Key: `latest_eth` is manually updated for now

---

## ✅ Features Complete

- ✅ Frontend shows ETH holdings from Cloudflare Worker
- ✅ Cloudflare Worker deployed and tested
- ✅ Manual update via `wrangler kv key put` working
- ✅ Press release number correctly parsed from individual PR page

---

## 🧠 TODO / Future Enhancements

- [ ] Automate KV updates from the latest press release page
- [ ] Add a news feed from `investors.sharplink.com/press-releases/`
- [ ] Format ETH with thousands separator (e.g. `198,167`)
- [ ] Add favicon + SEO meta tags
- [ ] Make mobile-friendly
- [ ] Add staking yield tracker

---

## 🔁 How to Update ETH Holdings

```bash
wrangler kv:key put latest_eth '{"holdings":198167,"timestamp":TIMESTAMP}' --namespace-id=afaaf6c1dac04d71966a22e88521e07f --remote

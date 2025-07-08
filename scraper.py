import requests
import re
import json
from datetime import datetime, timezone

URL = "https://investors.sharplink.com/sharplink-grows-eth-holdings-to-205634-earns-322-eth-in-staking-rewards-since-launch-of-treasury-strategy-on-june-2-2025/"
DATA_FILE = "data.json"

def extract_eth_balance(text, min_value=150000, max_value=500000):
    eth_related_sentences = re.findall(r'([^.]*?(?:ETH|Ethereum)[^.]*\d{3,}[^.]*)\.', text, re.IGNORECASE)
    
    for sentence in eth_related_sentences:
        numbers = re.findall(r'[\d,]+(?:\.\d+)?', sentence)
        for num in numbers:
            try:
                clean = num.replace(',', '').strip()
                value = float(clean)
                if min_value < value < max_value:
                    return value
            except ValueError:
                continue
    return None

def main():
    response = requests.get(URL)
    eth_balance = extract_eth_balance(response.text)

    if eth_balance:
        now_utc = datetime.now(timezone.utc).isoformat()
        with open(DATA_FILE, "w") as f:
            json.dump({
                "eth": eth_balance,
                "updated_at": now_utc,
                "source": URL
            }, f, indent=2)
        print(f"Updated ETH balance to {eth_balance} at {now_utc}")
    else:
        print("No ETH balance found in valid range.")

if __name__ == "__main__":
    main()

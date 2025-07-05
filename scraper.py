import requests
import re
import json

URL = "https://investors.sharplink.com/sharplink-gaming-to-ring-nasdaq-closing-bell-on-july-7-2025-celebrating-ethereum-treasury-milestone/"
DATA_FILE = "data.json"

def extract_eth_balance(text, min_value=150000, max_value=500000):
    # Find sentences that mention ETH or Ethereum and contain numbers
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
        with open(DATA_FILE, "w") as f:
            json.dump({"eth": eth_balance}, f, indent=2)
        print(f"Updated ETH balance to {eth_balance}")
    else:
        print("No ETH balance found in valid range.")

if __name__ == "__main__":
    main()

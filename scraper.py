import requests
import re
import json

URL = "https://investors.sharplink.com/sharplink-gaming-to-ring-nasdaq-closing-bell-on-july-7-2025-celebrating-ethereum-treasury-milestone/"
DATA_FILE = "data.json"

def extract_large_eth_number(text, threshold=150000):
    # Find all numbers with commas and decimals
    matches = re.findall(r'[\d,]+(?:\.\d+)?', text)
    for num in matches:
        value = float(num.replace(',', ''))
        if value > threshold:
            return value
    return None

def main():
    response = requests.get(URL)
    eth_balance = extract_large_eth_number(response.text)

    if eth_balance:
        with open(DATA_FILE, "w") as f:
            json.dump({"eth": eth_balance}, f, indent=2)
        print(f"Updated ETH balance to {eth_balance}")
    else:
        print("No ETH balance above threshold found.")

if __name__ == "__main__":
    main()

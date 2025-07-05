import requests
import re
import json

URL = "https://investors.sharplink.com/sharplink-gaming-to-ring-nasdaq-closing-bell-on-july-7-2025-celebrating-ethereum-treasury-milestone/"
DATA_FILE = "data.json"

def extract_eth_balance(text):
    match = re.search(r"hold[s]? approximately ([\d,\.]+) ETH", text, re.IGNORECASE)
    if match:
        eth = match.group(1).replace(',', '')
        return float(eth)
    return None

def main():
    response = requests.get(URL)
    eth_balance = extract_eth_balance(response.text)

    if eth_balance:
        with open(DATA_FILE, "w") as f:
            json.dump({"eth": eth_balance}, f, indent=2)
        print(f"Updated ETH balance to {eth_balance}")
    else:
        print("ETH balance not found in page.")

if __name__ == "__main__":
    main()

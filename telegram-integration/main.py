import os
import requests
from dotenv import load_dotenv

load_dotenv()

BOT_TOKEN = os.getenv("BOT_TOKEN")
CHAT_ID = os.getenv("CHAT_ID")

def send_to_telegram(club, name, email, phone, department, year, essay):
    if not BOT_TOKEN or not CHAT_ID:
        print("Telegram credentials not set.")
        return

    message = f"""
New Club Registration:
Club: {club}
Name: {name}
Email: {email}
Phone: {phone}
Department: {department}
Year: {year}
Essay: {essay}
"""

    url = f"https://api.telegram.org/bot{BOT_TOKEN}/sendMessage"

    try:
        response = requests.post(url, data={
            "chat_id": CHAT_ID,
            "text": message
        })
        print(f"Telegram response: {response.text}")
    except Exception as e:
        print(f"Failed to send to Telegram: {e}")

# TEST RUN
send_to_telegram("Test Club", "Test User", "test@email.com", "1234567890", "Computer Science", "3rd Year", "Test essay")
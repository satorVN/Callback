# app.py
from flask import Flask, request
import hashlib

app = Flask(__name__)
API_KEY = "YOUR_API_KEY"  # Thay bằng API key thật

@app.route("/callback", methods=["POST"])
def callback():
    data = request.form.to_dict()
    raw = f"{data['request_id']}{data['code']}{data['serial']}{data['telco']}{data['amount']}{data['status']}{data['message']}{API_KEY}"
    if hashlib.md5(raw.encode()).hexdigest() != data.get("sign"):
        return "Invalid sign", 400
    if data["status"] == "1":
        print("✅ Nạp thành công:", data)
    else:
        print("❌ Nạp thất bại:", data["message"])
    return "OK"

@app.route("/")
def home():
    return "Callback server is running!"

if __name__ == "__main__":
    app.run()

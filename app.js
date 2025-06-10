const express = require("express");
const bodyParser = require("body-parser");
const crypto = require("crypto");

const app = express();
const port = 3000;

const API_KEY = "Fshukr0Ewx7n3vmdDUfSLqqaX7Uf5gUR"; // ⚠️ Thay bằng API key thật từ Card2K

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.get("/", (req, res) => {
  res.send("Card2K Callback Server is running!");
});

app.post("/callback", (req, res) => {
  const data = req.body;
  
  // Log ra console để kiểm tra
  console.log("📥 Callback received:", data);

  const {
    request_id,
    code,
    serial,
    telco,
    amount,
    status,
    message,
    sign
  } = data;

  // Tạo sign để xác minh
  const raw = request_id + code + serial + telco + amount + status + message + API_KEY;
  const calculatedSign = crypto.createHash("md5").update(raw).digest("hex");

  if (calculatedSign !== sign) {
    console.log("❌ Sai chữ ký xác thực!");
    return res.status(400).send("Invalid sign");
  }

  if (status === "1") {
    console.log("✅ Nạp thành công:", amount);
    // TODO: Ghi vào DB, cộng tiền, gửi Discord, v.v.
  } else {
    console.log("❌ Nạp thất bại:", message);
  }

  return res.send("OK");
});

app.listen(port, () => {
  console.log(`🚀 Server running on port ${port}`);
});

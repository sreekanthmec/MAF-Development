const express = require("express");
const cors = require("cors");
const jwt = require("jsonwebtoken");
const app = express();

app.use(cors());
app.use(express.json());

const JWT_SECRET = "supersecretkey"; // Use env in production
const OTP_EXPIRY_MS = 5 * 60 * 1000; // 5 minutes

// In-memory stores
const users = {}; // { mobileNumber: { countryCode, role, ... } }
const otps = {}; // { mobileNumber: { otp, expiresAt, role } }

// Hardcoded trainer credentials for demo
const trainers = {
  "trainer@example.com": {
    password: "trainer123",
    name: "John Trainer",
    role: "trainer"
  }
};

// Trainer login endpoint
app.post("/api/trainer/login", (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({ error: "Email and password are required" });
  }
  
  const trainer = trainers[email];
  if (!trainer || trainer.password !== password) {
    return res.status(401).json({ error: "Invalid email or password" });
  }
  
  // Issue JWT
  const accessToken = jwt.sign(
    { email, role: "trainer", _id: email, exp: Math.floor(Date.now() / 1000) + 60 * 60 },
    JWT_SECRET
  );
  
  res.json({ accessToken, user: { email, name: trainer.name, role: "trainer" } });
});

// Send OTP endpoint
app.post("/api/otp/send", (req, res) => {
  const { countryCode, mobileNumber, role } = req.body;
  if (!countryCode || !mobileNumber || !role) {
    return res.status(400).json({ error: "countryCode, mobileNumber, and role are required" });
  }
  // For demo, OTP is always 1234
  const otp = "1234";
  otps[mobileNumber] = {
    otp,
    expiresAt: Date.now() + OTP_EXPIRY_MS,
    role,
  };
  // Optionally, send OTP via SMS here
  res.json({ message: `OTP sent to ${countryCode}${mobileNumber} for role ${role}` });
});

// Validate OTP endpoint
app.post("/api/otp/validate", (req, res) => {
  const { countryCode, mobileNumber, otpCode, role } = req.body;
  if (!countryCode || !mobileNumber || !otpCode || !role) {
    return res.status(400).json({ error: "countryCode, mobileNumber, otpCode, and role are required" });
  }
  const otpEntry = otps[mobileNumber];
  if (!otpEntry || otpEntry.otp !== otpCode || otpEntry.role !== role) {
    return res.status(401).json({ error: "Invalid OTP or role" });
  }
  if (Date.now() > otpEntry.expiresAt) {
    delete otps[mobileNumber];
    return res.status(401).json({ error: "OTP expired" });
  }
  // Register user if not exists
  if (!users[mobileNumber]) {
    users[mobileNumber] = { countryCode, mobileNumber, role };
  }
  // Issue JWT
  const user = users[mobileNumber];
  const accessToken = jwt.sign(
    { countryCode, mobileNumber, role, _id: mobileNumber, exp: Math.floor(Date.now() / 1000) + 60 * 60 },
    JWT_SECRET
  );
  delete otps[mobileNumber]; // Invalidate OTP after use
  res.json({ accessToken, user });
});

app.get("/api/ping", (req, res) => {
  res.json({ message: "API is working!" });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

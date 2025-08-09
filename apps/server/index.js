const express = require("express");
const cors = require("cors");
const jwt = require("jsonwebtoken");
const app = express();

// CORS configuration for production
app.use(cors({
  origin: process.env.NODE_ENV === 'production' 
    ? [
        'https://energetic-grace-production.up.railway.app',
        'https://your-client-domain.com', // Replace with your actual client domain
        'http://localhost:3000', // Keep localhost for development
        'http://localhost:3001'
      ]
    : ['http://localhost:3000', 'http://localhost:3001'],
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With']
}));
app.use(express.json());

// Request logging middleware
app.use((req, res, next) => {
  console.log(`${new Date().toISOString()} - ${req.method} ${req.path} - ${req.ip}`);
  next();
});

const JWT_SECRET = process.env.JWT_SECRET || "supersecretkey"; // Use env in production
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

// Health check endpoint
app.get("/api/ping", (req, res) => {
  res.json({ 
    message: "API is working!", 
    timestamp: new Date().toISOString(),
    environment: process.env.NODE_ENV || 'development',
    port: PORT
  });
});

// Root endpoint for basic connectivity test
app.get("/", (req, res) => {
  res.json({ 
    message: "MAF Development Server", 
    status: "running",
    timestamp: new Date().toISOString()
  });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error('Error:', err.stack);
  res.status(500).json({ 
    error: 'Something went wrong!',
    message: process.env.NODE_ENV === 'production' ? 'Internal server error' : err.message
  });
});

// 404 handler
app.use('*', (req, res) => {
  res.status(404).json({ error: 'Route not found' });
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`🚀 MAF Development Server started successfully!`);
  console.log(`📍 Server running on port: ${PORT}`);
  console.log(`🌍 Environment: ${process.env.NODE_ENV || 'development'}`);
  console.log(`⏰ Started at: ${new Date().toISOString()}`);
  console.log(`🔗 Health check: http://localhost:${PORT}/api/ping`);
});

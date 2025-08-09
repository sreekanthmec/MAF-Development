const express = require("express");
const cors = require("cors");
const jwt = require("jsonwebtoken");

console.log('🚀 Starting clean server...');
console.log('📦 Dependencies loaded successfully');

const app = express();
const PORT = process.env.PORT || 5000;

// Basic middleware
app.use(express.json());
console.log('✅ Basic middleware configured');

// CORS setup
const corsOptions = {
  origin: process.env.NODE_ENV === 'production' 
    ? ['https://energetic-grace-production.up.railway.app', 'http://localhost:3000']
    : ['http://localhost:3000'],
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With']
};

app.use(cors(corsOptions));
console.log('✅ CORS configured');

// Request logging
app.use((req, res, next) => {
  console.log(`${new Date().toISOString()} - ${req.method} ${req.path}`);
  next();
});

// JWT secret
const JWT_SECRET = process.env.JWT_SECRET || "supersecretkey";

// In-memory stores
const users = {};
const otps = {};
const trainers = {
  "trainer@example.com": {
    password: "trainer123",
    name: "John Trainer",
    role: "trainer"
  }
};

// Trainer login
app.post("/api/trainer/login", (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({ error: "Email and password are required" });
  }
  
  const trainer = trainers[email];
  if (!trainer || trainer.password !== password) {
    return res.status(401).json({ error: "Invalid email or password" });
  }
  
  const accessToken = jwt.sign(
    { email, role: "trainer", _id: email, exp: Math.floor(Date.now() / 1000) + 60 * 60 },
    JWT_SECRET
  );
  
  res.json({ accessToken, user: { email, name: trainer.name, role: "trainer" } });
});

// Send OTP
app.post("/api/otp/send", (req, res) => {
  const { countryCode, mobileNumber, role } = req.body;
  if (!countryCode || !mobileNumber || !role) {
    return res.status(400).json({ error: "countryCode, mobileNumber, and role are required" });
  }
  
  const otp = "1234";
  otps[mobileNumber] = {
    otp,
    expiresAt: Date.now() + (5 * 60 * 1000),
    role,
  };
  
  res.json({ message: `OTP sent to ${countryCode}${mobileNumber} for role ${role}` });
});

// Validate OTP
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
  
  if (!users[mobileNumber]) {
    users[mobileNumber] = { countryCode, mobileNumber, role };
  }
  
  const user = users[mobileNumber];
  const accessToken = jwt.sign(
    { countryCode, mobileNumber, role, _id: mobileNumber, exp: Math.floor(Date.now() / 1000) + 60 * 60 },
    JWT_SECRET
  );
  
  delete otps[mobileNumber];
  res.json({ accessToken, user });
});

// Test endpoints
app.get("/test", (req, res) => {
  res.json({ message: "Test endpoint working!", timestamp: new Date().toISOString() });
});

app.get("/api/ping", (req, res) => {
  res.json({ 
    message: "API is working!", 
    timestamp: new Date().toISOString(),
    environment: process.env.NODE_ENV || 'development',
    port: PORT
  });
});

app.get("/", (req, res) => {
  res.json({ 
    message: "MAF Development Server - Clean Version", 
    status: "running",
    timestamp: new Date().toISOString()
  });
});

// Error handling
app.use((err, req, res, next) => {
  console.error('Error:', err.stack);
  res.status(500).json({ error: 'Something went wrong!' });
});

// 404 handler - using proper wildcard
app.use('/*', (req, res) => {
  res.status(404).json({ error: 'Route not found' });
});

console.log('🔧 Server configuration:');
console.log(`   - PORT: ${PORT}`);
console.log(`   - NODE_ENV: ${process.env.NODE_ENV || 'development'}`);

// Start server
app.listen(PORT, () => {
  console.log(`🚀 Clean server started successfully on port ${PORT}`);
  console.log(`🔗 Health check: http://localhost:${PORT}/api/ping`);
  console.log(`🔗 Root: http://localhost:${PORT}/`);
}).on('error', (err) => {
  console.error('❌ Failed to start clean server:', err.message);
  process.exit(1);
});

// Process handlers
process.on('SIGINT', () => {
  console.log('\n🛑 Shutting down clean server...');
  process.exit(0);
});

process.on('SIGTERM', () => {
  console.log('\n🛑 Shutting down clean server...');
  process.exit(0);
});

process.on('uncaughtException', (err) => {
  console.error('❌ Uncaught Exception:', err);
  process.exit(1);
});

process.on('unhandledRejection', (reason, promise) => {
  console.error('❌ Unhandled Rejection at:', promise, 'reason:', reason);
  process.exit(1);
});

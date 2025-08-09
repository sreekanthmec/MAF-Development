const express = require("express");
const cors = require("cors");
const jwt = require("jsonwebtoken");
const path = require("path");

console.log('🚀 Starting server initialization...');
console.log('📦 Dependencies loaded successfully');

const app = express();

// CORS configuration for production
console.log('🌍 Setting up CORS...');
const corsOptions = {
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
};

console.log('🔧 CORS origins:', corsOptions.origin);
app.use(cors(corsOptions));
app.use(express.json());
console.log('✅ CORS and JSON middleware configured');

// Serve static files from React app build
const buildPath = path.join(__dirname, '../client/build');
app.use(express.static(buildPath));
console.log('📁 Static files configured:', buildPath);

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

const PORT = process.env.PORT || 5000;

console.log('🔧 Server configuration:');
console.log(`   - PORT: ${PORT}`);
console.log(`   - NODE_ENV: ${process.env.NODE_ENV || 'development'}`);
console.log(`   - Current working directory: ${process.cwd()}`);

// Process error handlers
process.on('uncaughtException', (err) => {
  console.error('❌ Uncaught Exception:', err);
  process.exit(1);
});

process.on('unhandledRejection', (reason, promise) => {
  console.error('❌ Unhandled Rejection at:', promise, 'reason:', reason);
  process.exit(1);
});

// Simple test endpoint (no dependencies)
app.get("/test", (req, res) => {
  console.log('🧪 Test endpoint requested');
  res.json({ 
    message: "Test endpoint working!", 
    timestamp: new Date().toISOString(),
    status: "ok"
  });
});

// Health check endpoint
app.get("/api/ping", (req, res) => {
  console.log('🏥 Health check requested');
  res.json({ 
    message: "API is working!", 
    timestamp: new Date().toISOString(),
    environment: process.env.NODE_ENV || 'development',
    port: PORT
  });
});

// Root endpoint serves React app
app.get("/", (req, res) => {
  console.log('🏠 Root endpoint requested - serving React app');
  const buildPath = path.join(__dirname, '../client/build');
  res.sendFile(path.join(buildPath, 'index.html'));
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error('Error:', err.stack);
  res.status(500).json({ 
    error: 'Something went wrong!',
    message: process.env.NODE_ENV === 'development' ? err.message : 'Internal server error'
  });
});

// Catch all handler: send back React's index.html file for any non-API routes
app.get('*', (req, res) => {
  // Don't serve React app for API routes
  if (req.path.startsWith('/api/')) {
    return res.status(404).json({ error: 'API route not found' });
  }
  console.log('🔄 Catch-all route - serving React app for:', req.path);
  const buildPath = path.join(__dirname, '../client/build');
  res.sendFile(path.join(buildPath, 'index.html'));
});

app.listen(PORT, () => {
  console.log(`🚀 MAF Development Server started successfully!`);
  console.log(`📍 Server running on port: ${PORT}`);
  console.log(`🌍 Environment: ${process.env.NODE_ENV || 'development'}`);
  console.log(`⏰ Started at: ${new Date().toISOString()}`);
  console.log(`🔗 Health check: http://localhost:${PORT}/api/ping`);
  console.log(`🔗 Root endpoint: http://localhost:${PORT}/`);
}).on('error', (err) => {
  console.error('❌ Failed to start server:', err.message);
  if (err.code === 'EADDRINUSE') {
    console.error('💡 Port is already in use. Try a different port or kill the process using this port.');
  }
  process.exit(1);
});

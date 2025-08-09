const express = require('express');
const jwt = require('jsonwebtoken');

console.log('🚀 Starting working server...');
console.log('📦 Express loaded successfully');

const app = express();
const PORT = process.env.PORT || 5000;

console.log(`🔧 Server configuration:`);
console.log(`   - PORT: ${PORT}`);
console.log(`   - NODE_ENV: ${process.env.NODE_ENV || 'development'}`);

// CORS configuration
const corsOptions = {
  origin: process.env.NODE_ENV === 'production' 
    ? ['https://energetic-grace-production.up.railway.app', 'https://energetic-grace-production.up.railway.app/']
    : ['http://localhost:3000', 'http://localhost:3001'],
  credentials: true,
  optionsSuccessStatus: 200
};

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', req.headers.origin);
  res.header('Access-Control-Allow-Credentials', true);
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
  
  if (req.method === 'OPTIONS') {
    res.sendStatus(200);
  } else {
    next();
  }
});

console.log('✅ CORS middleware configured');

console.log(`   - Working directory: ${process.cwd()}`);

// Basic middleware
app.use(express.json());

// JWT secret
const JWT_SECRET = process.env.JWT_SECRET || "supersecretkey";
console.log('✅ JWT configured');

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

console.log('✅ In-memory stores configured');

// Trainer login endpoint
app.post("/api/trainer/login", (req, res) => {
  console.log('🔐 Trainer login endpoint hit');
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

// Send OTP endpoint
app.post("/api/otp/send", (req, res) => {
  console.log('📱 Send OTP endpoint hit');
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

// Validate OTP endpoint
app.post("/api/otp/validate", (req, res) => {
  console.log('✅ Validate OTP endpoint hit');
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

console.log('✅ Authentication endpoints configured');

// Test endpoint
app.get('/test', (req, res) => {
  console.log('🧪 Test endpoint hit');
  res.json({
    message: 'Working server test endpoint working!',
    timestamp: new Date().toISOString()
  });
});

// Health check
app.get('/api/ping', (req, res) => {
  console.log('🏥 Health check hit');
  res.json({
    message: 'Health check passed!',
    timestamp: new Date().toISOString(),
    status: 'healthy'
  });
});

// Root endpoint
app.get('/', (req, res) => {
  console.log('🏠 Root endpoint hit');
  res.json({
    message: 'MAF Working Server with Authentication',
    timestamp: new Date().toISOString()
  });
});

// Start server
app.listen(PORT, () => {
  console.log(`✅ Working server started successfully on port ${PORT}`);
  console.log(`🔗 Test endpoint: http://localhost:${PORT}/test`);
  console.log(`🔗 Health check: http://localhost:${PORT}/api/ping`);
  console.log(`🔗 Root: http://localhost:${PORT}/`);
}).on('error', (err) => {
  console.error('❌ Failed to start working server:', err.message);
  process.exit(1);
});

// Process handlers
process.on('SIGINT', () => {
  console.log('\n🛑 Shutting down working server...');
  process.exit(0);
});

process.on('SIGTERM', () => {
  console.log('\n🛑 Shutting down working server...');
  process.exit(0);
});

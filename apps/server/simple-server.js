const express = require('express');

console.log('🚀 Starting simplified main server...');
console.log('📦 Express loaded successfully');

const app = express();
const PORT = process.env.PORT || 5000;

console.log(`🔧 Server configuration:`);
console.log(`   - PORT: ${PORT}`);
console.log(`   - NODE_ENV: ${process.env.NODE_ENV || 'development'}`);
console.log(`   - Working directory: ${process.cwd()}`);

// Basic middleware only
app.use(express.json());
console.log('✅ Basic middleware configured');

// Simple endpoints first
app.get('/test', (req, res) => {
  console.log('🧪 Test endpoint hit');
  res.json({ 
    message: 'Simple server test endpoint working!',
    timestamp: new Date().toISOString()
  });
});

app.get('/api/ping', (req, res) => {
  console.log('🏥 Health check hit');
  res.json({ 
    message: 'Health check passed!',
    timestamp: new Date().toISOString(),
    status: 'healthy',
    port: PORT
  });
});

app.get('/', (req, res) => {
  console.log('🏠 Root endpoint hit');
  res.json({ 
    message: 'MAF Development Server - Simplified Version',
    status: 'running',
    timestamp: new Date().toISOString()
  });
});

// Add CORS gradually
console.log('🌍 Setting up CORS...');
try {
  const cors = require('cors');
  const corsOptions = {
    origin: process.env.NODE_ENV === 'production' 
      ? [
          'https://maf-backend-production-5619.up.railway.app',
          'http://localhost:3000',
          'http://localhost:3001'
        ]
      : ['http://localhost:3000', 'http://localhost:3001'],
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With']
  };
  
  console.log('🔧 CORS origins:', corsOptions.origin);
  app.use(cors(corsOptions));
  console.log('✅ CORS configured successfully');
} catch (error) {
  console.error('❌ CORS setup failed:', error.message);
  // Continue without CORS
}

// Add request logging
app.use((req, res, next) => {
  console.log(`${new Date().toISOString()} - ${req.method} ${req.path} - ${req.ip}`);
  next();
});

// Error handling
app.use((err, req, res, next) => {
  console.error('❌ Error:', err);
  res.status(500).json({ error: 'Server error' });
});

// Start server
app.listen(PORT, () => {
  console.log(`✅ Simplified server started successfully on port ${PORT}`);
  console.log(`🔗 Test endpoint: http://localhost:${PORT}/test`);
  console.log(`🔗 Health check: http://localhost:${PORT}/api/ping`);
  console.log(`🔗 Root: http://localhost:${PORT}/`);
}).on('error', (err) => {
  console.error('❌ Failed to start simplified server:', err.message);
  if (err.code === 'EADDRINUSE') {
    console.error('💡 Port is already in use');
  }
  process.exit(1);
});

// Process handlers
process.on('SIGINT', () => {
  console.log('\n🛑 Shutting down simplified server...');
  process.exit(0);
});

process.on('SIGTERM', () => {
  console.log('\n🛑 Shutting down simplified server...');
  process.exit(0);
});

// Add uncaught exception handler
process.on('uncaughtException', (err) => {
  console.error('❌ Uncaught Exception:', err);
  process.exit(1);
});

process.on('unhandledRejection', (reason, promise) => {
  console.error('❌ Unhandled Rejection at:', promise, 'reason:', reason);
  process.exit(1);
});

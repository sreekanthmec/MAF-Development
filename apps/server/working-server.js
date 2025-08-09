const express = require('express');

console.log('🚀 Starting working server...');
console.log('📦 Express loaded successfully');

const app = express();
const PORT = process.env.PORT || 5000;

console.log(`🔧 Server configuration:`);
console.log(`   - PORT: ${PORT}`);
console.log(`   - NODE_ENV: ${process.env.NODE_ENV || 'development'}`);
console.log(`   - Working directory: ${process.cwd()}`);

// Basic middleware
app.use(express.json());

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
    message: 'MAF Working Server',
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

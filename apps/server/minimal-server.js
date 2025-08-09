const express = require('express');

console.log('🚀 Starting minimal server...');
console.log('📦 Express loaded successfully');

const app = express();
const PORT = process.env.PORT || 5000;

console.log(`🔧 Server configuration:`);
console.log(`   - PORT: ${PORT}`);
console.log(`   - NODE_ENV: ${process.env.NODE_ENV || 'development'}`);
console.log(`   - Working directory: ${process.cwd()}`);

// Only essential middleware
app.use(express.json());

// Essential endpoints
app.get('/api/ping', (req, res) => {
  console.log('🏥 Health check hit');
  res.json({ 
    message: 'Minimal server health check passed!',
    timestamp: new Date().toISOString(),
    status: 'healthy'
  });
});

app.get('/', (req, res) => {
  console.log('🏠 Root endpoint hit');
  res.json({ 
    message: 'MAF Minimal Server',
    status: 'running',
    timestamp: new Date().toISOString()
  });
});

// Start server
app.listen(PORT, () => {
  console.log(`✅ Minimal server started successfully on port ${PORT}`);
  console.log(`🔗 Health check: http://localhost:${PORT}/api/ping`);
  console.log(`🔗 Root: http://localhost:${PORT}/`);
}).on('error', (err) => {
  console.error('❌ Failed to start minimal server:', err.message);
  process.exit(1);
});

// Basic process handlers
process.on('SIGINT', () => {
  console.log('\n🛑 Shutting down minimal server...');
  process.exit(0);
});

process.on('SIGTERM', () => {
  console.log('\n🛑 Shutting down minimal server...');
  process.exit(0);
});

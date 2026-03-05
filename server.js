import express from 'express';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3000;

// Allowed hosts
const ALLOWED_HOSTS = [
  'v2summitregistration-production-2d7c.up.railway.app',
  'localhost',
  '127.0.0.1',
];

// CORS middleware
app.use((req, res, next) => {
  const host = req.get('host');
  const origin = req.get('origin');
  
  // Allow requests from allowed hosts
  if (host && ALLOWED_HOSTS.some(allowed => host.includes(allowed))) {
    if (origin) {
      res.setHeader('Access-Control-Allow-Origin', origin);
    }
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Credentials', 'true');
  }
  
  if (req.method === 'OPTIONS') {
    return res.sendStatus(200);
  }
  
  next();
});

// Serve static files from the build directory
app.use(express.static(join(__dirname, 'build')));

// Handle SPA routing - serve index.html for all routes
app.get('*', (req, res) => {
  res.sendFile(join(__dirname, 'build', 'index.html'));
});

app.listen(PORT, '0.0.0.0', () => {
  console.log(`Server is running on port ${PORT}`);
  console.log(`Allowed hosts: ${ALLOWED_HOSTS.join(', ')}`);
});





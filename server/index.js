import express from 'express';
import cors from 'cors';
import pg from 'pg';
import path from 'path';
import { fileURLToPath } from 'url';
import nodemailer from 'nodemailer';

const { Pool } = pg;

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const distPath = path.join(__dirname, '../dist');

const app = express();
const PORT = process.env.PORT || 3000;

// Database Configuration (Supports 'mock' mode for local verification)
let pool;

if (process.env.DATABASE_URL === 'mock') {
  console.log('[Database] Running in MOCK DATABASE mode.');
  pool = {
    connect: async () => ({
      query: async () => {},
      release: () => {}
    }),
    query: async (sql, values) => {
      console.log(`[Mock DB] Executed SQL: ${sql}`);
      console.log('[Mock DB] Values:', values);
      return {
        rows: [{
          id: 42,
          type: values ? values[0] : 'mock',
          name: values ? values[1] : 'mock',
          email: values ? values[2] : null,
          business: values ? values[3] : null,
          subject: values ? values[4] : null,
          service: values ? values[5] : null,
          message: values ? values[6] : 'mock',
          created_at: new Date().toISOString()
        }]
      };
    }
  };
} else {
  const poolConfig = process.env.DATABASE_URL
    ? { connectionString: process.env.DATABASE_URL }
    : {
        user: process.env.PGUSER || 'postgres',
        host: process.env.PGHOST || 'localhost',
        database: process.env.PGDATABASE || 'postgres',
        password: process.env.PGPASSWORD || 'postgres',
        port: parseInt(process.env.PGPORT || '5432', 10),
      };
  pool = new Pool(poolConfig);
}

// Startup migration: Ensure the inquiries table exists
async function initializeDatabase() {
  if (process.env.DATABASE_URL === 'mock') {
    console.log('[Database] inquiries table mocked successfully.');
    return;
  }
  const createTableQuery = `
    CREATE TABLE IF NOT EXISTS inquiries (
      id SERIAL PRIMARY KEY,
      type VARCHAR(50) NOT NULL,
      name VARCHAR(255) NOT NULL,
      email VARCHAR(255),
      business VARCHAR(255),
      subject VARCHAR(255),
      service VARCHAR(255),
      message TEXT NOT NULL,
      created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
    );
  `;
  try {
    const client = await pool.connect();
    await client.query(createTableQuery);
    client.release();
    console.log('[Database] inquiries table initialized successfully.');
  } catch (err) {
    console.error('[Database] Failed to initialize table:', err);
  }
}

initializeDatabase();

// CORS Configuration
const allowedOrigins = [
  'https://dspng.tech',
  'https://www.dspng.tech',
  'http://localhost:3000',
  'http://localhost:5173',
  'https://dspng.space',
  'https://www.dspng.space',
];

app.use(cors({
  origin: (origin, callback) => {
    if (!origin || allowedOrigins.includes(origin) || origin.startsWith('http://localhost:')) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true
}));

app.use(express.json());

// Serve static assets from Vite dist/ folder
app.use(express.static(distPath));

// Health Check Endpoint (For internal database-aware deep testing)
app.get('/health', async (req, res) => {
  try {
    const result = await pool.query('SELECT NOW()');
    res.json({
      status: 'healthy',
      database: process.env.DATABASE_URL === 'mock' ? 'mocked' : 'connected',
      timestamp: result.rows[0].now || new Date().toISOString(),
    });
  } catch (err) {
    console.error('[Health] Database connection error:', err);
    res.status(500).json({
      status: 'unhealthy',
      database: 'error',
      message: err.message,
    });
  }
});

// Database-Independent Public Status Endpoints (For external uptime monitoring)
const handleStatus = (req, res) => {
  res.set('Access-Control-Allow-Origin', '*');
  res.set('Access-Control-Allow-Methods', 'GET, HEAD, OPTIONS');
  res.set('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(204).end();
  }

  if (req.method === 'HEAD') {
    return res.status(200).end();
  }

  res.status(200).json({
    status: 'online',
    service: 'deeps-systems-website',
    timestamp: new Date().toISOString(),
  });
};

app.options('/status', handleStatus);
app.options('/api/status', handleStatus);
app.get('/status', handleStatus);
app.get('/api/status', handleStatus);
app.head('/status', handleStatus);
app.head('/api/status', handleStatus);

// Reusable SMTP transporter configuration via Nodemailer
const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST || 'localhost',
  port: parseInt(process.env.SMTP_PORT || '587', 10),
  secure: process.env.SMTP_SECURE === 'true',
  auth: {
    user: process.env.SMTP_USER || '',
    pass: process.env.SMTP_PASS || '',
  },
});

// Direct SMTP email notification via Nodemailer
async function sendInquiryEmail(type, data) {
  const recipient = 'wokman@dspng.tech';

  let subjectLine = '';
  let htmlBody = '';

  if (type === 'shop') {
    subjectLine = `New Shop Service Inquiry: ${data.service}`;
    htmlBody = `
      <div style="font-family: sans-serif; padding: 20px; line-height: 1.6; max-width: 600px; border: 1px solid #e2e8f0; border-radius: 8px;">
        <h2 style="color: #10b981; border-bottom: 2px solid #e2e8f0; padding-bottom: 10px; margin-top: 0;">New Service Inquiry</h2>
        <p><strong>Full Name:</strong> ${data.name}</p>
        <p><strong>Business Name:</strong> ${data.business}</p>
        <p><strong>Selected Service:</strong> ${data.service}</p>
        <div style="background-color: #f8fafc; padding: 15px; border-left: 4px solid #10b981; margin-top: 20px;">
          <p style="margin: 0; font-weight: bold;">Requirements Message:</p>
          <p style="margin: 10px 0 0 0; white-space: pre-wrap;">${data.message}</p>
        </div>
        <p style="font-size: 11px; color: #64748b; margin-top: 30px; border-top: 1px solid #e2e8f0; padding-top: 10px;">
          Sent from Deeps Systems Monolith
        </p>
      </div>
    `;
  } else {
    subjectLine = `New Contact Inquiry: ${data.subject}`;
    htmlBody = `
      <div style="font-family: sans-serif; padding: 20px; line-height: 1.6; max-width: 600px; border: 1px solid #e2e8f0; border-radius: 8px;">
        <h2 style="color: #10b981; border-bottom: 2px solid #e2e8f0; padding-bottom: 10px; margin-top: 0;">New Contact Inquiry</h2>
        <p><strong>Full Name:</strong> ${data.name}</p>
        <p><strong>Email Address:</strong> ${data.email}</p>
        <p><strong>Subject:</strong> ${data.subject}</p>
        <div style="background-color: #f8fafc; padding: 15px; border-left: 4px solid #10b981; margin-top: 20px;">
          <p style="margin: 0; font-weight: bold;">Inquiry Message:</p>
          <p style="margin: 10px 0 0 0; white-space: pre-wrap;">${data.message}</p>
        </div>
        <p style="font-size: 11px; color: #64748b; margin-top: 30px; border-top: 1px solid #e2e8f0; padding-top: 10px;">
          Sent from Deeps Systems Monolith
        </p>
      </div>
    `;
  }

  const mailOptions = {
    from: process.env.SMTP_USER ? `"Deeps Systems Monolith" <${process.env.SMTP_USER}>` : '"Deeps Systems Monolith" <no-reply@dspng.tech>',
    to: recipient,
    subject: subjectLine,
    html: htmlBody,
  };

  try {
    if (!process.env.SMTP_USER || !process.env.SMTP_PASS) {
      console.log('[Nodemailer] SMTP credentials omitted. Logging email content instead:');
      console.log('To:', recipient);
      console.log('Subject:', subjectLine);
      console.log('Body Preview:', htmlBody.replace(/<[^>]*>/g, '').trim().substring(0, 300) + '...');
      return;
    }

    console.log(`[Nodemailer] Dispatching direct SMTP notification to: ${recipient}`);
    await transporter.sendMail(mailOptions);
    console.log('[Nodemailer] SMTP notification dispatched successfully.');
  } catch (err) {
    console.error('[Nodemailer] SMTP notification failed:', err);
  }
}

// Inquiries API Endpoint
app.post('/api/inquiries', async (req, res) => {
  const { type, name, email, business, subject, service, message } = req.body;

  // Validation
  if (!type || !['contact', 'shop'].includes(type)) {
    return res.status(400).json({ error: 'Invalid or missing inquiry type.' });
  }

  if (!name || typeof name !== 'string' || name.trim().length < 2) {
    return res.status(400).json({ error: 'Name must be at least 2 characters.' });
  }

  if (!message || typeof message !== 'string' || message.trim().length < 10) {
    return res.status(400).json({ error: 'Message must be at least 10 characters.' });
  }

  if (type === 'contact') {
    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return res.status(400).json({ error: 'Valid email address is required for contact inquiry.' });
    }
    if (!subject || typeof subject !== 'string' || subject.trim().length < 4) {
      return res.status(400).json({ error: 'Subject must be at least 4 characters.' });
    }
  }

  if (type === 'shop') {
    if (!business || typeof business !== 'string' || business.trim().length === 0) {
      return res.status(400).json({ error: 'Business name is required for service inquiry.' });
    }
    if (!service || typeof service !== 'string' || service.trim().length === 0) {
      return res.status(400).json({ error: 'Selected service is required.' });
    }
  }

  try {
    // 1. Source of Truth: Save to PostgreSQL
    const insertQuery = `
      INSERT INTO inquiries (type, name, email, business, subject, service, message)
      VALUES ($1, $2, $3, $4, $5, $6, $7)
      RETURNING *
    `;
    const values = [
      type,
      name.trim(),
      type === 'contact' ? email.trim() : null,
      type === 'shop' ? business.trim() : null,
      type === 'contact' ? subject.trim() : null,
      type === 'shop' ? service.trim() : null,
      message.trim(),
    ];

    const result = await pool.query(insertQuery, values);
    const persistedInquiry = result.rows[0];

    console.log(`[Database] Inquiry persisted successfully with ID: ${persistedInquiry.id}`);

    // 2. Best-Effort Notification: Send direct SMTP notification asynchronously in background
    const emailPayload = type === 'contact'
      ? { name, email, subject, message }
      : { name, business, service, message };

    // Trigger in the background so we don't delay client response
    sendInquiryEmail(type, emailPayload);

    // 3. Return success code 201 to user
    return res.status(201).json({
      success: true,
      message: 'Inquiry received and processed.',
      inquiryId: persistedInquiry.id,
    });

  } catch (err) {
    console.error('[API] Error handling inquiry request:', err);
    return res.status(500).json({
      error: 'An internal server error occurred while processing your inquiry.',
    });
  }
});

// Catch-all HEAD endpoint to accept HEAD requests on route catch-all without parsing html
app.head('*', (req, res) => {
  res.status(200).end();
});

// Catch-all route to serve the React SPA index.html for non-API requests
app.get('*', (req, res) => {
  res.sendFile(path.join(distPath, 'index.html'));
});

// Start listening
app.listen(PORT, '0.0.0.0', () => {
  console.log(`[Server] Monolithic Deeps Systems Server listening on port ${PORT}`);
});

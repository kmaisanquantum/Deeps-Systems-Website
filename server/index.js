import express from 'express';
import cors from 'cors';
import pg from 'pg';
import path from 'path';
import { fileURLToPath } from 'url';

const { Pool } = pg;

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const distPath = path.join(__dirname, '../dist');

const app = express();
const PORT = process.env.PORT || 3001;

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

// Health Check Endpoint
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

// Best-effort Formspree notification fallback
async function forwardToFormspree(type, data) {
  const formspreeUrl = process.env.FORMSPREE_URL || 'https://formspree.io/f/mqakppov';
  try {
    console.log(`[Formspree] Attempting fallback notification to: ${formspreeUrl}`);

    // Construct payload suitable for Formspree
    const payload = {
      _subject: type === 'shop'
        ? `New Shop Service Inquiry: ${data.service}`
        : `New Contact Inquiry: ${data.subject}`,
      type,
      ...data
    };

    const response = await fetch(formspreeUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify(payload)
    });

    if (response.ok) {
      console.log('[Formspree] Best-effort notification forwarded successfully.');
    } else {
      console.error(`[Formspree] Failed forwarding with status: ${response.status}`);
    }
  } catch (err) {
    console.error('[Formspree] Asynchronous forwarding encountered an error:', err);
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

    // 2. Best-Effort Notification: Forward to Formspree asynchronously in background
    const formspreePayload = type === 'contact'
      ? { name, email, subject, message }
      : { name, business, service, message };

    // Trigger in the background so we don't delay client response
    forwardToFormspree(type, formspreePayload);

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

// Catch-all route to serve the React SPA index.html for non-API requests
app.get('*', (req, res) => {
  res.sendFile(path.join(distPath, 'index.html'));
});

// Start listening
app.listen(PORT, '0.0.0.0', () => {
  console.log(`[Server] Monolithic Deeps Systems Server listening on port ${PORT}`);
});

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

const USD_TO_PGK_RATE = parseFloat(process.env.USD_TO_PGK_RATE) || 3.6;
const FX_PROVIDER_URL = process.env.FX_PROVIDER_URL || 'https://open.er-api.com/v6/latest/USD';
const FX_REFRESH_MINUTES = parseFloat(process.env.FX_REFRESH_MINUTES) || 360;
const DEEPS_MARKUP_PERCENT = parseFloat(process.env.DEEPS_MARKUP_PERCENT) || 10;
const markupMultiplier = 1 + (DEEPS_MARKUP_PERCENT / 100);

let liveRate = USD_TO_PGK_RATE;
let lastFetched = 0;

function getRate() {
  return liveRate;
}

async function fetchLiveRate() {
  try {
    const res = await fetch(FX_PROVIDER_URL);
    if (!res.ok) {
      throw new Error(`FX Provider returned status ${res.status}`);
    }
    const data = await res.json();
    if (data && data.rates && typeof data.rates.PGK === 'number' && !isNaN(data.rates.PGK) && data.rates.PGK > 0) {
      liveRate = data.rates.PGK;
      lastFetched = Date.now();
      console.log(`[FX Provider] Live USD->PGK exchange rate updated to: ${liveRate}`);
    } else {
      throw new Error('Invalid or missing PGK rate in FX provider response');
    }
  } catch (err) {
    console.warn(`[FX Provider] Failed to fetch live rate from ${FX_PROVIDER_URL}: ${err.message}. Maintaining cached/fallback rate (${liveRate}).`);
  }
}

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

// Startup migration: Ensure the inquiries, orders, order_items, and products tables exist
async function initializeDatabase() {
  if (process.env.DATABASE_URL === 'mock') {
    console.log('[Database] inquiries, orders, order_items, and products tables mocked successfully.');
    return;
  }
  const createInquiriesTableQuery = `
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
  const createOrdersTableQuery = `
    CREATE TABLE IF NOT EXISTS orders (
      id SERIAL PRIMARY KEY,
      customer_name VARCHAR(255) NOT NULL,
      business VARCHAR(255) NOT NULL,
      email VARCHAR(255) NOT NULL,
      total_items INT NOT NULL,
      total_price NUMERIC(12, 2) NOT NULL,
      notes TEXT,
      exchange_rate NUMERIC(12, 4),
      total_price_usd NUMERIC(12, 2),
      markup_percent NUMERIC(5, 2),
      created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
    );
  `;
  const createOrderItemsTableQuery = `
    CREATE TABLE IF NOT EXISTS order_items (
      id SERIAL PRIMARY KEY,
      order_id INT REFERENCES orders(id) ON DELETE CASCADE,
      product_id VARCHAR(255) NOT NULL,
      product_name VARCHAR(255) NOT NULL,
      unit_price NUMERIC(12, 2) NOT NULL,
      quantity INT NOT NULL
    );
  `;
  const createProductsTableQuery = `
    CREATE TABLE IF NOT EXISTS products (
      id SERIAL PRIMARY KEY,
      sku VARCHAR(100) UNIQUE NOT NULL,
      provider VARCHAR(50) NOT NULL DEFAULT 'starlink',
      category VARCHAR(100) NOT NULL,
      name VARCHAR(255) NOT NULL,
      price_pgk NUMERIC(12, 2) NOT NULL,
      price_usd NUMERIC(12, 2),
      billing VARCHAR(50),
      features JSONB,
      active BOOLEAN DEFAULT true,
      created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
    );
  `;
  const seedProductsQuery = `
    INSERT INTO products (sku, provider, category, name, price_pgk, price_usd, billing, features)
    VALUES
      ('starlink-standard', 'starlink', 'shop-starlink', 'Starlink Standard Kit', 2500.00, 694.44, ' once', '[
        "High-speed, low-latency satellite internet",
        "Easy self-install kit with base & cables",
        "Ideal for residential & basic SME setups",
        "All-weather durable performance"
      ]'::jsonb),
      ('starlink-mini', 'starlink', 'shop-starlink', 'Starlink Mini Kit', 1500.00, 416.67, ' once', '[
        "Ultra-portable high-speed internet design",
        "Low power consumption for field work",
        "Integrated router and kickstand built-in",
        "Fits perfectly in a backpack for travel"
      ]'::jsonb),
      ('starlink-business', 'starlink', 'shop-starlink', 'Starlink Business / High-Performance', 9500.00, 2638.89, ' once', '[
        "High-gain flat panel satellite antenna",
        "Double the transmitter power output",
        "Prioritized network priority allocation",
        "Excellent connectivity in extreme weather"
      ]'::jsonb),
      ('starlink-monthly', 'starlink', 'shop-starlink', 'Starlink Monthly Service Plan', 350.00, 97.22, '/ month', '[
        "High-priority data allocation options",
        "Unlimited standard high-speed data",
        "Flexible, commitment-free monthly plans",
        "Authorized local reseller technical support"
      ]'::jsonb)
    ON CONFLICT (sku) DO NOTHING;
  `;
  try {
    const client = await pool.connect();
    await client.query(createInquiriesTableQuery);
    await client.query(createOrdersTableQuery);
    await client.query(createOrderItemsTableQuery);
    await client.query(createProductsTableQuery);

    // Apply migrations for existing databases to add price_usd, exchange_rate, total_price_usd, and markup_percent if they don't exist
    await client.query('ALTER TABLE products ADD COLUMN IF NOT EXISTS price_usd NUMERIC(12, 2);');
    await client.query('ALTER TABLE orders ADD COLUMN IF NOT EXISTS exchange_rate NUMERIC(12, 4);');
    await client.query('ALTER TABLE orders ADD COLUMN IF NOT EXISTS total_price_usd NUMERIC(12, 2);');
    await client.query('ALTER TABLE orders ADD COLUMN IF NOT EXISTS markup_percent NUMERIC(5, 2);');

    await client.query(seedProductsQuery);
    client.release();
    console.log('[Database] inquiries, orders, order_items, and products tables initialized successfully with exchange rate columns.');
  } catch (err) {
    console.error('[Database] Failed to initialize database tables:', err);
  }
}

initializeDatabase();

// Fetch initial live FX rate at startup and schedule background interval refreshes
fetchLiveRate();
setInterval(fetchLiveRate, FX_REFRESH_MINUTES * 60 * 1000);

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

// Canonical Host Redirection: www.dspng.tech -> dspng.tech
app.use((req, res, next) => {
  const host = req.headers.host || '';
  if (host === 'www.dspng.tech') {
    console.log(`[Redirect] Redirecting www.dspng.tech${req.originalUrl} -> https://dspng.tech${req.originalUrl}`);
    return res.redirect(301, `https://dspng.tech${req.originalUrl}`);
  }
  next();
});

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

// Configurable recipient addresses
const MAIL_SALES = process.env.MAIL_SALES || 'sales@dspng.tech';
const MAIL_SERVICE = process.env.MAIL_SERVICE || 'service@dspng.tech';
const MAIL_ADMIN = process.env.MAIL_ADMIN || 'wokman@dspng.tech';

// Direct SMTP email notification via Nodemailer
async function sendInquiryEmail(type, data) {
  let recipient = MAIL_ADMIN;
  let ccRecipient = null;

  if (type === 'shop') {
    recipient = MAIL_SERVICE;
    ccRecipient = MAIL_ADMIN;
  } else {
    // contact inquiry: default to MAIL_ADMIN, but route to MAIL_SALES if purchase intent detected
    const textToAnalyze = `${data.subject || ''} ${data.message || ''}`.toLowerCase();
    const purchaseKeywords = ['buy', 'purchase', 'order', 'price', 'quote', 'cost', 'shop', 'sales', 'pricing', 'acquisition', 'interest'];
    const hasPurchaseIntent = purchaseKeywords.some(keyword => textToAnalyze.includes(keyword));
    if (hasPurchaseIntent) {
      recipient = MAIL_SALES;
    }
  }

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
  if (ccRecipient) {
    mailOptions.cc = ccRecipient;
  }

  try {
    if (!process.env.SMTP_USER || !process.env.SMTP_PASS) {
      console.log('[Nodemailer] SMTP credentials omitted. Logging email content instead:');
      console.log('To:', recipient);
      if (ccRecipient) {
        console.log('Cc:', ccRecipient);
      }
      console.log('Subject:', subjectLine);
      console.log('Body Preview:', htmlBody.replace(/<[^>]*>/g, '').trim().substring(0, 300) + '...');

      // Customer confirmation log fallback
      if (data.email && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) {
        const customerSubjectLine = `Inquiry Confirmed - Deeps Systems`;
        const customerHtmlBody = `
          <div style="font-family: sans-serif; padding: 20px; line-height: 1.6; max-width: 600px; border: 1px solid #e2e8f0; border-radius: 8px;">
            <h2 style="color: #10b981; border-bottom: 2px solid #e2e8f0; padding-bottom: 10px; margin-top: 0;">We have received your inquiry</h2>
            <p>Dear ${data.name},</p>
            <p>Thank you for reaching out to Deeps Systems. This is a confirmation that we have received your inquiry regarding <strong>"${type === 'shop' ? data.service : data.subject}"</strong>.</p>

            <p>Our team will review your inquiry and follow up with you as soon as possible.</p>

            <div style="background-color: #f8fafc; padding: 15px; border-left: 4px solid #10b981; margin-top: 20px;">
              <p style="margin: 0; font-weight: bold;">Your Message:</p>
              <p style="margin: 10px 0 0 0; white-space: pre-wrap;">${data.message}</p>
            </div>

            <p style="font-size: 11px; color: #64748b; margin-top: 30px; border-top: 1px solid #e2e8f0; padding-top: 10px;">
              Deeps Systems Monolith
            </p>
          </div>
        `;
        console.log('[Nodemailer] SMTP credentials omitted. Logging customer inquiry confirmation instead:');
        console.log('To:', data.email);
        console.log('Subject:', customerSubjectLine);
        console.log('Body Preview:', customerHtmlBody.replace(/<[^>]*>/g, '').trim().substring(0, 300) + '...');
      }
      return;
    }

    console.log(`[Nodemailer] Dispatching direct SMTP notification to: ${recipient}${ccRecipient ? `, Cc: ${ccRecipient}` : ''}`);
    await transporter.sendMail(mailOptions);
    console.log('[Nodemailer] SMTP notification dispatched successfully.');
  } catch (err) {
    console.error('[Nodemailer] SMTP notification failed:', err);
  }

  // Automated customer confirmation email (sent only when SMTP credentials are present)
  if (process.env.SMTP_USER && process.env.SMTP_PASS && data.email && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) {
    try {
      const customerSubjectLine = `Inquiry Confirmed - Deeps Systems`;
      const customerHtmlBody = `
        <div style="font-family: sans-serif; padding: 20px; line-height: 1.6; max-width: 600px; border: 1px solid #e2e8f0; border-radius: 8px;">
          <h2 style="color: #10b981; border-bottom: 2px solid #e2e8f0; padding-bottom: 10px; margin-top: 0;">We have received your inquiry</h2>
          <p>Dear ${data.name},</p>
          <p>Thank you for reaching out to Deeps Systems. This is a confirmation that we have received your inquiry regarding <strong>"${type === 'shop' ? data.service : data.subject}"</strong>.</p>

          <p>Our team will review your inquiry and follow up with you as soon as possible.</p>

          <div style="background-color: #f8fafc; padding: 15px; border-left: 4px solid #10b981; margin-top: 20px;">
            <p style="margin: 0; font-weight: bold;">Your Message:</p>
            <p style="margin: 10px 0 0 0; white-space: pre-wrap;">${data.message}</p>
          </div>

          <p style="font-size: 11px; color: #64748b; margin-top: 30px; border-top: 1px solid #e2e8f0; padding-top: 10px;">
            Deeps Systems Monolith
          </p>
        </div>
      `;

      const customerMailOptions = {
        from: `"Deeps Systems Monolith" <${process.env.SMTP_USER}>`,
        to: data.email,
        subject: customerSubjectLine,
        html: customerHtmlBody,
      };

      console.log(`[Nodemailer] Dispatching customer inquiry confirmation to: ${data.email}`);
      await transporter.sendMail(customerMailOptions);
      console.log('[Nodemailer] Customer inquiry confirmation dispatched successfully.');
    } catch (custErr) {
      console.error('[Nodemailer] Customer inquiry confirmation failed:', custErr);
    }
  }
}

// Direct SMTP order email notification via Nodemailer
async function sendOrderEmail(order, items) {
  const subjectLine = `New Order #${order.id} from ${order.customer_name}`;

  const itemsHtml = items.map(item => `
    <tr>
      <td style="padding: 8px; border: 1px solid #e2e8f0;">${item.product_name}</td>
      <td style="padding: 8px; border: 1px solid #e2e8f0; text-align: center;">${item.quantity}</td>
      <td style="padding: 8px; border: 1px solid #e2e8f0; text-align: right;">K${parseFloat(item.unit_price || item.price).toFixed(2)}</td>
      <td style="padding: 8px; border: 1px solid #e2e8f0; text-align: right;">K${(parseFloat(item.unit_price || item.price) * item.quantity).toFixed(2)}</td>
    </tr>
  `).join('');

  const htmlBody = `
    <div style="font-family: sans-serif; padding: 20px; line-height: 1.6; max-width: 600px; border: 1px solid #e2e8f0; border-radius: 8px;">
      <h2 style="color: #10b981; border-bottom: 2px solid #e2e8f0; padding-bottom: 10px; margin-top: 0;">New Order #${order.id}</h2>
      <p><strong>Customer Name:</strong> ${order.customer_name}</p>
      <p><strong>Business Name:</strong> ${order.business}</p>
      <p><strong>Email Address:</strong> ${order.email}</p>

      <h3 style="color: #1e293b; margin-top: 20px;">Ordered Items</h3>
      <table style="width: 100%; border-collapse: collapse; margin-top: 10px;">
        <thead>
          <tr style="background-color: #f8fafc;">
            <th style="padding: 8px; border: 1px solid #e2e8f0; text-align: left;">Product</th>
            <th style="padding: 8px; border: 1px solid #e2e8f0; text-align: center;">Qty</th>
            <th style="padding: 8px; border: 1px solid #e2e8f0; text-align: right;">Unit Price</th>
            <th style="padding: 8px; border: 1px solid #e2e8f0; text-align: right;">Total</th>
          </tr>
        </thead>
        <tbody>
          ${itemsHtml}
        </tbody>
        <tfoot>
          <tr style="font-weight: bold;">
            <td colspan="3" style="padding: 8px; border: 1px solid #e2e8f0; text-align: right;">Grand Total (Charged PGK):</td>
            <td style="padding: 8px; border: 1px solid #e2e8f0; text-align: right;">K${parseFloat(order.total_price).toFixed(2)}</td>
          </tr>
          ${order.exchange_rate ? `
          <tr style="font-size: 12px; color: #475569;">
            <td colspan="3" style="padding: 8px; border: 1px solid #e2e8f0; text-align: right;">Supplier Cost Base (USD):</td>
            <td style="padding: 8px; border: 1px solid #e2e8f0; text-align: right;">$${parseFloat(order.total_price_usd).toFixed(2)}</td>
          </tr>
          <tr style="font-size: 11px; color: #64748b; font-style: italic;">
            <td colspan="3" style="padding: 8px; border: 1px solid #e2e8f0; text-align: right;">Applied Base FX Rate:</td>
            <td style="padding: 8px; border: 1px solid #e2e8f0; text-align: right;">1 USD = ${parseFloat(order.exchange_rate).toFixed(4)} PGK</td>
          </tr>
          <tr style="font-size: 11px; color: #64748b; font-style: italic;">
            <td colspan="3" style="padding: 8px; border: 1px solid #e2e8f0; text-align: right;">Internal Markup Applied:</td>
            <td style="padding: 8px; border: 1px solid #e2e8f0; text-align: right;">${parseFloat(order.markup_percent || DEEPS_MARKUP_PERCENT).toFixed(2)}%</td>
          </tr>
          ` : ''}
        </tfoot>
      </table>

      ${order.notes ? `
        <div style="background-color: #f8fafc; padding: 15px; border-left: 4px solid #10b981; margin-top: 20px;">
          <p style="margin: 0; font-weight: bold;">Customer Notes:</p>
          <p style="margin: 10px 0 0 0; white-space: pre-wrap;">${order.notes}</p>
        </div>
      ` : ''}

      <p style="font-size: 11px; color: #64748b; margin-top: 30px; border-top: 1px solid #e2e8f0; padding-top: 10px;">
        Sent from Deeps Systems Monolith
      </p>
    </div>
  `;

  const mailOptions = {
    from: process.env.SMTP_USER ? `"Deeps Systems Monolith" <${process.env.SMTP_USER}>` : '"Deeps Systems Monolith" <no-reply@dspng.tech>',
    to: MAIL_SALES,
    cc: MAIL_ADMIN,
    subject: subjectLine,
    html: htmlBody,
  };

  try {
    if (!process.env.SMTP_USER || !process.env.SMTP_PASS) {
      console.log('[Nodemailer] SMTP credentials omitted. Logging order email content instead:');
      console.log('To:', MAIL_SALES);
      console.log('Cc:', MAIL_ADMIN);
      console.log('Subject:', subjectLine);
      console.log('Body Preview:', htmlBody.replace(/<[^>]*>/g, '').trim().substring(0, 300) + '...');

      // Customer confirmation log fallback
      if (order.email && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(order.email)) {
        const customerSubjectLine = `Order Confirmation #${order.id} - Deeps Systems`;
        const customerHtmlBody = `
          <div style="font-family: sans-serif; padding: 20px; line-height: 1.6; max-width: 600px; border: 1px solid #e2e8f0; border-radius: 8px;">
            <h2 style="color: #10b981; border-bottom: 2px solid #e2e8f0; padding-bottom: 10px; margin-top: 0;">Thank you for your order!</h2>
            <p>Dear ${order.customer_name},</p>
            <p>Thank you for placing an order with Deeps Systems. We have received your order <strong>#${order.id}</strong> and our team will follow up with you shortly.</p>

            <h3 style="color: #1e293b; margin-top: 20px;">Order Summary</h3>
            <table style="width: 100%; border-collapse: collapse; margin-top: 10px;">
              <thead>
                <tr style="background-color: #f8fafc;">
                  <th style="padding: 8px; border: 1px solid #e2e8f0; text-align: left;">Product</th>
                  <th style="padding: 8px; border: 1px solid #e2e8f0; text-align: center;">Qty</th>
                  <th style="padding: 8px; border: 1px solid #e2e8f0; text-align: right;">Unit Price</th>
                  <th style="padding: 8px; border: 1px solid #e2e8f0; text-align: right;">Total</th>
                </tr>
              </thead>
              <tbody>
                ${itemsHtml}
              </tbody>
              <tfoot>
                <tr style="font-weight: bold;">
                  <td colspan="3" style="padding: 8px; border: 1px solid #e2e8f0; text-align: right;">Grand Total:</td>
                  <td style="padding: 8px; border: 1px solid #e2e8f0; text-align: right;">K${parseFloat(order.total_price).toFixed(2)}</td>
                </tr>
              </tfoot>
            </table>

            <p style="margin-top: 20px;">If you have any questions, please feel free to reply to this email.</p>
            <p style="font-size: 11px; color: #64748b; margin-top: 30px; border-top: 1px solid #e2e8f0; padding-top: 10px;">
              Deeps Systems Monolith
            </p>
          </div>
        `;
        console.log('[Nodemailer] SMTP credentials omitted. Logging customer order confirmation instead:');
        console.log('To:', order.email);
        console.log('Subject:', customerSubjectLine);
        console.log('Body Preview:', customerHtmlBody.replace(/<[^>]*>/g, '').trim().substring(0, 300) + '...');
      }
      return;
    }

    console.log(`[Nodemailer] Dispatching direct SMTP order notification to: ${MAIL_SALES}, Cc: ${MAIL_ADMIN}`);
    await transporter.sendMail(mailOptions);
    console.log('[Nodemailer] SMTP order notification dispatched successfully.');
  } catch (err) {
    console.error('[Nodemailer] SMTP order notification failed:', err);
  }

  // Automated customer confirmation email (sent only when SMTP credentials are present)
  if (process.env.SMTP_USER && process.env.SMTP_PASS && order.email && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(order.email)) {
    try {
      const customerSubjectLine = `Order Confirmation #${order.id} - Deeps Systems`;
      const customerHtmlBody = `
        <div style="font-family: sans-serif; padding: 20px; line-height: 1.6; max-width: 600px; border: 1px solid #e2e8f0; border-radius: 8px;">
          <h2 style="color: #10b981; border-bottom: 2px solid #e2e8f0; padding-bottom: 10px; margin-top: 0;">Thank you for your order!</h2>
          <p>Dear ${order.customer_name},</p>
          <p>Thank you for placing an order with Deeps Systems. We have received your order <strong>#${order.id}</strong> and our team will follow up with you shortly.</p>

          <h3 style="color: #1e293b; margin-top: 20px;">Order Summary</h3>
          <table style="width: 100%; border-collapse: collapse; margin-top: 10px;">
            <thead>
              <tr style="background-color: #f8fafc;">
                <th style="padding: 8px; border: 1px solid #e2e8f0; text-align: left;">Product</th>
                <th style="padding: 8px; border: 1px solid #e2e8f0; text-align: center;">Qty</th>
                <th style="padding: 8px; border: 1px solid #e2e8f0; text-align: right;">Unit Price</th>
                <th style="padding: 8px; border: 1px solid #e2e8f0; text-align: right;">Total</th>
              </tr>
            </thead>
            <tbody>
              ${itemsHtml}
            </tbody>
            <tfoot>
              <tr style="font-weight: bold;">
                <td colspan="3" style="padding: 8px; border: 1px solid #e2e8f0; text-align: right;">Grand Total:</td>
                <td style="padding: 8px; border: 1px solid #e2e8f0; text-align: right;">K${parseFloat(order.total_price).toFixed(2)}</td>
              </tr>
            </tfoot>
          </table>

          <p style="margin-top: 20px;">If you have any questions, please feel free to reply to this email.</p>
          <p style="font-size: 11px; color: #64748b; margin-top: 30px; border-top: 1px solid #e2e8f0; padding-top: 10px;">
            Deeps Systems Monolith
          </p>
        </div>
      `;

      const customerMailOptions = {
        from: `"Deeps Systems Monolith" <${process.env.SMTP_USER}>`,
        to: order.email,
        subject: customerSubjectLine,
        html: customerHtmlBody,
      };

      console.log(`[Nodemailer] Dispatching customer order confirmation to: ${order.email}`);
      await transporter.sendMail(customerMailOptions);
      console.log('[Nodemailer] Customer order confirmation dispatched successfully.');
    } catch (custErr) {
      console.error('[Nodemailer] Customer order confirmation failed:', custErr);
    }
  }
}

// Exchange Rate API Endpoint
app.get('/api/exchange-rate', (req, res) => {
  res.json({
    base: 'USD',
    quote: 'PGK',
    rate: getRate()
  });
});

// Products API Endpoint
app.get('/api/products', async (req, res) => {
  const { provider, category } = req.query;

  if (process.env.DATABASE_URL === 'mock') {
    const mockProducts = [
      {
        id: 'starlink-standard',
        name: 'Starlink Standard Kit',
        price: 2500.00,
        price_usd: 694.44,
        billing: ' once',
        features: [
          "High-speed, low-latency satellite internet",
          "Easy self-install kit with base & cables",
          "Ideal for residential & basic SME setups",
          "All-weather durable performance"
        ],
        provider: 'starlink',
        category: 'shop-starlink'
      },
      {
        id: 'starlink-mini',
        name: 'Starlink Mini Kit',
        price: 1500.00,
        price_usd: 416.67,
        billing: ' once',
        features: [
          "Ultra-portable high-speed internet design",
          "Low power consumption for field work",
          "Integrated router and kickstand built-in",
          "Fits perfectly in a backpack for travel"
        ],
        provider: 'starlink',
        category: 'shop-starlink'
      },
      {
        id: 'starlink-business',
        name: 'Starlink Business / High-Performance',
        price: 9500.00,
        price_usd: 2638.89,
        billing: ' once',
        features: [
          "High-gain flat panel satellite antenna",
          "Double the transmitter power output",
          "Prioritized network priority allocation",
          "Excellent connectivity in extreme weather"
        ],
        provider: 'starlink',
        category: 'shop-starlink'
      },
      {
        id: 'starlink-monthly',
        name: 'Starlink Monthly Service Plan',
        price: 350.00,
        price_usd: 97.22,
        billing: '/ month',
        features: [
          "High-priority data allocation options",
          "Unlimited standard high-speed data",
          "Flexible, commitment-free monthly plans",
          "Authorized local reseller technical support"
        ],
        provider: 'starlink',
        category: 'shop-starlink'
      }
    ];

    let results = mockProducts;
    if (provider) {
      results = results.filter(p => p.provider === provider);
    }
    if (category) {
      results = results.filter(p => p.category === category);
    }

    return res.json(results.map(p => {
      const price_usd = p.price_usd ? parseFloat(p.price_usd) : null;
      let price = p.price ? parseFloat(p.price) : 0;
      if (price_usd && !isNaN(price_usd)) {
        price = Math.round(price_usd * getRate() * markupMultiplier * 100) / 100;
      } else {
        price = Math.round(price * markupMultiplier * 100) / 100;
      }
      const features = Array.isArray(p.features) ? p.features : (typeof p.features === 'string' ? JSON.parse(p.features) : []);
      return {
        id: p.id,
        name: p.name,
        price,
        price_usd,
        billing: p.billing,
        features
      };
    }));
  }

  try {
    let query = 'SELECT sku, name, price_pgk, price_usd, billing, features FROM products WHERE active = true';
    const values = [];
    let paramCount = 1;

    if (provider) {
      query += ` AND provider = $${paramCount}`;
      values.push(provider);
      paramCount++;
    }

    if (category) {
      query += ` AND category = $${paramCount}`;
      values.push(category);
      paramCount++;
    }

    query += ' ORDER BY id ASC';

    const result = await pool.query(query, values);
    const mapped = result.rows.map(row => {
      const price_usd = row.price_usd ? parseFloat(row.price_usd) : null;
      let price = row.price_pgk ? parseFloat(row.price_pgk) : 0;
      if (price_usd && !isNaN(price_usd)) {
        price = Math.round(price_usd * getRate() * markupMultiplier * 100) / 100;
      } else {
        price = Math.round(price * markupMultiplier * 100) / 100;
      }
      const features = Array.isArray(row.features) ? row.features : (typeof row.features === 'string' ? JSON.parse(row.features) : []);
      return {
        id: row.sku,
        name: row.name,
        price,
        price_usd,
        billing: row.billing,
        features
      };
    });

    res.json(mapped);
  } catch (err) {
    console.error('[API] Error fetching products:', err);
    res.status(500).json({ error: 'An internal server error occurred while retrieving products.' });
  }
});

// Orders API Endpoint
app.post('/api/orders', async (req, res) => {
  const { name, business, email, notes, items, totalItems, totalPrice, exchangeRate } = req.body;

  // Validation
  if (!name || typeof name !== 'string' || name.trim().length < 2) {
    return res.status(400).json({ error: 'Name must be at least 2 characters.' });
  }

  if (!business || typeof business !== 'string' || business.trim().length === 0) {
    return res.status(400).json({ error: 'Business name is required.' });
  }

  if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return res.status(400).json({ error: 'Valid email address is required.' });
  }

  if (!Array.isArray(items) || items.length === 0) {
    return res.status(400).json({ error: 'Cart items are required.' });
  }

  const finalRate = exchangeRate ? parseFloat(exchangeRate) : getRate();
  const computedTotalPgk = totalPrice || items.reduce((acc, cur) => acc + (cur.price * cur.quantity), 0);
  const totalUsdCost = Math.round((computedTotalPgk / (finalRate * markupMultiplier)) * 100) / 100;

  // Handle mock database mode
  if (process.env.DATABASE_URL === 'mock') {
    const mockOrder = {
      id: Math.floor(Math.random() * 10000) + 1,
      customer_name: name.trim(),
      business: business.trim(),
      email: email.trim(),
      total_items: totalItems || items.reduce((acc, cur) => acc + cur.quantity, 0),
      total_price: computedTotalPgk,
      notes: notes ? notes.trim() : null,
      exchange_rate: finalRate,
      total_price_usd: totalUsdCost,
      markup_percent: DEEPS_MARKUP_PERCENT,
      created_at: new Date().toISOString()
    };

    const mockItems = items.map(item => ({
      product_id: item.id,
      product_name: item.name,
      unit_price: item.price,
      quantity: item.quantity
    }));

    console.log('[Mock DB] Creating order in transaction:');
    console.log('[Mock DB] Order payload:', mockOrder);
    console.log('[Mock DB] Order items payload:', mockItems);

    // Send email notification asynchronously in background
    sendOrderEmail(mockOrder, mockItems);

    return res.status(201).json({
      success: true,
      message: 'Order created successfully (mock mode).',
      orderId: mockOrder.id,
      exchange_rate: finalRate
    });
  }

  // Database transaction for live PG database
  let client;
  try {
    client = await pool.connect();
    await client.query('BEGIN');

    // 1. Insert order
    const insertOrderQuery = `
      INSERT INTO orders (customer_name, business, email, total_items, total_price, notes, exchange_rate, total_price_usd, markup_percent)
      VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)
      RETURNING *
    `;
    const orderValues = [
      name.trim(),
      business.trim(),
      email.trim(),
      totalItems || items.reduce((acc, cur) => acc + cur.quantity, 0),
      computedTotalPgk,
      notes ? notes.trim() : null,
      finalRate,
      totalUsdCost,
      DEEPS_MARKUP_PERCENT
    ];

    const orderResult = await client.query(insertOrderQuery, orderValues);
    const order = orderResult.rows[0];

    // 2. Insert order items
    const insertedItems = [];
    for (const item of items) {
      const insertItemQuery = `
        INSERT INTO order_items (order_id, product_id, product_name, unit_price, quantity)
        VALUES ($1, $2, $3, $4, $5)
        RETURNING *
      `;
      const itemValues = [
        order.id,
        item.id,
        item.name,
        item.price,
        item.quantity
      ];
      const itemResult = await client.query(insertItemQuery, itemValues);
      insertedItems.push(itemResult.rows[0]);
    }

    await client.query('COMMIT');
    client.release();

    console.log(`[Database] Transaction committed successfully. Order #${order.id} created.`);

    // 3. Send email notification asynchronously in background
    sendOrderEmail(order, insertedItems);

    return res.status(201).json({
      success: true,
      message: 'Order created successfully.',
      orderId: order.id
    });

  } catch (err) {
    if (client) {
      try {
        await client.query('ROLLBACK');
        client.release();
      } catch (rollbackErr) {
        console.error('[API] Rollback error:', rollbackErr);
      }
    }
    console.error('[API] Error handling order request:', err);
    return res.status(500).json({
      error: 'An internal server error occurred while processing your order.',
    });
  }
});

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

// Explicitly serve robots.txt to prevent any catch-all interference
app.get('/robots.txt', (req, res) => {
  res.type('text/plain');
  res.sendFile(path.join(distPath, 'robots.txt'));
});

// Explicitly serve sitemap.xml to prevent any catch-all interference
app.get('/sitemap.xml', (req, res) => {
  res.type('application/xml');
  res.sendFile(path.join(distPath, 'sitemap.xml'));
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

import express from 'express';
import cors from 'cors';
import pg from 'pg';
import path from 'path';
import { fileURLToPath } from 'url';
import nodemailer from 'nodemailer';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import rateLimit from 'express-rate-limit';

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

const JWT_SECRET = process.env.JWT_SECRET || 'deeps_systems_jwt_secret_key_change_me_in_prod';
const ADMIN_EMAIL = process.env.ADMIN_EMAIL || 'kmaisan@dspng.tech';
const ADMIN_PASSWORD_HASH = process.env.ADMIN_PASSWORD_HASH || bcrypt.hashSync('DeepsAdmin2026!', 10);

let liveRate = USD_TO_PGK_RATE;
let lastFetched = 0;

function getRate() {
  return liveRate;
}

/**
 * Cost-based pricing helper rule:
 * - If cost_price_pgk is set and price_verified === true:
 *   selling = round(cost_price_pgk * (1 + markup_percent/100)) to nearest whole Kina
 * - Else if legacy price_usd present and positive:
 *   selling = round(price_usd * getRate() * markupMultiplier) rounded to 2 decimals
 * - Else (unverified / no cost): return null ("Contact Deeps Systems")
 */
function computeSellingPrice(product) {
  const cost = product.cost_price_pgk !== undefined && product.cost_price_pgk !== null ? parseFloat(product.cost_price_pgk) : null;
  const isVerified = Boolean(product.price_verified);
  const markup = product.markup_percent !== undefined && product.markup_percent !== null ? parseFloat(product.markup_percent) : DEEPS_MARKUP_PERCENT;

  if (cost !== null && !isNaN(cost) && isVerified) {
    const rawSelling = cost * (1 + (markup / 100));
    return Math.round(rawSelling); // nearest whole Kina for PNG retail rounding
  }

  const legacyUsd = product.price_usd !== undefined && product.price_usd !== null ? parseFloat(product.price_usd) : null;
  if (legacyUsd !== null && !isNaN(legacyUsd) && legacyUsd > 0) {
    return Math.round(legacyUsd * getRate() * (1 + (markup / 100)) * 100) / 100;
  }

  return null;
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
      phone VARCHAR(50),
      delivery_address TEXT,
      total_items INT NOT NULL,
      total_price NUMERIC(12, 2) NOT NULL,
      tax_amount NUMERIC(12, 2),
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
    INSERT INTO products (
      sku, provider, category, product_type, name, model, description,
      cost_price_pgk, cost_currency, markup_percent, price_pgk, price_usd,
      gst_status, stock_status, supplier, supplier_url, supplier_country, source_type,
      price_verified, last_verified_at, installation_available, billing, features,
      whats_included, compatibility, tech_specs
    )
    VALUES
      -- Verified Benchmark Starlink Kits (PNG Benchmarks)
      (
        'starlink-mini', 'starlink', 'shop-starlink', 'hardware', 'Starlink Mini Kit', 'Mini Gen 4 / Compact',
        'Ultra-portable, all-in-one high-speed satellite internet terminal with integrated Wi-Fi router.',
        1300.00, 'PGK', 10.00, 1430.00, NULL,
        'GST inclusive', 'in_stock', 'PNG Official Distributor / Verified PNG Reseller', 'https://starlink.com', 'PG', 'png_supplier',
        true, NOW(), false, ' once',
        '["Ultra-portable design fits in a backpack", "Integrated Wi-Fi router & kickstand", "Low power consumption (25-40W)", "Direct 12V-48V DC power input capability"]'::jsonb,
        '["Includes Starlink Mini terminal with kickstand", "Pipe adapter & power supply", "15m DC power cable"]'::jsonb,
        '["Compatible with Starlink Mini mounts & cables"]'::jsonb,
        '{"weight": "1.1 kg", "antenna": "Electronic Phased Array", "field_of_view": "110 deg"}'::jsonb
      ),
      (
        'starlink-standard', 'starlink', 'shop-starlink', 'hardware', 'Starlink Standard Kit (Gen 3 / Standard 4X)', 'Standard Gen 3',
        'High-speed, low-latency satellite internet kit for residential and business installations.',
        1700.00, 'PGK', 10.00, 1870.00, NULL,
        'GST inclusive', 'in_stock', 'PNG Official Distributor / Verified PNG Reseller', 'https://starlink.com', 'PG', 'png_supplier',
        true, NOW(), true, ' once',
        '["High-performance electronic phased array antenna", "Includes Wi-Fi 6 Router with tri-band support", "All-weather durable IP67 rating", "Ideal for primary corporate & residential broadband"]'::jsonb,
        '["Starlink Standard Dish", "Gen 3 Router", "15m Starlink Cable", "AC Power Cable & Power Supply"]'::jsonb,
        '["Compatible with Gen 3 mounts & Gen 3 ethernet adapter"]'::jsonb,
        '{"weight": "2.9 kg", "field_of_view": "110 deg", "operating_temp": "-30C to 50C"}'::jsonb
      ),
      (
        'starlink-enterprise', 'starlink', 'shop-starlink', 'hardware', 'Starlink Enterprise Kit (Enterprise 4X)', 'Flat High Performance / Enterprise',
        'Enterprise-grade satellite terminal with high gain and double transmitter power output for enterprise & maritime.',
        1800.00, 'PGK', 10.00, 1980.00, NULL,
        'GST inclusive', 'in_stock', 'PNG Official Distributor / Verified PNG Reseller', 'https://starlink.com', 'PG', 'png_supplier',
        true, NOW(), true, ' once',
        '["High-gain flat panel antenna for high throughput", "Double the transmitter power output", "Prioritized network connection & SLA", "In-motion and extreme weather rated"]'::jsonb,
        '["Flat High Performance Starlink Antenna", "Power Supply Unit", "Mounting Bracket & Cables"]'::jsonb,
        '["Enterprise router & high-performance mounting hardware"]'::jsonb,
        '{"throughput": "Up to 350+ Mbps", "weather_rating": "IP56 / Extreme weather"}'::jsonb
      ),

      -- Unverified Mounting Hardware (Price: Contact Deeps Systems)
      (
        'starlink-pipe-adapter', 'starlink', 'mounting', 'accessory', 'Starlink Pipe Adapter Mount', 'Gen 3 Pipe Mount',
        'Heavy-duty pipe adapter designed to clamp onto existing poles or masts.',
        NULL, 'PGK', 10.00, 0.00, NULL,
        'GST inclusive', 'in_stock', 'Starlink AU / Overseas Supplier', 'https://starlink.com', 'AU', 'au_supplier',
        false, NULL, false, ' once',
        '["Securely clamps to poles up to 2.5 in diameter", "Weatherproof corrosion-resistant finish", "Easy bolt-lock locking mechanism"]'::jsonb,
        '["Pipe adapter mount bracket", "Stainless steel hardware"]'::jsonb,
        '["Starlink Standard Gen 3 & Enterprise"]'::jsonb,
        '{}'::jsonb
      ),
      (
        'starlink-wall-mount', 'starlink', 'mounting', 'accessory', 'Starlink Long Wall Mount', 'Gen 3 Wall Mount',
        'Extended wall mounting bracket for roof eaves and vertical wall installations.',
        NULL, 'PGK', 10.00, 0.00, NULL,
        'GST inclusive', 'in_stock', 'Starlink AU / Overseas Supplier', 'https://starlink.com', 'AU', 'au_supplier',
        false, NULL, false, ' once',
        '["Designed for exterior wall or overhang mounting", "Provides maximum overhang clearance", "Heavy-gauge steel powder-coated finish"]'::jsonb,
        '["Long wall bracket", "Lag bolts & wall anchors"]'::jsonb,
        '["Starlink Standard Gen 3"]'::jsonb,
        '{}'::jsonb
      ),

      -- Unverified Networking Hardware
      (
        'starlink-ethernet-adapter', 'starlink', 'networking', 'accessory', 'Starlink Gen 3 Ethernet Adapter', 'Gen 3 RJ45 Adapter',
        'Provides a dedicated gigabit Ethernet RJ45 port for connecting third-party routers and switches.',
        NULL, 'PGK', 10.00, 0.00, NULL,
        'GST inclusive', 'in_stock', 'Starlink AU / Overseas Supplier', 'https://starlink.com', 'AU', 'au_supplier',
        false, NULL, false, ' once',
        '["1 Gbps dedicated RJ45 network interface", "Seamless plug-and-play integration", "Bypass mode support for enterprise firewalls"]'::jsonb,
        '["Ethernet adapter dongle"]'::jsonb,
        '["Starlink Gen 3 Router & Mini"]'::jsonb,
        '{}'::jsonb
      ),

      -- Unverified Cables & Power Accessories
      (
        'starlink-cable-30m', 'starlink', 'cables', 'accessory', 'Starlink Replacement Cable (30m / 75ft)', '30m Gen 3 Cable',
        'Extended length replacement cable for long distance Starlink dish installations.',
        NULL, 'PGK', 10.00, 0.00, NULL,
        'GST inclusive', 'in_stock', 'Starlink AU / Overseas Supplier', 'https://starlink.com', 'AU', 'au_supplier',
        false, NULL, false, ' once',
        '["High-grade outdoor direct-burial rating", "30 meters (75 feet) total length", "Shielded against EMI/RFI noise"]'::jsonb,
        '["30m Starlink Cable"]'::jsonb,
        '["Starlink Standard Gen 3"]'::jsonb,
        '{}'::jsonb
      ),
      (
        'starlink-dc-power-supply', 'starlink', 'power', 'accessory', 'Starlink Mini 12V/24V DC Power Cable', 'Mini DC Cable',
        'Custom DC power cable allowing Starlink Mini to run directly from solar batteries or 12V vehicle sockets.',
        NULL, 'PGK', 10.00, 0.00, NULL,
        'GST inclusive', 'in_stock', 'Starlink AU / Overseas Supplier', 'https://starlink.com', 'AU', 'au_supplier',
        false, NULL, false, ' once',
        '["Converts 12V/24V DC battery power directly", "Built-in inline fuse protection", "Heavy duty 5m length"]'::jsonb,
        '["12V/24V DC Power Cable with Barrel Plug"]'::jsonb,
        '["Starlink Mini Kit"]'::jsonb,
        '{}'::jsonb
      ),

      -- Unverified Installation & On-Site Engineering Services
      (
        'starlink-install-sme', 'starlink', 'installation', 'installation', 'On-Site Professional Installation & Testing', 'SME / Enterprise Turnkey',
        'On-site physical mounting, cable routing, dish alignment, firewall integration, and speed testing by Deeps Systems engineers.',
        NULL, 'PGK', 10.00, 0.00, NULL,
        'GST inclusive', 'in_stock', 'Deeps Systems Engineering', 'https://dspng.tech', 'PG', 'png_supplier',
        false, NULL, true, ' project',
        '["Professional roof or mast installation", "Weatherproof cable entry sealing & conduit", "Network router configuration & Wi-Fi coverage mapping", "PNG-wide site deployment support"]'::jsonb,
        '["On-site engineering labor", "Standard mounting hardware & consumables"]'::jsonb,
        '["All Starlink Kits & Local LAN environments"]'::jsonb,
        '{}'::jsonb
      ),

      -- Unverified Recurring Connectivity Plans
      (
        'starlink-plan-priority-50gb', 'starlink', 'recurring', 'recurring', 'Starlink Priority Connectivity Plan (50GB)', 'Priority 50GB Monthly',
        'High-priority satellite data plan for critical enterprise and SME operations with dedicated bandwidth allocation.',
        NULL, 'PGK', 10.00, 0.00, NULL,
        'GST inclusive', 'in_stock', 'Official Starlink / Local Service', 'https://starlink.com', 'PG', 'official_starlink',
        false, NULL, false, '/ month',
        '["50GB Priority Data Allocation per month", "Unlimited Standard Data after priority allocation", "Public routable IPv4 IP option", "24/7 Deeps Systems priority support"]'::jsonb,
        '["Monthly account provisioning & billing management"]'::jsonb,
        '["Starlink Standard & Enterprise Kits"]'::jsonb,
        '{}'::jsonb
      )
    ON CONFLICT (sku) DO NOTHING;
  `;
  try {
    const client = await pool.connect();
    await client.query(createInquiriesTableQuery);
    await client.query(createOrdersTableQuery);
    await client.query(createOrderItemsTableQuery);
    await client.query(createProductsTableQuery);

    // Apply migrations for existing databases to add columns if they don't exist
    await client.query('ALTER TABLE products ADD COLUMN IF NOT EXISTS price_usd NUMERIC(12, 2);');
    await client.query('ALTER TABLE orders ADD COLUMN IF NOT EXISTS exchange_rate NUMERIC(12, 4);');
    await client.query('ALTER TABLE orders ADD COLUMN IF NOT EXISTS total_price_usd NUMERIC(12, 2);');
    await client.query('ALTER TABLE orders ADD COLUMN IF NOT EXISTS markup_percent NUMERIC(5, 2);');
    await client.query('ALTER TABLE orders ADD COLUMN IF NOT EXISTS phone VARCHAR(50);');
    await client.query('ALTER TABLE orders ADD COLUMN IF NOT EXISTS delivery_address TEXT;');
    await client.query('ALTER TABLE orders ADD COLUMN IF NOT EXISTS tax_amount NUMERIC(12, 2);');

    // Extended Starlink catalog & supplier schema columns on products
    await client.query('ALTER TABLE products ADD COLUMN IF NOT EXISTS model VARCHAR(255);');
    await client.query('ALTER TABLE products ADD COLUMN IF NOT EXISTS description TEXT;');
    await client.query('ALTER TABLE products ADD COLUMN IF NOT EXISTS image_url TEXT;');
    await client.query('ALTER TABLE products ADD COLUMN IF NOT EXISTS whats_included JSONB;');
    await client.query('ALTER TABLE products ADD COLUMN IF NOT EXISTS compatibility JSONB;');
    await client.query('ALTER TABLE products ADD COLUMN IF NOT EXISTS tech_specs JSONB;');
    await client.query('ALTER TABLE products ADD COLUMN IF NOT EXISTS warranty TEXT;');
    await client.query('ALTER TABLE products ADD COLUMN IF NOT EXISTS related_accessories JSONB;');
    await client.query('ALTER TABLE products ADD COLUMN IF NOT EXISTS cost_price_pgk NUMERIC(12, 2);');
    await client.query("ALTER TABLE products ADD COLUMN IF NOT EXISTS cost_currency VARCHAR(8) DEFAULT 'PGK';");
    await client.query('ALTER TABLE products ADD COLUMN IF NOT EXISTS markup_percent NUMERIC(5, 2) DEFAULT 10;');
    await client.query('ALTER TABLE products ADD COLUMN IF NOT EXISTS gst_status VARCHAR(50);');
    await client.query("ALTER TABLE products ADD COLUMN IF NOT EXISTS stock_status VARCHAR(50) DEFAULT 'in_stock';");
    await client.query('ALTER TABLE products ADD COLUMN IF NOT EXISTS supplier VARCHAR(255);');
    await client.query('ALTER TABLE products ADD COLUMN IF NOT EXISTS supplier_url TEXT;');
    await client.query('ALTER TABLE products ADD COLUMN IF NOT EXISTS supplier_country VARCHAR(8);');
    await client.query('ALTER TABLE products ADD COLUMN IF NOT EXISTS source_type VARCHAR(50);');
    await client.query('ALTER TABLE products ADD COLUMN IF NOT EXISTS price_verified BOOLEAN DEFAULT false;');
    await client.query('ALTER TABLE products ADD COLUMN IF NOT EXISTS last_verified_at TIMESTAMP WITH TIME ZONE;');
    await client.query('ALTER TABLE products ADD COLUMN IF NOT EXISTS installation_available BOOLEAN DEFAULT false;');
    await client.query("ALTER TABLE products ADD COLUMN IF NOT EXISTS product_type VARCHAR(50) DEFAULT 'hardware';");

    // Articles schema migration
    await client.query('ALTER TABLE articles ADD COLUMN IF NOT EXISTS external_url TEXT;');

    // New tables: suppliers, product_price_history, bundles, bundle_items, admin_users
    await client.query(`
      CREATE TABLE IF NOT EXISTS suppliers (
        id SERIAL PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        url TEXT,
        country VARCHAR(8),
        notes TEXT,
        created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
      );
    `);
    await client.query(`
      CREATE TABLE IF NOT EXISTS product_price_history (
        id SERIAL PRIMARY KEY,
        product_sku VARCHAR(100) NOT NULL,
        cost_price_pgk NUMERIC(12, 2),
        markup_percent NUMERIC(5, 2),
        selling_price_pgk NUMERIC(12, 2),
        source_type VARCHAR(50),
        supplier VARCHAR(255),
        verified_at TIMESTAMP WITH TIME ZONE,
        changed_by VARCHAR(255),
        created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
      );
    `);
    await client.query(`
      CREATE TABLE IF NOT EXISTS bundles (
        id SERIAL PRIMARY KEY,
        sku VARCHAR(100) UNIQUE NOT NULL,
        name VARCHAR(255) NOT NULL,
        description TEXT,
        active BOOLEAN DEFAULT true,
        created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
      );
    `);
    await client.query(`
      CREATE TABLE IF NOT EXISTS bundle_items (
        id SERIAL PRIMARY KEY,
        bundle_id INT REFERENCES bundles(id) ON DELETE CASCADE,
        product_sku VARCHAR(100) NOT NULL,
        quantity INT DEFAULT 1
      );
    `);
    await client.query(`
      CREATE TABLE IF NOT EXISTS admin_users (
        id SERIAL PRIMARY KEY,
        email VARCHAR(255) UNIQUE NOT NULL,
        password_hash TEXT NOT NULL,
        role VARCHAR(50) DEFAULT 'admin',
        created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
      );
    `);
    await client.query(`
      CREATE TABLE IF NOT EXISTS articles (
        id SERIAL PRIMARY KEY,
        slug VARCHAR(255) UNIQUE NOT NULL,
        title VARCHAR(255) NOT NULL,
        excerpt TEXT,
        body TEXT,
        featured_image_url TEXT,
        category VARCHAR(100),
        author_name VARCHAR(255),
        author_title VARCHAR(255),
        author_image_url TEXT,
        tags JSONB,
        date VARCHAR(100),
        reading_time VARCHAR(50),
        seo_title VARCHAR(255),
        meta_description TEXT,
        og_image TEXT,
        related_solutions JSONB,
        related_products JSONB,
        cta_label VARCHAR(255),
        cta_href VARCHAR(255),
        is_featured BOOLEAN DEFAULT false,
        external_url TEXT,
        created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
      );
    `);

    // Seed sample articles if articles table is empty
    const articlesCheck = await client.query('SELECT COUNT(*) FROM articles');
    if (parseInt(articlesCheck.rows[0].count, 10) === 0) {
      console.log('[Database] Seeding sample articles...');
      const seedArticleQuery = `
        INSERT INTO articles (
          slug, title, excerpt, body, featured_image_url, category, author_name, author_title,
          author_image_url, tags, date, reading_time, seo_title, meta_description, og_image,
          related_solutions, related_products, cta_label, cta_href, is_featured, external_url
        ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16, $17, $18, $19, $20, $21)
        ON CONFLICT (slug) DO NOTHING;
      `;
      for (const article of mockArticlesCatalogue) {
        await client.query(seedArticleQuery, [
          article.slug, article.title, article.excerpt, article.body, article.featured_image_url,
          article.category, article.author_name, article.author_title, article.author_image_url,
          JSON.stringify(article.tags || []), article.date, article.reading_time, article.seo_title,
          article.meta_description, article.og_image, JSON.stringify(article.related_solutions || []),
          JSON.stringify(article.related_products || []), article.cta_label, article.cta_href, article.is_featured,
          article.external_url || null
        ]);
      }
    }

    await client.query(seedProductsQuery);
    client.release();
    console.log('[Database] Database tables initialized and migrated successfully.');
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
  'http://localhost:3001',
  'http://127.0.0.1:3000',
  'http://127.0.0.1:5173',
  'https://dspng.space',
  'https://www.dspng.space',
];

app.use(cors({
  origin: (origin, callback) => {
    if (
      !origin ||
      allowedOrigins.includes(origin) ||
      origin.startsWith('http://localhost:') ||
      origin.startsWith('http://127.0.0.1:')
    ) {
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
  requireTLS: process.env.SMTP_REQUIRE_TLS === 'true',
  tls: {
    rejectUnauthorized: process.env.SMTP_TLS_REJECT_UNAUTHORIZED !== 'false',
  },
  logger: process.env.SMTP_DEBUG === 'true',
  debug: process.env.SMTP_DEBUG === 'true',
  auth: {
    user: process.env.SMTP_USER || '',
    pass: process.env.SMTP_PASS || '',
  },
});

// Verify SMTP connection on boot if credentials are configured
if (process.env.SMTP_USER && process.env.SMTP_PASS) {
  transporter.verify((error, success) => {
    if (error) {
      console.error('[Nodemailer] SMTP verification FAILED:', error);
    } else {
      console.log('[Nodemailer] SMTP connection verified successfully.');
    }
  });
}

function escapeHtml(str) {
  if (!str) return '';
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

// Configurable recipient addresses
const MAIL_SALES = process.env.MAIL_SALES || 'sales@dspng.tech';
const MAIL_ADMIN = process.env.MAIL_ADMIN || 'wokman@dspng.tech';

// Direct SMTP email notification via Nodemailer
async function sendInquiryEmail(type, data) {
  let recipient = MAIL_ADMIN;
  let ccRecipient = null;

  if (type === 'shop') {
    recipient = MAIL_SALES;
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
    subjectLine = `New Shop Sales Inquiry: ${data.service}`;
    htmlBody = `
      <div style="font-family: sans-serif; padding: 20px; line-height: 1.6; max-width: 600px; border: 1px solid #e2e8f0; border-radius: 8px;">
        <h2 style="color: #10b981; border-bottom: 2px solid #e2e8f0; padding-bottom: 10px; margin-top: 0;">New Sales Inquiry</h2>
        <p><strong>Full Name:</strong> ${escapeHtml(data.name)}</p>
        <p><strong>Business Name:</strong> ${escapeHtml(data.business)}</p>
        <p><strong>Selected Service:</strong> ${escapeHtml(data.service)}</p>
        <div style="background-color: #f8fafc; padding: 15px; border-left: 4px solid #10b981; margin-top: 20px;">
          <p style="margin: 0; font-weight: bold;">Requirements Message:</p>
          <p style="margin: 10px 0 0 0; white-space: pre-wrap;">${escapeHtml(data.message)}</p>
        </div>
        <p style="font-size: 11px; color: #64748b; margin-top: 30px; border-top: 1px solid #e2e8f0; padding-top: 10px;">
          Sent from Deeps Systems
        </p>
      </div>
    `;
  } else {
    subjectLine = `New Contact Inquiry: ${data.subject}`;
    htmlBody = `
      <div style="font-family: sans-serif; padding: 20px; line-height: 1.6; max-width: 600px; border: 1px solid #e2e8f0; border-radius: 8px;">
        <h2 style="color: #10b981; border-bottom: 2px solid #e2e8f0; padding-bottom: 10px; margin-top: 0;">New Contact Inquiry</h2>
        <p><strong>Full Name:</strong> ${escapeHtml(data.name)}</p>
        <p><strong>Email Address:</strong> ${escapeHtml(data.email)}</p>
        <p><strong>Subject:</strong> ${escapeHtml(data.subject)}</p>
        <div style="background-color: #f8fafc; padding: 15px; border-left: 4px solid #10b981; margin-top: 20px;">
          <p style="margin: 0; font-weight: bold;">Inquiry Message:</p>
          <p style="margin: 10px 0 0 0; white-space: pre-wrap;">${escapeHtml(data.message)}</p>
        </div>
        <p style="font-size: 11px; color: #64748b; margin-top: 30px; border-top: 1px solid #e2e8f0; padding-top: 10px;">
          Sent from Deeps Systems
        </p>
      </div>
    `;
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  const mailOptions = {
    from: process.env.SMTP_USER ? `"Deeps Systems" <${process.env.SMTP_USER}>` : '"Deeps Systems" <no-reply@dspng.tech>',
    to: recipient,
    subject: subjectLine,
    html: htmlBody,
  };
  if (data.email && emailRegex.test(data.email)) {
    mailOptions.replyTo = data.email;
  }
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
            <p>Dear ${escapeHtml(data.name)},</p>
            <p>Thank you for reaching out to Deeps Systems. This is a confirmation that we have received your inquiry regarding <strong>"${escapeHtml(type === 'shop' ? data.service : data.subject)}"</strong>.</p>

            <p>Our team will review your inquiry and follow up with you as soon as possible.</p>

            <div style="background-color: #f8fafc; padding: 15px; border-left: 4px solid #10b981; margin-top: 20px;">
              <p style="margin: 0; font-weight: bold;">Your Message:</p>
              <p style="margin: 10px 0 0 0; white-space: pre-wrap;">${escapeHtml(data.message)}</p>
            </div>

            <p style="font-size: 11px; color: #64748b; margin-top: 30px; border-top: 1px solid #e2e8f0; padding-top: 10px;">
              Deeps Systems
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
    console.error('[Nodemailer] SMTP notification failed:', {
      message: err.message,
      code: err.code,
      response: err.response,
      command: err.command,
      stack: err.stack,
      err
    });
  }

  // Automated customer confirmation email (sent only when SMTP credentials are present)
  if (process.env.SMTP_USER && process.env.SMTP_PASS && data.email && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) {
    try {
      const customerSubjectLine = `Inquiry Confirmed - Deeps Systems`;
      const customerHtmlBody = `
        <div style="font-family: sans-serif; padding: 20px; line-height: 1.6; max-width: 600px; border: 1px solid #e2e8f0; border-radius: 8px;">
          <h2 style="color: #10b981; border-bottom: 2px solid #e2e8f0; padding-bottom: 10px; margin-top: 0;">We have received your inquiry</h2>
          <p>Dear ${escapeHtml(data.name)},</p>
          <p>Thank you for reaching out to Deeps Systems. This is a confirmation that we have received your inquiry regarding <strong>"${escapeHtml(type === 'shop' ? data.service : data.subject)}"</strong>.</p>

          <p>Our team will review your inquiry and follow up with you as soon as possible.</p>

          <div style="background-color: #f8fafc; padding: 15px; border-left: 4px solid #10b981; margin-top: 20px;">
            <p style="margin: 0; font-weight: bold;">Your Message:</p>
            <p style="margin: 10px 0 0 0; white-space: pre-wrap;">${escapeHtml(data.message)}</p>
          </div>

          <p style="font-size: 11px; color: #64748b; margin-top: 30px; border-top: 1px solid #e2e8f0; padding-top: 10px;">
            Deeps Systems
          </p>
        </div>
      `;

      const customerMailOptions = {
        from: `"Deeps Systems" <${process.env.SMTP_USER}>`,
        to: data.email,
        subject: customerSubjectLine,
        html: customerHtmlBody,
      };

      console.log(`[Nodemailer] Dispatching customer inquiry confirmation to: ${data.email}`);
      await transporter.sendMail(customerMailOptions);
      console.log('[Nodemailer] Customer inquiry confirmation dispatched successfully.');
    } catch (custErr) {
      console.error('[Nodemailer] Customer inquiry confirmation failed:', {
        message: custErr.message,
        code: custErr.code,
        response: custErr.response,
        command: custErr.command,
        stack: custErr.stack,
        custErr
      });
    }
  }
}

// Direct SMTP order email notification via Nodemailer
async function sendOrderEmail(order, items) {
  const subjectLine = `New Order #${order.id} from ${order.customer_name}`;

  const subtotal = parseFloat(order.total_price || 0);
  const tax = order.tax_amount !== undefined && order.tax_amount !== null ? parseFloat(order.tax_amount) : Math.round(subtotal * 0.10 * 100) / 100;
  const grandTotal = subtotal + tax;

  const itemsHtml = items.map(item => `
    <tr>
      <td style="padding: 8px; border: 1px solid #e2e8f0;">${escapeHtml(item.product_name)}</td>
      <td style="padding: 8px; border: 1px solid #e2e8f0; text-align: center;">${item.quantity}</td>
      <td style="padding: 8px; border: 1px solid #e2e8f0; text-align: right;">K${parseFloat(item.unit_price || item.price).toFixed(2)}</td>
      <td style="padding: 8px; border: 1px solid #e2e8f0; text-align: right;">K${(parseFloat(item.unit_price || item.price) * item.quantity).toFixed(2)}</td>
    </tr>
  `).join('');

  const htmlBody = `
    <div style="font-family: sans-serif; padding: 20px; line-height: 1.6; max-width: 600px; border: 1px solid #e2e8f0; border-radius: 8px;">
      <h2 style="color: #10b981; border-bottom: 2px solid #e2e8f0; padding-bottom: 10px; margin-top: 0;">New Order #${order.id}</h2>
      <p><strong>Customer Name:</strong> ${escapeHtml(order.customer_name)}</p>
      <p><strong>Business Name:</strong> ${escapeHtml(order.business)}</p>
      <p><strong>Email Address:</strong> ${escapeHtml(order.email)}</p>
      ${order.phone ? `<p><strong>Phone Number:</strong> ${escapeHtml(order.phone)}</p>` : ''}
      ${order.delivery_address ? `<p><strong>Delivery Address:</strong> ${escapeHtml(order.delivery_address)}</p>` : ''}

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
          <tr>
            <td colspan="3" style="padding: 8px; border: 1px solid #e2e8f0; text-align: right;">Subtotal (PGK):</td>
            <td style="padding: 8px; border: 1px solid #e2e8f0; text-align: right;">K${subtotal.toFixed(2)}</td>
          </tr>
          <tr>
            <td colspan="3" style="padding: 8px; border: 1px solid #e2e8f0; text-align: right;">Tax (10% GST):</td>
            <td style="padding: 8px; border: 1px solid #e2e8f0; text-align: right;">K${tax.toFixed(2)}</td>
          </tr>
          <tr style="font-weight: bold; background-color: #f8fafc;">
            <td colspan="3" style="padding: 8px; border: 1px solid #e2e8f0; text-align: right;">Grand Total (Charged PGK):</td>
            <td style="padding: 8px; border: 1px solid #e2e8f0; text-align: right;">K${grandTotal.toFixed(2)}</td>
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
          <p style="margin: 10px 0 0 0; white-space: pre-wrap;">${escapeHtml(order.notes)}</p>
        </div>
      ` : ''}

      <p style="font-size: 11px; color: #64748b; margin-top: 30px; border-top: 1px solid #e2e8f0; padding-top: 10px;">
        Sent from Deeps Systems
      </p>
    </div>
  `;

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  const mailOptions = {
    from: process.env.SMTP_USER ? `"Deeps Systems" <${process.env.SMTP_USER}>` : '"Deeps Systems" <no-reply@dspng.tech>',
    to: MAIL_SALES,
    cc: MAIL_ADMIN,
    subject: subjectLine,
    html: htmlBody,
  };
  if (order.email && emailRegex.test(order.email)) {
    mailOptions.replyTo = order.email;
  }

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
            <p>Dear ${escapeHtml(order.customer_name)},</p>
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
                <tr>
                  <td colspan="3" style="padding: 8px; border: 1px solid #e2e8f0; text-align: right;">Subtotal:</td>
                  <td style="padding: 8px; border: 1px solid #e2e8f0; text-align: right;">K${subtotal.toFixed(2)}</td>
                </tr>
                <tr>
                  <td colspan="3" style="padding: 8px; border: 1px solid #e2e8f0; text-align: right;">Tax (10% GST):</td>
                  <td style="padding: 8px; border: 1px solid #e2e8f0; text-align: right;">K${tax.toFixed(2)}</td>
                </tr>
                <tr style="font-weight: bold; background-color: #f8fafc;">
                  <td colspan="3" style="padding: 8px; border: 1px solid #e2e8f0; text-align: right;">Grand Total:</td>
                  <td style="padding: 8px; border: 1px solid #e2e8f0; text-align: right;">K${grandTotal.toFixed(2)}</td>
                </tr>
              </tfoot>
            </table>

            <p style="margin-top: 20px;">If you have any questions, please feel free to reply to this email.</p>
            <p style="font-size: 11px; color: #64748b; margin-top: 30px; border-top: 1px solid #e2e8f0; padding-top: 10px;">
              Deeps Systems
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
    console.error('[Nodemailer] SMTP order notification failed:', {
      message: err.message,
      code: err.code,
      response: err.response,
      command: err.command,
      stack: err.stack,
      err
    });
  }

  // Automated customer confirmation email (sent only when SMTP credentials are present)
  if (process.env.SMTP_USER && process.env.SMTP_PASS && order.email && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(order.email)) {
    try {
      const customerSubjectLine = `Order Confirmation #${order.id} - Deeps Systems`;
      const customerHtmlBody = `
        <div style="font-family: sans-serif; padding: 20px; line-height: 1.6; max-width: 600px; border: 1px solid #e2e8f0; border-radius: 8px;">
          <h2 style="color: #10b981; border-bottom: 2px solid #e2e8f0; padding-bottom: 10px; margin-top: 0;">Thank you for your order!</h2>
          <p>Dear ${escapeHtml(order.customer_name)},</p>
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
            Deeps Systems
          </p>
        </div>
      `;

      const customerMailOptions = {
        from: `"Deeps Systems" <${process.env.SMTP_USER}>`,
        to: order.email,
        subject: customerSubjectLine,
        html: customerHtmlBody,
      };

      console.log(`[Nodemailer] Dispatching customer order confirmation to: ${order.email}`);
      await transporter.sendMail(customerMailOptions);
      console.log('[Nodemailer] Customer order confirmation dispatched successfully.');
    } catch (custErr) {
      console.error('[Nodemailer] Customer order confirmation failed:', {
        message: custErr.message,
        code: custErr.code,
        response: custErr.response,
        command: custErr.command,
        stack: custErr.stack,
        custErr
      });
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

// Helper function to map database/mock article row to public API object
function mapArticle(a) {
  const tags = Array.isArray(a.tags) ? a.tags : (typeof a.tags === 'string' ? JSON.parse(a.tags || '[]') : []);
  const related_solutions = Array.isArray(a.related_solutions) ? a.related_solutions : (typeof a.related_solutions === 'string' ? JSON.parse(a.related_solutions || '[]') : []);
  const related_products = Array.isArray(a.related_products) ? a.related_products : (typeof a.related_products === 'string' ? JSON.parse(a.related_products || '[]') : []);

  return {
    id: a.id,
    slug: a.slug,
    title: a.title,
    excerpt: a.excerpt || '',
    body: a.body || '',
    featured_image_url: a.featured_image_url || null,
    category: a.category || 'general',
    author_name: a.author_name || 'Deeps Systems',
    author_title: a.author_title || '',
    author_image_url: a.author_image_url || '/assets/logo.jpg',
    tags,
    date: a.date || '',
    reading_time: a.reading_time || '3 min',
    seo_title: a.seo_title || a.title,
    meta_description: a.meta_description || a.excerpt || '',
    og_image: a.og_image || a.featured_image_url || '/assets/logo.jpg',
    related_solutions,
    related_products,
    cta_label: a.cta_label || null,
    cta_href: a.cta_href || null,
    is_featured: Boolean(a.is_featured),
    external_url: a.external_url || null,
    created_at: a.created_at || new Date().toISOString()
  };
}

// Public Read Articles API: List articles (supports category, search, pagination)
app.get('/api/articles', async (req, res) => {
  const { category, search, page = 1, limit = 10 } = req.query;
  const pageNum = parseInt(page, 10) || 1;
  const limitNum = parseInt(limit, 10) || 10;
  const offset = (pageNum - 1) * limitNum;

  if (process.env.DATABASE_URL === 'mock') {
    let filtered = [...mockArticlesCatalogue];

    if (category) {
      const catClean = String(category).toLowerCase();
      filtered = filtered.filter(a => a.category.toLowerCase() === catClean);
    }

    if (search) {
      const q = String(search).toLowerCase().trim();
      filtered = filtered.filter(a => {
        const titleMatch = a.title.toLowerCase().includes(q);
        const excerptMatch = a.excerpt.toLowerCase().includes(q);
        const tags = Array.isArray(a.tags) ? a.tags : [];
        const tagMatch = tags.some(t => String(t).toLowerCase().includes(q));
        return titleMatch || excerptMatch || tagMatch;
      });
    }

    // Sort featured first, then by id desc
    filtered.sort((a, b) => {
      if (a.is_featured && !b.is_featured) return -1;
      if (!a.is_featured && b.is_featured) return 1;
      return b.id - a.id;
    });

    const total = filtered.length;
    const paginated = filtered.slice(offset, offset + limitNum).map(mapArticle);

    return res.json({
      articles: paginated,
      pagination: {
        total,
        page: pageNum,
        limit: limitNum,
        totalPages: Math.ceil(total / limitNum)
      }
    });
  }

  try {
    let whereConditions = [];
    let values = [];
    let paramCount = 1;

    if (category) {
      whereConditions.push(`LOWER(category) = LOWER($${paramCount})`);
      values.push(category);
      paramCount++;
    }

    if (search) {
      whereConditions.push(`(LOWER(title) LIKE $${paramCount} OR LOWER(excerpt) LIKE $${paramCount} OR tags::text ILIKE $${paramCount})`);
      values.push(`%${search.trim().toLowerCase()}%`);
      paramCount++;
    }

    const whereClause = whereConditions.length > 0 ? `WHERE ${whereConditions.join(' AND ')}` : '';

    const countQuery = `SELECT COUNT(*) FROM articles ${whereClause}`;
    const countResult = await pool.query(countQuery, values);
    const total = parseInt(countResult.rows[0].count, 10);

    const query = `
      SELECT * FROM articles
      ${whereClause}
      ORDER BY is_featured DESC, id DESC
      LIMIT $${paramCount} OFFSET $${paramCount + 1}
    `;
    const queryValues = [...values, limitNum, offset];
    const result = await pool.query(query, queryValues);

    const articles = result.rows.map(mapArticle);

    return res.json({
      articles,
      pagination: {
        total,
        page: pageNum,
        limit: limitNum,
        totalPages: Math.ceil(total / limitNum)
      }
    });
  } catch (err) {
    console.error('[Articles API] Error fetching articles from database:', err);
    return res.status(500).json({ error: 'An internal server error occurred while retrieving articles.' });
  }
});

// Public Read Single Article Endpoint: GET /api/articles/:slug
app.get('/api/articles/:slug', async (req, res) => {
  const { slug } = req.params;

  if (process.env.DATABASE_URL === 'mock') {
    const articleRow = mockArticlesCatalogue.find(a => a.slug === slug || String(a.id) === slug);

    if (!articleRow) {
      return res.status(404).json({ error: 'Article not found.' });
    }

    const article = mapArticle(articleRow);
    const related = mockArticlesCatalogue
      .filter(a => a.category === articleRow.category && a.slug !== articleRow.slug)
      .slice(0, 3)
      .map(mapArticle);

    return res.json({ article, related });
  }

  try {
    const query = 'SELECT * FROM articles WHERE slug = $1 OR id::text = $1';
    const result = await pool.query(query, [slug]);

    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Article not found.' });
    }

    const articleRow = result.rows[0];
    const article = mapArticle(articleRow);

    const relatedQuery = 'SELECT * FROM articles WHERE category = $1 AND slug != $2 ORDER BY id DESC LIMIT 3';
    const relatedResult = await pool.query(relatedQuery, [articleRow.category, articleRow.slug]);
    const related = relatedResult.rows.map(mapArticle);

    return res.json({ article, related });
  } catch (err) {
    console.error('[Articles API] Error fetching article by slug:', err);
    return res.status(500).json({ error: 'An internal server error occurred while retrieving the article.' });
  }
});

// Rate limiter for admin login
const adminLoginLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 10, // Limit each IP to 10 requests per windowMs
  message: { error: 'Too many login attempts from this IP, please try again after 15 minutes.' }
});

// Admin Authentication Middleware
function requireAdmin(req, res, next) {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ error: 'Access denied. Authorization token missing or malformed.' });
  }
  const token = authHeader.split(' ')[1];
  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    req.adminUser = decoded;
    next();
  } catch (err) {
    return res.status(401).json({ error: 'Invalid or expired authorization token.' });
  }
}

// In-Memory store fallback for Mock Mode (Products, Suppliers, Price History, Bundles)
let mockProductsCatalogue = [
  {
    sku: 'starlink-mini',
    provider: 'starlink',
    category: 'shop-starlink',
    product_type: 'hardware',
    name: 'Starlink Mini Kit',
    model: 'Mini Gen 4 / Compact',
    description: 'Ultra-portable, all-in-one high-speed satellite internet terminal with integrated Wi-Fi router.',
    cost_price_pgk: 1300.00,
    cost_currency: 'PGK',
    markup_percent: 10.00,
    price_pgk: 1430.00,
    price_usd: null,
    gst_status: 'GST inclusive',
    stock_status: 'in_stock',
    supplier: 'PNG Official Distributor / Verified PNG Reseller',
    supplier_url: 'https://starlink.com',
    supplier_country: 'PG',
    source_type: 'png_supplier',
    price_verified: true,
    last_verified_at: new Date().toISOString(),
    installation_available: false,
    billing: ' once',
    features: [
      "Ultra-portable design fits in a backpack",
      "Integrated Wi-Fi router & kickstand",
      "Low power consumption (25-40W)",
      "Direct 12V-48V DC power input capability"
    ],
    whats_included: ["Includes Starlink Mini terminal with kickstand", "Pipe adapter & power supply", "15m DC power cable"],
    compatibility: ["Compatible with Starlink Mini mounts & cables"],
    tech_specs: { weight: "1.1 kg", antenna: "Electronic Phased Array", field_of_view: "110 deg" },
    warranty: "1 Year Reseller Warranty",
    active: true
  },
  {
    sku: 'starlink-standard',
    provider: 'starlink',
    category: 'shop-starlink',
    product_type: 'hardware',
    name: 'Starlink Standard Kit (Gen 3 / Standard 4X)',
    model: 'Standard Gen 3',
    description: 'High-speed, low-latency satellite internet kit for residential and business installations.',
    cost_price_pgk: 1700.00,
    cost_currency: 'PGK',
    markup_percent: 10.00,
    price_pgk: 1870.00,
    price_usd: null,
    gst_status: 'GST inclusive',
    stock_status: 'in_stock',
    supplier: 'PNG Official Distributor / Verified PNG Reseller',
    supplier_url: 'https://starlink.com',
    supplier_country: 'PG',
    source_type: 'png_supplier',
    price_verified: true,
    last_verified_at: new Date().toISOString(),
    installation_available: true,
    billing: ' once',
    features: [
      "High-performance electronic phased array antenna",
      "Includes Wi-Fi 6 Router with tri-band support",
      "All-weather durable IP67 rating",
      "Ideal for primary corporate & residential broadband"
    ],
    whats_included: ["Starlink Standard Dish", "Gen 3 Router", "15m Starlink Cable", "AC Power Cable & Power Supply"],
    compatibility: ["Compatible with Gen 3 mounts & Gen 3 ethernet adapter"],
    tech_specs: { weight: "2.9 kg", field_of_view: "110 deg", operating_temp: "-30C to 50C" },
    warranty: "1 Year Reseller Warranty",
    active: true
  },
  {
    sku: 'starlink-enterprise',
    provider: 'starlink',
    category: 'shop-starlink',
    product_type: 'hardware',
    name: 'Starlink Enterprise Kit (Enterprise 4X)',
    model: 'Flat High Performance / Enterprise',
    description: 'Enterprise-grade satellite terminal with high gain and double transmitter power output for enterprise & maritime.',
    cost_price_pgk: 1800.00,
    cost_currency: 'PGK',
    markup_percent: 10.00,
    price_pgk: 1980.00,
    price_usd: null,
    gst_status: 'GST inclusive',
    stock_status: 'in_stock',
    supplier: 'PNG Official Distributor / Verified PNG Reseller',
    supplier_url: 'https://starlink.com',
    supplier_country: 'PG',
    source_type: 'png_supplier',
    price_verified: true,
    last_verified_at: new Date().toISOString(),
    installation_available: true,
    billing: ' once',
    features: [
      "High-gain flat panel antenna for high throughput",
      "Double the transmitter power output",
      "Prioritized network connection & SLA",
      "In-motion and extreme weather rated"
    ],
    whats_included: ["Flat High Performance Starlink Antenna", "Power Supply Unit", "Mounting Bracket & Cables"],
    compatibility: ["Enterprise router & high-performance mounting hardware"],
    tech_specs: { throughput: "Up to 350+ Mbps", weather_rating: "IP56 / Extreme weather" },
    warranty: "1 Year Reseller Warranty",
    active: true
  },
  {
    sku: 'starlink-pipe-adapter',
    provider: 'starlink',
    category: 'mounting',
    product_type: 'accessory',
    name: 'Starlink Pipe Adapter Mount',
    model: 'Gen 3 Pipe Mount',
    description: 'Heavy-duty pipe adapter designed to clamp onto existing poles or masts.',
    cost_price_pgk: null,
    cost_currency: 'PGK',
    markup_percent: 10.00,
    price_pgk: 0.00,
    price_usd: null,
    gst_status: 'GST inclusive',
    stock_status: 'in_stock',
    supplier: 'Starlink AU / Overseas Supplier',
    supplier_url: 'https://starlink.com',
    supplier_country: 'AU',
    source_type: 'au_supplier',
    price_verified: false,
    last_verified_at: null,
    installation_available: false,
    billing: ' once',
    features: [
      "Securely clamps to poles up to 2.5 in diameter",
      "Weatherproof corrosion-resistant finish",
      "Easy bolt-lock locking mechanism"
    ],
    whats_included: ["Pipe adapter mount bracket", "Stainless steel hardware"],
    compatibility: ["Starlink Standard Gen 3 & Enterprise"],
    tech_specs: {},
    warranty: "Standard Reseller Warranty",
    active: true
  },
  {
    sku: 'starlink-ethernet-adapter',
    provider: 'starlink',
    category: 'networking',
    product_type: 'accessory',
    name: 'Starlink Gen 3 Ethernet Adapter',
    model: 'Gen 3 RJ45 Adapter',
    description: 'Provides a dedicated gigabit Ethernet RJ45 port for connecting third-party routers and switches.',
    cost_price_pgk: null,
    cost_currency: 'PGK',
    markup_percent: 10.00,
    price_pgk: 0.00,
    price_usd: null,
    gst_status: 'GST inclusive',
    stock_status: 'in_stock',
    supplier: 'Starlink AU / Overseas Supplier',
    supplier_url: 'https://starlink.com',
    supplier_country: 'AU',
    source_type: 'au_supplier',
    price_verified: false,
    last_verified_at: null,
    installation_available: false,
    billing: ' once',
    features: [
      "1 Gbps dedicated RJ45 network interface",
      "Seamless plug-and-play integration",
      "Bypass mode support for enterprise firewalls"
    ],
    whats_included: ["Ethernet adapter dongle"],
    compatibility: ["Starlink Gen 3 Router & Mini"],
    tech_specs: {},
    warranty: "Standard Reseller Warranty",
    active: true
  },
  {
    sku: 'starlink-cable-30m',
    provider: 'starlink',
    category: 'cables',
    product_type: 'accessory',
    name: 'Starlink Replacement Cable (30m / 75ft)',
    model: '30m Gen 3 Cable',
    description: 'Extended length replacement cable for long distance Starlink dish installations.',
    cost_price_pgk: null,
    cost_currency: 'PGK',
    markup_percent: 10.00,
    price_pgk: 0.00,
    price_usd: null,
    gst_status: 'GST inclusive',
    stock_status: 'in_stock',
    supplier: 'Starlink AU / Overseas Supplier',
    supplier_url: 'https://starlink.com',
    supplier_country: 'AU',
    source_type: 'au_supplier',
    price_verified: false,
    last_verified_at: null,
    installation_available: false,
    billing: ' once',
    features: [
      "High-grade outdoor direct-burial rating",
      "30 meters (75 feet) total length",
      "Shielded against EMI/RFI noise"
    ],
    whats_included: ["30m Starlink Cable"],
    compatibility: ["Starlink Standard Gen 3"],
    tech_specs: {},
    warranty: "Standard Reseller Warranty",
    active: true
  },
  {
    sku: 'starlink-dc-power-supply',
    provider: 'starlink',
    category: 'power',
    product_type: 'accessory',
    name: 'Starlink Mini 12V/24V DC Power Cable',
    model: 'Mini DC Cable',
    description: 'Custom DC power cable allowing Starlink Mini to run directly from solar batteries or 12V vehicle sockets.',
    cost_price_pgk: null,
    cost_currency: 'PGK',
    markup_percent: 10.00,
    price_pgk: 0.00,
    price_usd: null,
    gst_status: 'GST inclusive',
    stock_status: 'in_stock',
    supplier: 'Starlink AU / Overseas Supplier',
    supplier_url: 'https://starlink.com',
    supplier_country: 'AU',
    source_type: 'au_supplier',
    price_verified: false,
    last_verified_at: null,
    installation_available: false,
    billing: ' once',
    features: [
      "Converts 12V/24V DC battery power directly",
      "Built-in inline fuse protection",
      "Heavy duty 5m length"
    ],
    whats_included: ["12V/24V DC Power Cable with Barrel Plug"],
    compatibility: ["Starlink Mini Kit"],
    tech_specs: {},
    warranty: "Standard Reseller Warranty",
    active: true
  },
  {
    sku: 'starlink-install-sme',
    provider: 'starlink',
    category: 'installation',
    product_type: 'installation',
    name: 'On-Site Professional Installation & Testing',
    model: 'SME / Enterprise Turnkey',
    description: 'On-site physical mounting, cable routing, dish alignment, firewall integration, and speed testing by Deeps Systems engineers.',
    cost_price_pgk: null,
    cost_currency: 'PGK',
    markup_percent: 10.00,
    price_pgk: 0.00,
    price_usd: null,
    gst_status: 'GST inclusive',
    stock_status: 'in_stock',
    supplier: 'Deeps Systems Engineering',
    supplier_url: 'https://dspng.tech',
    supplier_country: 'PG',
    source_type: 'png_supplier',
    price_verified: false,
    last_verified_at: null,
    installation_available: true,
    billing: ' project',
    features: [
      "Professional roof or mast installation",
      "Weatherproof cable entry sealing & conduit",
      "Network router configuration & Wi-Fi coverage mapping",
      "PNG-wide site deployment support"
    ],
    whats_included: ["On-site engineering labor", "Standard mounting hardware & consumables"],
    compatibility: ["All Starlink Kits & Local LAN environments"],
    tech_specs: {},
    warranty: "90 Day Workmanship Guarantee",
    active: true
  },
  {
    sku: 'starlink-plan-priority-50gb',
    provider: 'starlink',
    category: 'recurring',
    product_type: 'recurring',
    name: 'Starlink Priority Connectivity Plan (50GB)',
    model: 'Priority 50GB Monthly',
    description: 'High-priority satellite data plan for critical enterprise and SME operations with dedicated bandwidth allocation.',
    cost_price_pgk: null,
    cost_currency: 'PGK',
    markup_percent: 10.00,
    price_pgk: 0.00,
    price_usd: null,
    gst_status: 'GST inclusive',
    stock_status: 'in_stock',
    supplier: 'Official Starlink / Local Service',
    supplier_url: 'https://starlink.com',
    supplier_country: 'PG',
    source_type: 'official_starlink',
    price_verified: false,
    last_verified_at: null,
    installation_available: false,
    billing: '/ month',
    features: [
      "50GB Priority Data Allocation per month",
      "Unlimited Standard Data after priority allocation",
      "Public routable IPv4 IP option",
      "24/7 Deeps Systems priority support"
    ],
    whats_included: ["Monthly account provisioning & billing management"],
    compatibility: ["Starlink Standard & Enterprise Kits"],
    tech_specs: {},
    warranty: "Service Level Agreement",
    active: true
  }
];

let mockSuppliers = [
  { id: 1, name: 'PNG Official Distributor / Verified PNG Reseller', url: 'https://starlink.com', country: 'PG', notes: 'PNG benchmark supplier', created_at: new Date().toISOString() },
  { id: 2, name: 'Starlink AU / Overseas Supplier', url: 'https://starlink.com', country: 'AU', notes: 'Australia benchmark supplier', created_at: new Date().toISOString() }
];

let mockPriceHistory = [];
let mockBundles = [];

let mockArticlesCatalogue = [
  {
    id: 1,
    slug: 'bitc-transition-hardware-liability-png',
    title: 'The BITC Transition: Why Hardware is Becoming a Liability in PNG',
    excerpt: 'Exploring how cloud-native architectures are outperforming traditional on-premise server rooms in tropical climates.',
    body: `<p class="mb-4">In tropical Pacific environments like Papua New Guinea, traditional on-premise hardware infrastructure faces unprecedented physical and operational challenges. High ambient temperatures, excessive humidity, power grid instability, and salt-air exposure in coastal regions severely reduce server lifespan while incurring massive maintenance overhead.</p><h3 class="text-2xl font-bold mt-8 mb-4 text-gray-900 dark:text-white">The Born-in-the-Cloud (BITC) Advantage</h3><p class="mb-4">Transitioning to Born-in-the-Cloud (BITC) architecture enables enterprise organizations in PNG to eliminate single points of physical failure, optimize capital expenditure, and achieve up to 99.99% operational uptime.</p><p class="mb-4">By migrating core workloads to serverless environments and distributed cloud platforms, organizations shift away from costly hardware refresh cycles and gain immediate high availability across regional offices in Port Moresby, Lae, Mount Hagen, and Kokopo.</p><h3 class="text-2xl font-bold mt-8 mb-4 text-gray-900 dark:text-white">Operational Efficiency & Cost Containment</h3><p class="mb-4">Rather than allocating significant budget to localized UPS backups, specialized cooling systems, and emergency hardware replacements, BITC organizations leverage hyper-scalable infrastructure designed for resilience. Deeps Systems provides end-to-end guidance to audit, modernize, and migrate existing systems to resilient cloud environments.</p>`,
    featured_image_url: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=1200',
    category: 'digital-transformation',
    author_name: 'Kmaisan W.',
    author_title: 'Chief Systems Architect',
    author_image_url: '/assets/logo.jpg',
    tags: ['Cloud Architecture', 'BITC', 'Infrastructure', 'PNG Tech'],
    date: 'May 12, 2024',
    reading_time: '6 min',
    seo_title: 'The BITC Transition: Why Hardware is Becoming a Liability in PNG',
    meta_description: 'Discover how Born-in-the-Cloud (BITC) architecture outperforms traditional on-premise server rooms in Papua New Guinea.',
    og_image: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=1200',
    related_solutions: [
      { label: 'Cloud Infrastructure & Optimization', href: '/solutions#cloud' },
      { label: 'Enterprise Systems Audit', href: '/solutions#audit' }
    ],
    related_products: [
      { label: 'Starlink Enterprise Kit', href: '/shop#shop-starlink' }
    ],
    cta_label: 'Schedule a BITC Cloud Readiness Audit',
    cta_href: '/contact',
    is_featured: true,
    external_url: 'https://www.linkedin.com/company/deeps-systems',
    created_at: new Date('2024-05-12').toISOString()
  },
  {
    id: 2,
    slug: 'quantum-inspired-algorithms-highland-agribusiness',
    title: 'Quantum-Inspired Algorithms in Highland Agribusiness',
    excerpt: 'How complex logistics modeling is saving coffee exporters thousands in seasonal waste through optimized routing.',
    body: `<p class="mb-4">Logistics in Papua New Guinea’s Highland regions present unique topological and infrastructural complexities. Freight delays from farm-gate collection points to shipping ports in Lae or Port Moresby often result in significant cargo deterioration and revenue loss for agricultural exporters.</p><h3 class="text-2xl font-bold mt-8 mb-4 text-gray-900 dark:text-white">Algorithmic Route & Fleet Optimization</h3><p class="mb-4">Deeps Systems implemented quantum-inspired optimization algorithms designed to model real-time road conditions, seasonal weather patterns, vehicle load limits, and fuel efficiency. By dynamically recalculating routing schedules for coffee bean transport fleets, we reduced transit delays by over 34%.</p><p class="mb-4">This data-driven approach allows exporters to maximize load capacity, minimize spoilage, streamline supply chains, and secure international sustainability compliance certifications.</p>`,
    featured_image_url: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?q=80&w=1200',
    category: 'case-studies',
    author_name: 'Kmaisan W.',
    author_title: 'Chief Systems Architect',
    author_image_url: '/assets/logo.jpg',
    tags: ['Supply Chain', 'Optimization', 'Highlands', 'Agribusiness'],
    date: 'May 08, 2024',
    reading_time: '4 min',
    seo_title: 'Quantum-Inspired Agribusiness Logistics in PNG | Deeps Systems',
    meta_description: 'How algorithmic routing models optimize Highland coffee exporter supply chains in Papua New Guinea.',
    og_image: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?q=80&w=1200',
    related_solutions: [
      { label: 'Custom Optimization Logic', href: '/solutions#optimization' }
    ],
    related_products: [
      { label: 'Starlink Mini Kit', href: '/shop#shop-starlink' }
    ],
    cta_label: 'Explore Agribusiness Supply Chain Solutions',
    cta_href: '/solutions',
    is_featured: false,
    external_url: 'https://www.linkedin.com/company/deeps-systems',
    created_at: new Date('2024-05-08').toISOString()
  },
  {
    id: 3,
    slug: 'starlink-satellite-connectivity-remote-png',
    title: 'Starlink Satellite Connectivity: Transforming Remote PNG Operations',
    excerpt: 'How low-earth orbit satellite technology is bridging the digital divide for mines, plantations, and rural SME hubs.',
    body: `<p class="mb-4">High-speed, low-latency connectivity is essential for modern business operations. In remote areas across Papua New Guinea where terrestrial fiber optic cables or cellular towers are unavailable, Starlink low-earth orbit satellite technology provides transformative broadband access.</p><h3 class="text-2xl font-bold mt-8 mb-4 text-gray-900 dark:text-white">Enterprise Resiliency in Remote Hubs</h3><p class="mb-4">Deeps Systems deploys turnkey Starlink solutions coupled with custom dual-WAN failover routing, enabling continuous cloud access, remote VoIP communication, real-time telemetry, and automated data backups regardless of geographical location.</p><p class="mb-4">From agricultural plantations in New Britain to remote mining exploration sites, reliable satellite connectivity closes the operational gap and unlocks cloud productivity tools across remote workforces.</p>`,
    featured_image_url: 'https://images.unsplash.com/photo-1516849841032-87cbac4d88f7?q=80&w=1200',
    category: 'png-pacific',
    author_name: 'Deeps Systems Technical Team',
    author_title: 'Connectivity Engineering',
    author_image_url: '/assets/logo.jpg',
    tags: ['Starlink', 'Satellite Internet', 'PNG Infrastructure', 'Enterprise Connectivity'],
    date: 'April 25, 2024',
    reading_time: '5 min',
    seo_title: 'Starlink Satellite Connectivity for Remote PNG | Deeps Systems',
    meta_description: 'Deploying low-earth orbit Starlink satellite connectivity across remote enterprise locations in Papua New Guinea.',
    og_image: 'https://images.unsplash.com/photo-1516849841032-87cbac4d88f7?q=80&w=1200',
    related_solutions: [
      { label: 'Network Integration & Security', href: '/solutions#network' }
    ],
    related_products: [
      { label: 'Starlink Standard Kit', href: '/shop#shop-starlink' },
      { label: 'Starlink Enterprise Kit', href: '/shop#shop-starlink' }
    ],
    cta_label: 'Order Starlink Kits & Installation',
    cta_href: '/shop',
    is_featured: false,
    external_url: 'https://www.linkedin.com/company/deeps-systems',
    created_at: new Date('2024-04-25').toISOString()
  },
  {
    id: 4,
    slug: 'cybersecurity-best-practices-pacific-enterprises',
    title: 'Cybersecurity Best Practices for Growing Pacific Enterprises',
    excerpt: 'Protecting corporate assets against ransomware, phishing, and data breaches with Zero-Trust architecture.',
    body: `<p class="mb-4">As Pacific organizations accelerate their digital transformation, exposure to cyber threats grows exponentially. Ransomware attacks, phishing campaigns, and credential theft pose substantial operational and financial risks to SMEs, government departments, and financial institutions alike.</p><h3 class="text-2xl font-bold mt-8 mb-4 text-gray-900 dark:text-white">Implementing Zero-Trust Security Frameworks</h3><p class="mb-4">Adopting Zero-Trust security principles ensures that every user, device, and network request is authenticated, authorized, and continuously validated before being granted access to internal applications and confidential data repositories.</p><p class="mb-4">Implementing Multi-Factor Authentication (MFA), role-based access control, automated threat monitoring, and encrypted backups significantly strengthens organizational resilience across distributed enterprise teams.</p>`,
    featured_image_url: 'https://images.unsplash.com/photo-1563986768609-322da13575f3?q=80&w=1200',
    category: 'cybersecurity',
    author_name: 'Kmaisan W.',
    author_title: 'Chief Systems Architect',
    author_image_url: '/assets/logo.jpg',
    tags: ['Cybersecurity', 'Zero Trust', 'Data Protection', 'Pacific SMEs'],
    date: 'April 18, 2024',
    reading_time: '5 min',
    seo_title: 'Cybersecurity Best Practices for Pacific Enterprises | Deeps Systems',
    meta_description: 'Essential Zero-Trust cybersecurity strategies to protect Pacific organizations against modern cyber threats.',
    og_image: 'https://images.unsplash.com/photo-1563986768609-322da13575f3?q=80&w=1200',
    related_solutions: [
      { label: 'Cybersecurity & Identity Management', href: '/solutions#security' }
    ],
    related_products: [
      { label: 'Microsoft 365 Business Licensing', href: '/shop#shop-microsoft' }
    ],
    cta_label: 'Schedule a Cybersecurity Audit',
    cta_href: '/contact',
    is_featured: false,
    external_url: 'https://www.linkedin.com/company/deeps-systems',
    created_at: new Date('2024-04-18').toISOString()
  },
  {
    id: 5,
    slug: 'deeps-systems-partners-with-nebula-cloud',
    title: 'Deeps Systems Partners with Regional Cloud Leaders for Expansion',
    excerpt: 'Scaling PNG-grown optimization logic to the broader Pacific through hyper-scalable serverless infrastructure.',
    body: `<p class="mb-4">Deeps Systems is proud to announce strategic technology partnerships expanding our regional reach across the South Pacific. By combining localized Papua New Guinean engineering experience with global cloud infrastructure standards, we deliver tailored digital solutions for complex regional markets.</p><h3 class="text-2xl font-bold mt-8 mb-4 text-gray-900 dark:text-white">Building Pacific Tech Capabilities</h3><p class="mb-4">Our mission remains focused: empower local PNG businesses, financial institutions, and enterprise organizations with state-of-the-art software engineering, automation tools, high-speed satellite connectivity, and cloud optimization.</p>`,
    featured_image_url: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?q=80&w=1200',
    category: 'deeps-systems',
    author_name: 'Deeps Systems Newsroom',
    author_title: 'Corporate Communications',
    author_image_url: '/assets/logo.jpg',
    tags: ['Partnerships', 'Expansion', 'Deeps Systems', 'Pacific Tech'],
    date: 'May 01, 2024',
    reading_time: '3 min',
    seo_title: 'Deeps Systems Regional Expansion & Cloud Partnerships',
    meta_description: 'Deeps Systems scales PNG-grown optimization logic across the South Pacific through regional partnerships.',
    og_image: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?q=80&w=1200',
    related_solutions: [
      { label: 'Enterprise Digital Transformation', href: '/solutions' }
    ],
    related_products: [
      { label: 'Explore Deeps Systems Online Store', href: '/shop' }
    ],
    cta_label: 'Partner With Deeps Systems',
    cta_href: '/contact',
    is_featured: false,
    external_url: 'https://www.linkedin.com/company/deeps-systems',
    created_at: new Date('2024-05-01').toISOString()
  }
];

// Public Products API Endpoint
app.get('/api/products', async (req, res) => {
  const { provider, category, product_type } = req.query;

  let rawProducts = [];

  if (process.env.DATABASE_URL === 'mock') {
    rawProducts = mockProductsCatalogue;
  } else {
    try {
      let query = `
        SELECT
          sku, provider, category, product_type, name, model, description,
          cost_price_pgk, cost_currency, markup_percent, price_pgk, price_usd,
          gst_status, stock_status, supplier, supplier_url, supplier_country, source_type,
          price_verified, last_verified_at, installation_available, billing, features,
          whats_included, compatibility, tech_specs, warranty
        FROM products
        WHERE active = true
      `;
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
      if (product_type) {
        query += ` AND product_type = $${paramCount}`;
        values.push(product_type);
        paramCount++;
      }

      query += ' ORDER BY id ASC';
      const result = await pool.query(query, values);
      rawProducts = result.rows;
    } catch (err) {
      console.error('[API] Error fetching products from DB:', err);
      return res.status(500).json({ error: 'An internal server error occurred while retrieving products.' });
    }
  }

  // Filter in mock mode if query params present
  if (process.env.DATABASE_URL === 'mock') {
    if (provider) rawProducts = rawProducts.filter(p => p.provider === provider);
    if (category) rawProducts = rawProducts.filter(p => p.category === category);
    if (product_type) rawProducts = rawProducts.filter(p => p.product_type === product_type);
  }

  // Map to PUBLIC schema (EXCLUDE cost_price_pgk, markup_percent, and markup amounts)
  const mapped = rawProducts.map(p => {
    const features = Array.isArray(p.features) ? p.features : (typeof p.features === 'string' ? JSON.parse(p.features || '[]') : []);
    const whats_included = Array.isArray(p.whats_included) ? p.whats_included : (typeof p.whats_included === 'string' ? JSON.parse(p.whats_included || '[]') : []);
    const compatibility = Array.isArray(p.compatibility) ? p.compatibility : (typeof p.compatibility === 'string' ? JSON.parse(p.compatibility || '[]') : []);
    const tech_specs = typeof p.tech_specs === 'object' && p.tech_specs !== null ? p.tech_specs : (typeof p.tech_specs === 'string' ? JSON.parse(p.tech_specs || '{}') : {});

    const computedSelling = computeSellingPrice(p);

    return {
      id: p.sku || p.id,
      sku: p.sku,
      name: p.name,
      model: p.model || null,
      category: p.category,
      product_type: p.product_type || 'hardware',
      description: p.description || null,
      image_url: p.image_url || null,
      whats_included,
      compatibility,
      tech_specs,
      price: computedSelling, // Computed selling price (or null if unverified/no cost)
      gst_status: p.gst_status || 'GST inclusive',
      stock_status: p.stock_status || 'in_stock',
      currency: 'PGK',
      supplier: p.supplier || null,
      source_type: p.source_type || 'unverified',
      source_url: p.supplier_url || null,
      last_verified_at: p.last_verified_at || null,
      price_verified: Boolean(p.price_verified),
      warranty: p.warranty || null,
      installation_available: Boolean(p.installation_available),
      billing: p.billing || '',
      features
    };
  });

  res.json(mapped);
});

// Admin Login Endpoint
app.post('/api/admin/login', adminLoginLimiter, async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({ error: 'Email and password are required.' });
  }

  let user = null;

  if (process.env.DATABASE_URL === 'mock') {
    if (email.toLowerCase() === ADMIN_EMAIL.toLowerCase() && bcrypt.compareSync(password, ADMIN_PASSWORD_HASH)) {
      user = { id: 1, email: ADMIN_EMAIL, role: 'admin' };
    }
  } else {
    try {
      const result = await pool.query('SELECT * FROM admin_users WHERE email = $1', [email.trim().toLowerCase()]);
      if (result.rows.length > 0) {
        const dbUser = result.rows[0];
        if (bcrypt.compareSync(password, dbUser.password_hash)) {
          user = { id: dbUser.id, email: dbUser.email, role: dbUser.role || 'admin' };
        }
      } else if (email.toLowerCase() === ADMIN_EMAIL.toLowerCase() && bcrypt.compareSync(password, ADMIN_PASSWORD_HASH)) {
        user = { id: 1, email: ADMIN_EMAIL, role: 'admin' };
      }
    } catch (err) {
      console.error('[Admin API] Error querying admin_users:', err);
      return res.status(500).json({ error: 'Internal server error during authentication.' });
    }
  }

  if (!user) {
    return res.status(401).json({ error: 'Invalid admin email or password.' });
  }

  const token = jwt.sign({ id: user.id, email: user.email, role: user.role }, JWT_SECRET, { expiresIn: '24h' });
  return res.json({ success: true, token, user: { email: user.email, role: user.role } });
});

// Admin Pricing Dashboard Aggregates & Ledger
app.get('/api/admin/pricing-dashboard', requireAdmin, async (req, res) => {
  let products = [];

  if (process.env.DATABASE_URL === 'mock') {
    products = mockProductsCatalogue;
  } else {
    try {
      const result = await pool.query('SELECT * FROM products ORDER BY id ASC');
      products = result.rows;
    } catch (err) {
      console.error('[Admin API] Error fetching pricing dashboard products:', err);
      return res.status(500).json({ error: 'Failed to fetch pricing dashboard data.' });
    }
  }

  const totalProducts = products.length;
  const verifiedCount = products.filter(p => Boolean(p.price_verified)).length;
  const needingVerificationCount = totalProducts - verifiedCount;
  const verifiedDates = products.map(p => p.last_verified_at).filter(Boolean);
  const lastUpdate = verifiedDates.length > 0 ? new Date(Math.max(...verifiedDates.map(d => new Date(d).getTime()))).toISOString() : null;

  const productLedger = products.map(p => {
    const cost = p.cost_price_pgk !== null && p.cost_price_pgk !== undefined ? parseFloat(p.cost_price_pgk) : null;
    const markupPercent = p.markup_percent !== null && p.markup_percent !== undefined ? parseFloat(p.markup_percent) : DEEPS_MARKUP_PERCENT;
    const sellingPrice = computeSellingPrice(p);
    const markupAmount = (cost !== null && sellingPrice !== null) ? Math.round(sellingPrice - cost) : null;

    return {
      sku: p.sku,
      name: p.name,
      category: p.category,
      product_type: p.product_type,
      cost_price_pgk: cost,
      cost_currency: p.cost_currency || 'PGK',
      markup_percent: markupPercent,
      selling_price_pgk: sellingPrice,
      markup_amount_pgk: markupAmount,
      stock_status: p.stock_status || 'in_stock',
      source_type: p.source_type || 'unverified',
      supplier: p.supplier || null,
      price_verified: Boolean(p.price_verified),
      last_verified_at: p.last_verified_at || null
    };
  });

  res.json({
    summary: {
      total_products: totalProducts,
      verified_count: verifiedCount,
      needing_verification_count: needingVerificationCount,
      last_update: lastUpdate
    },
    products: productLedger
  });
});

// Admin Products CRUD Endpoints
app.get('/api/admin/products', requireAdmin, async (req, res) => {
  if (process.env.DATABASE_URL === 'mock') {
    return res.json(mockProductsCatalogue);
  }
  try {
    const result = await pool.query('SELECT * FROM products ORDER BY id ASC');
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch admin products.' });
  }
});

app.post('/api/admin/products', requireAdmin, async (req, res) => {
  const p = req.body;
  if (!p.sku || !p.name || !p.category) {
    return res.status(400).json({ error: 'sku, name, and category are required.' });
  }

  const cost_price_pgk = p.cost_price_pgk !== undefined && p.cost_price_pgk !== null ? parseFloat(p.cost_price_pgk) : null;
  const markup_percent = p.markup_percent !== undefined && p.markup_percent !== null ? parseFloat(p.markup_percent) : DEEPS_MARKUP_PERCENT;
  const price_verified = Boolean(p.price_verified);
  const selling_price_pgk = computeSellingPrice({ cost_price_pgk, price_verified, markup_percent, price_usd: p.price_usd });

  if (process.env.DATABASE_URL === 'mock') {
    const newProduct = { ...p, cost_price_pgk, markup_percent, price_verified, price_pgk: selling_price_pgk || 0 };
    mockProductsCatalogue.push(newProduct);
    if (cost_price_pgk !== null) {
      mockPriceHistory.push({
        id: mockPriceHistory.length + 1,
        product_sku: p.sku,
        cost_price_pgk,
        markup_percent,
        selling_price_pgk,
        source_type: p.source_type || 'unverified',
        supplier: p.supplier || null,
        verified_at: price_verified ? new Date().toISOString() : null,
        changed_by: req.adminUser.email,
        created_at: new Date().toISOString()
      });
    }
    return res.status(201).json({ success: true, product: newProduct });
  }

  try {
    const query = `
      INSERT INTO products (
        sku, provider, category, product_type, name, model, description,
        cost_price_pgk, cost_currency, markup_percent, price_pgk, price_usd,
        gst_status, stock_status, supplier, supplier_url, supplier_country, source_type,
        price_verified, last_verified_at, installation_available, billing, features,
        whats_included, compatibility, tech_specs, warranty
      ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16, $17, $18, $19, $20, $21, $22, $23, $24, $25, $26, $27)
      RETURNING *
    `;
    const values = [
      p.sku, p.provider || 'starlink', p.category, p.product_type || 'hardware', p.name, p.model || null, p.description || null,
      cost_price_pgk, p.cost_currency || 'PGK', markup_percent, selling_price_pgk || 0, p.price_usd || null,
      p.gst_status || 'GST inclusive', p.stock_status || 'in_stock', p.supplier || null, p.supplier_url || null, p.supplier_country || null, p.source_type || 'unverified',
      price_verified, price_verified ? new Date() : null, Boolean(p.installation_available), p.billing || '',
      JSON.stringify(p.features || []), JSON.stringify(p.whats_included || []), JSON.stringify(p.compatibility || []), JSON.stringify(p.tech_specs || {}), p.warranty || null
    ];
    const result = await pool.query(query, values);

    // Record price history
    if (cost_price_pgk !== null) {
      await pool.query(`
        INSERT INTO product_price_history (product_sku, cost_price_pgk, markup_percent, selling_price_pgk, source_type, supplier, verified_at, changed_by)
        VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
      `, [p.sku, cost_price_pgk, markup_percent, selling_price_pgk, p.source_type || 'unverified', p.supplier || null, price_verified ? new Date() : null, req.adminUser.email]);
    }

    res.status(201).json({ success: true, product: result.rows[0] });
  } catch (err) {
    console.error('[Admin API] Error creating product:', err);
    res.status(500).json({ error: 'Failed to create product.' });
  }
});

app.put('/api/admin/products/:sku', requireAdmin, async (req, res) => {
  const { sku } = req.params;
  const updates = req.body;

  if (process.env.DATABASE_URL === 'mock') {
    const idx = mockProductsCatalogue.findIndex(p => p.sku === sku);
    if (idx === -1) return res.status(404).json({ error: 'Product not found.' });

    const existing = mockProductsCatalogue[idx];
    const cost_price_pgk = updates.cost_price_pgk !== undefined ? (updates.cost_price_pgk !== null ? parseFloat(updates.cost_price_pgk) : null) : existing.cost_price_pgk;
    const markup_percent = updates.markup_percent !== undefined ? (updates.markup_percent !== null ? parseFloat(updates.markup_percent) : DEEPS_MARKUP_PERCENT) : existing.markup_percent;
    const price_verified = updates.price_verified !== undefined ? Boolean(updates.price_verified) : existing.price_verified;
    const selling_price_pgk = computeSellingPrice({ cost_price_pgk, price_verified, markup_percent, price_usd: updates.price_usd !== undefined ? updates.price_usd : existing.price_usd });

    mockProductsCatalogue[idx] = {
      ...existing,
      ...updates,
      cost_price_pgk,
      markup_percent,
      price_verified,
      price_pgk: selling_price_pgk || 0,
      last_verified_at: price_verified ? new Date().toISOString() : existing.last_verified_at
    };

    if (cost_price_pgk !== null && (cost_price_pgk !== existing.cost_price_pgk || markup_percent !== existing.markup_percent)) {
      mockPriceHistory.push({
        id: mockPriceHistory.length + 1,
        product_sku: sku,
        cost_price_pgk,
        markup_percent,
        selling_price_pgk,
        source_type: updates.source_type || existing.source_type,
        supplier: updates.supplier || existing.supplier,
        verified_at: price_verified ? new Date().toISOString() : null,
        changed_by: req.adminUser.email,
        created_at: new Date().toISOString()
      });
    }
    return res.json({ success: true, product: mockProductsCatalogue[idx] });
  }

  try {
    const existingRes = await pool.query('SELECT * FROM products WHERE sku = $1', [sku]);
    if (existingRes.rows.length === 0) return res.status(404).json({ error: 'Product not found.' });
    const existing = existingRes.rows[0];

    const cost_price_pgk = updates.cost_price_pgk !== undefined ? (updates.cost_price_pgk !== null ? parseFloat(updates.cost_price_pgk) : null) : (existing.cost_price_pgk !== null ? parseFloat(existing.cost_price_pgk) : null);
    const markup_percent = updates.markup_percent !== undefined ? (updates.markup_percent !== null ? parseFloat(updates.markup_percent) : DEEPS_MARKUP_PERCENT) : (existing.markup_percent !== null ? parseFloat(existing.markup_percent) : DEEPS_MARKUP_PERCENT);
    const price_verified = updates.price_verified !== undefined ? Boolean(updates.price_verified) : Boolean(existing.price_verified);
    const selling_price_pgk = computeSellingPrice({ cost_price_pgk, price_verified, markup_percent, price_usd: updates.price_usd !== undefined ? updates.price_usd : existing.price_usd });

    const lastVerified = price_verified ? new Date() : existing.last_verified_at;
    const query = `
      UPDATE products SET
        name = COALESCE($1, name),
        model = COALESCE($2, model),
        description = COALESCE($3, description),
        cost_price_pgk = $4,
        markup_percent = $5,
        price_pgk = $6,
        gst_status = COALESCE($7, gst_status),
        stock_status = COALESCE($8, stock_status),
        supplier = COALESCE($9, supplier),
        source_type = COALESCE($10, source_type),
        price_verified = $11,
        last_verified_at = $12
      WHERE sku = $13
      RETURNING *
    `;
    const values = [
      updates.name || null, updates.model || null, updates.description || null,
      cost_price_pgk, markup_percent, selling_price_pgk || 0,
      updates.gst_status || null, updates.stock_status || null, updates.supplier || null, updates.source_type || null,
      price_verified, lastVerified, sku
    ];
    const result = await pool.query(query, values);

    // Record price history on pricing updates
    if (cost_price_pgk !== null) {
      await pool.query(`
        INSERT INTO product_price_history (product_sku, cost_price_pgk, markup_percent, selling_price_pgk, source_type, supplier, verified_at, changed_by)
        VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
      `, [sku, cost_price_pgk, markup_percent, selling_price_pgk, updates.source_type || existing.source_type, updates.supplier || existing.supplier, lastVerified, req.adminUser.email]);
    }

    res.json({ success: true, product: result.rows[0] });
  } catch (err) {
    console.error('[Admin API] Error updating product:', err);
    res.status(500).json({ error: 'Failed to update product.' });
  }
});

// Admin Suppliers CRUD Endpoints
app.get('/api/admin/suppliers', requireAdmin, async (req, res) => {
  if (process.env.DATABASE_URL === 'mock') {
    return res.json(mockSuppliers);
  }
  try {
    const result = await pool.query('SELECT * FROM suppliers ORDER BY id ASC');
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch suppliers.' });
  }
});

app.post('/api/admin/suppliers', requireAdmin, async (req, res) => {
  const { name, url, country, notes } = req.body;
  if (!name) return res.status(400).json({ error: 'Supplier name is required.' });

  if (process.env.DATABASE_URL === 'mock') {
    const newSup = { id: mockSuppliers.length + 1, name, url, country, notes, created_at: new Date().toISOString() };
    mockSuppliers.push(newSup);
    return res.status(201).json({ success: true, supplier: newSup });
  }

  try {
    const result = await pool.query(
      'INSERT INTO suppliers (name, url, country, notes) VALUES ($1, $2, $3, $4) RETURNING *',
      [name, url || null, country || null, notes || null]
    );
    res.status(201).json({ success: true, supplier: result.rows[0] });
  } catch (err) {
    res.status(500).json({ error: 'Failed to create supplier.' });
  }
});

// Admin Bundles CRUD Endpoints
app.get('/api/admin/bundles', requireAdmin, async (req, res) => {
  if (process.env.DATABASE_URL === 'mock') {
    return res.json(mockBundles);
  }
  try {
    const result = await pool.query('SELECT * FROM bundles ORDER BY id ASC');
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch bundles.' });
  }
});

app.post('/api/admin/bundles', requireAdmin, async (req, res) => {
  const { sku, name, description, items } = req.body;
  if (!sku || !name) return res.status(400).json({ error: 'Bundle sku and name are required.' });

  if (process.env.DATABASE_URL === 'mock') {
    const newBundle = { id: mockBundles.length + 1, sku, name, description, items: items || [], active: true, created_at: new Date().toISOString() };
    mockBundles.push(newBundle);
    return res.status(201).json({ success: true, bundle: newBundle });
  }

  try {
    const result = await pool.query(
      'INSERT INTO bundles (sku, name, description) VALUES ($1, $2, $3) RETURNING *',
      [sku, name, description || null]
    );
    const bundle = result.rows[0];
    if (Array.isArray(items) && items.length > 0) {
      for (const item of items) {
        await pool.query('INSERT INTO bundle_items (bundle_id, product_sku, quantity) VALUES ($1, $2, $3)', [bundle.id, item.product_sku, item.quantity || 1]);
      }
    }
    res.status(201).json({ success: true, bundle });
  } catch (err) {
    res.status(500).json({ error: 'Failed to create bundle.' });
  }
});

// Orders API Endpoint
app.post('/api/orders', async (req, res) => {
  const { name, business, email, phone, address, notes, items, totalItems, exchangeRate } = req.body;

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

  if (!phone || typeof phone !== 'string' || phone.trim().length === 0) {
    return res.status(400).json({ error: 'Phone number is required.' });
  }

  if (!address || typeof address !== 'string' || address.trim().length === 0) {
    return res.status(400).json({ error: 'Delivery address is required.' });
  }

  if (!Array.isArray(items) || items.length === 0) {
    return res.status(400).json({ error: 'Cart items are required.' });
  }

  const finalRate = exchangeRate ? parseFloat(exchangeRate) : getRate();

  // Handle mock database mode
  if (process.env.DATABASE_URL === 'mock') {
    let computedTotalPgk = 0;
    const validatedItems = [];

    for (const item of items) {
      const itemSku = String(item.id || item.sku || '');
      const product = mockProductsCatalogue.find(p => p.sku === itemSku && p.active !== false);

      if (!product) {
        return res.status(400).json({ error: `Product "${item.name || itemSku}" is not available.` });
      }

      const trustedPrice = computeSellingPrice(product);
      if (trustedPrice === null || isNaN(trustedPrice)) {
        return res.status(400).json({ error: `Product "${product.name}" requires custom pricing. Please request a quote.` });
      }

      const qty = parseInt(item.quantity, 10) || 1;
      computedTotalPgk += trustedPrice * qty;

      validatedItems.push({
        product_id: product.sku,
        product_name: product.name,
        unit_price: trustedPrice,
        quantity: qty
      });
    }

    const taxAmount = Math.round(computedTotalPgk * 0.10 * 100) / 100;
    const totalUsdCost = Math.round((computedTotalPgk / (finalRate * markupMultiplier)) * 100) / 100;

    const mockOrder = {
      id: Math.floor(Math.random() * 10000) + 1,
      customer_name: name.trim(),
      business: business.trim(),
      email: email.trim(),
      phone: phone.trim(),
      delivery_address: address.trim(),
      total_items: totalItems || validatedItems.reduce((acc, cur) => acc + cur.quantity, 0),
      total_price: computedTotalPgk,
      tax_amount: taxAmount,
      notes: notes ? notes.trim() : null,
      exchange_rate: finalRate,
      total_price_usd: totalUsdCost,
      markup_percent: DEEPS_MARKUP_PERCENT,
      created_at: new Date().toISOString()
    };

    console.log('[Mock DB] Creating order in transaction:');
    console.log('[Mock DB] Order payload:', mockOrder);
    console.log('[Mock DB] Order items payload:', validatedItems);

    // Send email notification asynchronously in background
    sendOrderEmail(mockOrder, validatedItems);

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

    let computedTotalPgk = 0;
    const validatedItems = [];

    for (const item of items) {
      const itemSku = String(item.id || item.sku || '');
      const prodRes = await client.query('SELECT * FROM products WHERE sku = $1 AND active = true', [itemSku]);

      if (prodRes.rows.length === 0) {
        await client.query('ROLLBACK');
        client.release();
        return res.status(400).json({ error: `Product "${item.name || itemSku}" is not available.` });
      }

      const product = prodRes.rows[0];
      const trustedPrice = computeSellingPrice(product);

      if (trustedPrice === null || isNaN(trustedPrice)) {
        await client.query('ROLLBACK');
        client.release();
        return res.status(400).json({ error: `Product "${product.name}" requires custom pricing. Please request a quote.` });
      }

      const qty = parseInt(item.quantity, 10) || 1;
      computedTotalPgk += trustedPrice * qty;

      validatedItems.push({
        product_id: product.sku,
        product_name: product.name,
        unit_price: trustedPrice,
        quantity: qty
      });
    }

    const taxAmount = Math.round(computedTotalPgk * 0.10 * 100) / 100;
    const totalUsdCost = Math.round((computedTotalPgk / (finalRate * markupMultiplier)) * 100) / 100;

    // 1. Insert order
    const insertOrderQuery = `
      INSERT INTO orders (customer_name, business, email, phone, delivery_address, total_items, total_price, tax_amount, notes, exchange_rate, total_price_usd, markup_percent)
      VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12)
      RETURNING *
    `;
    const orderValues = [
      name.trim(),
      business.trim(),
      email.trim(),
      phone.trim(),
      address.trim(),
      totalItems || validatedItems.reduce((acc, cur) => acc + cur.quantity, 0),
      computedTotalPgk,
      taxAmount,
      notes ? notes.trim() : null,
      finalRate,
      totalUsdCost,
      DEEPS_MARKUP_PERCENT
    ];

    const orderResult = await client.query(insertOrderQuery, orderValues);
    const order = orderResult.rows[0];

    // 2. Insert order items
    const insertedItems = [];
    for (const vItem of validatedItems) {
      const insertItemQuery = `
        INSERT INTO order_items (order_id, product_id, product_name, unit_price, quantity)
        VALUES ($1, $2, $3, $4, $5)
        RETURNING *
      `;
      const itemValues = [
        order.id,
        vItem.product_id,
        vItem.product_name,
        vItem.unit_price,
        vItem.quantity
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

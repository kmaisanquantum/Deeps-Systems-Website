# Runbook: Monolithic Single-Container Architecture for Deeps Systems

This document describes the architecture, configuration, operation, and troubleshooting of the unified monolithic Deeps Systems application.

---

## 1. Architectural Overview
Deeps Systems is deployed as a consolidated monolithic single-container application running inside **Coolify**.

* **Frontend Process**: Serves statically compiled React SPA files directly from the `/dist` directory via Express `express.static`.
* **Backend API Process**: Exposes REST endpoints (`/api/inquiries`), public status check routes, and a diagnostic health check endpoint (`/health`) on the same origin.
* **SPA Routing Catch-all**: Routes any request not matching static files or APIs back to `index.html` to fully support client-side deep links (e.g., direct refreshes on `/shop` or `/contact`).
* **Database Platform**: Private PostgreSQL database inside Coolify.

---

## 2. Configuration & Environment Variables

All configuration is managed securely via environment variables. No secrets are exposed to the client-side bundle.

| Environment Variable | Description | Default Fallback |
| :--- | :--- | :--- |
| `PORT` | Listening port for the monolithic server container. | `3000` |
| `DATABASE_URL` | PostgreSQL connection string or `'mock'` for simulated offline mode. | Uses standard PG credentials or local. |
| `FORMSPREE_URL` | Destination endpoint for best-effort email notification. | `https://formspree.io/f/mqakppov` |
| `MAIL_SALES` | Destination recipient for orders / purchases. | `sales@dspng.tech` |
| `MAIL_SERVICE` | Destination recipient for shop service / Starlink inquiries. | `service@dspng.tech` |
| `MAIL_ADMIN` | Catch-all admin recipient that is CC'd on everything. | `wokman@dspng.tech` |
| `USD_TO_PGK_RATE` | Fallback / seed USD to PGK exchange rate when FX provider is offline. | `3.6` |
| `FX_PROVIDER_URL` | Live FX API endpoint URL for real-time USD->PGK exchange rates. | `https://open.er-api.com/v6/latest/USD` |
| `FX_REFRESH_MINUTES` | Interval in minutes to refresh live FX rate cache. | `360` (6 hours) |
| `DEEPS_MARKUP_PERCENT` | Confidential internal margin percentage baked silently into Kina prices. | `10` (10%) |

---

## 3. CORS Architecture Update

To facilitate seamless panel integrations, the monolithic server allows cross-origin requests.

Permitted CORS origins:
* `https://dspng.tech` (Primary)
* `https://www.dspng.tech` (Primary)
* `https://dspng.space` (AIO Cloud Office Platform)
* `https://www.dspng.space` (AIO Cloud Office Platform)
* `http://localhost:3000` (Local Development)
* `http://localhost:5173` (Local Development)

---

## 4. How to Run Locally

### A. Development Mode (Port 3000 & 3001)
To run frontend and backend processes separately with hot-reloading:

1. **Install Dependencies**:
   ```bash
   npm install
   ```
2. **Start Backend Server** (Port 3001, Mock DB mode):
   ```bash
   DATABASE_URL=mock PORT=3001 npm start
   ```
3. **Start Frontend Dev Server** (Port 3000, Vite hot reload):
   ```bash
   npm run dev
   ```

### B. Production-Monolithic Preview (Port 3000)
To verify the single-container execution locally:

1. **Build the Frontend**:
   ```bash
   npm run build
   ```
2. **Start the Monolith**:
   ```bash
   DATABASE_URL=mock PORT=3000 npm start
   ```
3. Open `http://localhost:3000` in your browser. All pages, routers, and forms are fully functional end-to-end.

---

## 5. Diagnostic & Health Monitoring

The monolith provides two distinct diagnostic endpoints:

### A. Internal Diagnostics (`/health`)
* **Route**: `GET /health`
* **Purpose**: Active, deep database-aware testing.
* **Mechanism**: Runs a live query `SELECT NOW()` on the PostgreSQL database.
* **Output**:
  ```json
  {
    "status": "healthy",
    "database": "mocked",
    "timestamp": "2026-07-18T01:35:00.000Z"
  }
  ```
* **Failure Response**: Returns `500 Internal Server Error` in case of database pool connection issues. Use this strictly for internal diagnostic scripting.

### B. External Public Monitoring (`/status` or `/api/status`)
* **Route**: `GET /status`, `GET /api/status`, `HEAD /status`, `HEAD /api/status`
* **Purpose**: Database-independent external liveness check for uptime monitors (such as the dspng.space AIO Connected Sites Monitor).
* **Mechanism**: Checks purely if the Express HTTP server process is running, bypassing database checks (ensuring it returns 200 even during database hiccup intervals).
* **CORS Behavior**: Explicitly sets `Access-Control-Allow-Origin: *` to bypass the default cors strict whitelist and facilitate public checks.
* **Output**:
  ```json
  {
    "status": "online",
    "service": "deeps-systems-website",
    "timestamp": "2026-07-18T01:42:00.000Z"
  }
  ```
* **Monitoring Guidance**: External monitoring platforms should target `https://www.dspng.tech/status` (or `https://www.dspng.tech/api/status`) to establish clean liveness checking.

---

## 6. Inquiries and Orders API & Notifications Specification

All submissions from the Contact form, Shop Service Inquiry form, and Checkout Cart write directly to the database as the source of truth, then trigger background, best-effort direct emails via Nodemailer with intent-based routing and customer-facing confirmations.

### A. Intent-Based Routing Rules:
- **Orders/Purchases (`POST /api/orders`)**: Routed directly to `MAIL_SALES`, with `cc: MAIL_ADMIN` included automatically.
- **Service Inquiries (`POST /api/inquiries` where `type === 'shop'`)**: Routed directly to `MAIL_SERVICE`, with `cc: MAIL_ADMIN` included automatically.
- **Contact Inquiries (`POST /api/inquiries` where `type === 'contact'`)**: Routed by default to `MAIL_ADMIN`. However, if purchase intent is detected (keywords like `buy`, `purchase`, `order`, `price`, `quote`, `cost`, `sales` in subject/message), the message is routed to `MAIL_SALES`.

### B. Automated Customer Confirmations:
- When a valid customer email is provided, an automatic customer-facing confirmation email is sent using the configured sender.
- **Orders**: A detailed order confirmation echoing the assigned Order ID, item list, and grand total in PGK is generated and sent to the customer.
- **Inquiries**: An inquiry confirmation acknowledging receipt of the inquiry and detailing the submitter's message is generated and sent to the customer.

### C. USD→PGK Exchange Rate Architecture & Confidential Margin:
To enforce accounting consistency, Deeps Systems operates on a single backend-controlled USD→PGK exchange rate backed by a live FX provider (`FX_PROVIDER_URL`) with fallback to `USD_TO_PGK_RATE`.
- **Live Rate Caching**: The server queries `open.er-api.com` on startup and refreshes every 6 hours (`FX_REFRESH_MINUTES`). On network or provider errors, it silently maintains the cached/fallback rate without crashing.
- **Confidential Server-Side Markup**: A confidential profit margin (`DEEPS_MARKUP_PERCENT`, defaulting to 10%) is applied strictly inside backend pricing calculations (`price = round(price_usd * liveRate * markupMultiplier)`). The markup is NEVER exposed to customers, returned in public API payloads, or rendered on the public frontend.
- **Currency Paradigm**: Kina (PGK) remains the only primary, charged currency presented to customers on the public frontend. USD is utilized exclusively as the underlying supplier cost base.
- **Public Rate Route**: The `/api/exchange-rate` endpoint exposes the honest base exchange rate (without markup) in the format:
  ```json
  {
    "base": "USD",
    "quote": "PGK",
    "rate": 3.6
  }
  ```
- **Order Auditability & Ledger**: When creating a new order via `POST /api/orders`, the system records the active `exchange_rate`, true supplier USD cost base `total_price_usd`, and `markup_percent` inside the `orders` database table. Internal sales notifications (`MAIL_SALES`) receive full ledger breakdown including USD cost base and markup percentage, while customer confirmation emails show Kina totals only.

### Data Validation Schema:
* `type`: `'contact'` or `'shop'` (Required)
* `name`: string, min length 2 characters (Required)
* `message`: string, min length 10 characters (Required)
* **Conditional Contact Fields**:
  - `email`: Valid RFC 5322 email string (Required for `'contact'`)
  - `subject`: string, min length 4 characters (Required for `'contact'`)
* **Conditional Shop Fields**:
  - `business`: string, non-empty (Required for `'shop'`)
  - `service`: string, non-empty (Required for `'shop'`)

---

## 7. Troubleshooting "Failed to submit inquiry"

If a user reports a submission error:
1. **Check the Client UI**: The UI will extract and print the exact, specific diagnostic error message returned from the backend instead of showing a generic text.
2. **Run Health Check**: Query `/health` to verify if the Postgres database is accessible from the container.
3. **Check Container Logs**:
   - `[Database] inquiries table initialized successfully.` indicates correct database tables setup.
   - `[Nodemailer] SMTP notification failed: ...` indicates SMTP failures, but remember that **SMTP failures will NOT fail the user submission** as long as Postgres persists successfully!

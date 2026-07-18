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

## 6. Inquiries API Specification (`POST /api/inquiries`)

All submissions from the Contact form and Shop Service Inquiry form write directly to the database `inquiries` table as the source of truth, then trigger a background, best-effort direct email via Nodemailer.

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

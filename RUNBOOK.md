# Runbook: Monolithic Single-Container Architecture for Deeps Systems

This document describes the architecture, configuration, operation, and troubleshooting of the unified monolithic Deeps Systems application.

---

## 1. Architectural Overview
Deeps Systems is deployed as a consolidated monolithic single-container application running inside **Coolify**.

* **Frontend Process**: Serves statically compiled React SPA files directly from the `/dist` directory via Express `express.static`.
* **Backend API Process**: Exposes REST endpoints (`/api/inquiries`) and a diagnostic health check endpoint (`/health`) on the same origin.
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

## 3. How to Run Locally

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

## 4. Diagnostic & Health Monitoring

The monolith includes an active `/health` check endpoint:
* **Query Route**: `GET http://localhost:3000/health`
* **Healthy Output**:
  ```json
  {
    "status": "healthy",
    "database": "mocked",
    "timestamp": "2026-07-18T01:35:00.000Z"
  }
  ```
* **Error Response**: In case of a database connectivity failure, it returns a `500 Internal Server Error` with `{"status":"unhealthy","database":"error"}`.

---

## 5. Inquiries API Specification (`POST /api/inquiries`)

All submissions from the Contact form and Shop Service Inquiry form write directly to the database `inquiries` table as the source of truth, then trigger a background, best-effort forward to Formspree for email notification.

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

## 6. Troubleshooting "Failed to submit inquiry"

If a user reports a submission error:
1. **Check the Client UI**: The UI will extract and print the exact, specific diagnostic error message returned from the backend instead of showing a generic text.
2. **Run Health Check**: Query `/health` to verify if the Postgres database is accessible from the container.
3. **Check Container Logs**:
   - `[Database] inquiries table initialized successfully.` indicates correct database tables setup.
   - `[Formspree] Failed forwarding with status: ...` indicates Formspree failures, but remember that **Formspree failures will NOT fail the user submission** as long as Postgres persists successfully!

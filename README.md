<div align="center">
<img width="1200" height="475" alt="GHBanner" src="https://github.com/user-attachments/assets/0aa67016-6eaf-458a-adb2-6e31a0763ed6" />
</div>

# Deeps Systems Website & Monolithic API

This contains everything you need to run, configure, and troubleshoot the unified Deeps Systems monolithic application.

View your app in AI Studio: https://ai.studio/apps/drive/1132mN6IMYsoKhS_C5SYqGvW2RiBwfyGd

---

## 1. Architectural Overview

Deeps Systems runs as a unified fullstack monolithic application in a single container.

* **Vite + React SPA**: Statically built into `/dist` and served securely by the Node.js Express server.
* **Express REST APIs**: Under `/api` (for inquiries, health, and status checks).
* **SMTP Nodemailer Support**: Directly triggers direct HTML email notifications to `wokman@dspng.tech`.
* **SPA Catch-All Route**: Rewrites any deep-linked routes back to `index.html` to avoid 404s.

---

## 2. Uptime Diagnostics & Monitoring Guidelines

The application exposes two diagnostic endpoints for system maintenance:

### A. Public Availability Route (`/status` or `/api/status`)
* **Uptime target**: `https://www.dspng.tech/status`
* **Purpose**: Database-independent check for external ping tools and monitors (e.g., AIO Connected Sites Monitor at `dspng.space`).
* **Attributes**: Returns standard HTTP 200 with `{ "status": "online" }` even if the DB is down or connection pools are exhausted. Bypasses normal CORS whitelists with an explicit `Access-Control-Allow-Origin: *` wildcard. Accepts GET, HEAD, and OPTIONS.

### B. Internal Health Route (`/health`)
* **Purpose**: DB-aware internal diagnostic checking.
* **Attributes**: Runs `SELECT NOW()` on PostgreSQL. Returns `500` if the database is unreachable.

---

## 3. CORS Integration

The backend is configured to accept cross-origin requests from the following whitelisted origins:
* `https://dspng.tech` (Primary)
* `https://www.dspng.tech` (Primary)
* `https://dspng.space` (AIO Cloud Panel)
* `https://www.dspng.space` (AIO Cloud Panel)

---

## 4. Run Locally

### Prerequisites: Node.js (>= 20.0.0)

1. **Install dependencies**:
   ```bash
   npm install
   ```
2. **Start Backend (Monolith)** (Port 3000, Mock DB):
   ```bash
   DATABASE_URL=mock PORT=3000 npm start
   ```
3. **Open browser**: Go to `http://localhost:3000` to browse, test deep-links, and submit mock-saved inquiries.

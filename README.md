<div align="center">
<img width="1200" height="475" alt="GHBanner" src="https://github.com/user-attachments/assets/0aa67016-6eaf-458a-adb2-6e31a0763ed6" />
</div>

# Run and deploy your AI Studio app

This contains everything you need to run your app locally.

View your app in AI Studio: https://ai.studio/apps/drive/1132mN6IMYsoKhS_C5SYqGvW2RiBwfyGd

## Run Locally

**Prerequisites:**  Node.js


1. Install dependencies:
   `npm install`
2. Set the `GEMINI_API_KEY` in [.env.local](.env.local) to your Gemini API key
3. Run the app:
   `npm run dev`

## Deployment & SPA Routing Fallback

### Coolify & Node-based Environments

For Node-based hosting platforms like **Coolify** (or any environment that deploys via Nixpacks, Dockerfile, or runs `npm run start`), the application is configured to run on top of a single-page application (SPA) capable static file server using `sirv-cli`.

When the deployment finishes, the production `npm run start` script serves the application from the `dist/` directory, automatically rewriting non-file requests back to `index.html` via the `--single` option. This ensures that deep-linking (e.g., direct navigation or refreshing on `/shop` or `/contact`) works seamlessly without causing 404 errors.

### Static Host Config (Nginx / Apache / serve)

If you are hosting this application using static web server environments:
- **serve / Vercel**: A `serve.json` file is provided in the project root containing the rewrite rule to route all paths back to `/index.html`.
- **Nginx**: Add the following directive to your virtual host config to handle SPA fallback routing:
  ```nginx
  location / {
      try_files $uri $uri/ /index.html;
  }
  ```
- **Caddy**: Add the following directive to your Caddyfile:
  ```caddy
  try_files {path} /index.html
  ```
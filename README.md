# DevDeck

A personal developer dashboard and knowledge base built with React, Vite, and Tailwind CSS.

## Features
- **Zero-config Documentation**: Drop a folder in `src/docs`, and it automatically appears in the gallery, search, and command palette.
- **Support for React & HTML**: Write docs as React components or self-contained HTML files (perfect for AI-generated output).
- **Dashboard Widgets**: Live clock, GitHub stats, LeetCode stats, and a personalized greeting.
- **Fast & Searchable**: Instant client-side search and a Cmd/Ctrl+K command palette.
- **Dark-first Design**: Beautiful, responsive UI powered by Tailwind CSS variables.

## Quick Start

1. **Clone and Install**
   ```bash
   git clone <url>
   cd devdeck
   npm install
   ```

2. **Configure Environment**
   Copy `.env.example` to `.env` and fill in optional variables (like a GitHub token for higher rate limits).

3. **Configure Profile**
   Edit `src/config/profile.ts` to set your name, usernames, timezone, and avatar.

4. **Run Development Server**
   ```bash
   npm run dev &
   ```

## Adding a New Doc in 60 Seconds

You don't need to manually wire up routes. Use the scaffolding script:

```bash
# Create a React component doc
npm run new:doc -- "My API Design" --kind=react --category="Architecture"

# Create a self-contained HTML doc
npm run new:doc -- "Daily Log" --kind=html --category="Notes"
```

This creates a folder in `src/docs` with a `meta.ts` and your starting file. Edit it, save, and it instantly appears on the dashboard!

## Changing the Avatar
Replace `public/avatar.png` with your own image, or update `avatarUrl` in `src/config/profile.ts`.

## LeetCode Provider
LeetCode's official API blocks browser CORS. By default, DevDeck uses a community provider interface. If it stops working, you can switch to a serverless function proxy:
1. Update `VITE_LEETCODE_PROVIDER=serverless` in `.env`.
2. Deploy the stub in `api/leetcode.ts` to Vercel/Netlify and set `VITE_LEETCODE_SERVERLESS_URL` to its endpoint.

## Deployment
DevDeck is a Single Page Application (SPA).
- **Vercel**: Works out of the box (uses `vercel.json`).
- **Netlify**: Works out of the box (uses `public/_redirects`).
- **GitHub Pages**: You will need to handle 404 redirects to `index.html` using a custom script or a `404.html` workaround.

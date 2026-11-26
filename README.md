# Charles Chukwurah Portfolio

A clean React and Tailwind CSS portfolio by Charles Chukwurah, a Software Engineering Student at Pan-Atlantic University.

## Tech Stack

- React
- JavaScript
- Python
- Tailwind CSS
- Vite
- lucide-react

## Local Development

```bash
npm install
npm run dev
```

## Production Build

```bash
npm run build
```

## Deployment

The site is hosted on [Railway](https://railway.com). The Railway service is connected to this GitHub repository, so every push to `main` builds and deploys automatically.

How it works:

- `railway.json` tells Railway to build with Railpack and run `npm run build`.
- Railpack detects the Vite app and serves the `dist/` folder as a static site with Caddy, falling back to `index.html` for client-side routes.
- The public URL is the service's `https://...up.railway.app` domain, shown in the Railway dashboard under the service's **Settings → Networking**.

To deploy manually from your machine instead (requires the [Railway CLI](https://docs.railway.com/cli)):

```bash
railway up
```

The local dev server can also be opened by devices on the same Wi-Fi network using the Network URL printed by:

```bash
npm run dev
```

# InvestHack — October 2026

Plain React (no TypeScript) build of the InvestHack monthly calendar page.
Built with Vite, one component (`src/App.jsx`), one plain CSS file
(`src/App.css`) — no CSS modules, no Tailwind, no styled-components. Easy
to copy `App.jsx` + `App.css` into any other React project.

## Run locally

```bash
npm install
npm run dev
```

Opens at http://localhost:5173

## Build for production

```bash
npm run build   # outputs to /dist
npm run preview # serve the production build locally to check it
```

## Deploy to Railway

1. Push this folder to a GitHub repo (or use `railway up` from the CLI
   directly inside this folder).
2. In Railway, create a new project from that repo.
3. Railway auto-detects Node via Nixpacks and will run, in order:
   - `npm install`
   - `npm run build` (because a `build` script exists in package.json)
   - `npm run start` (serves the built `/dist` folder with the `serve`
     package, bound to Railway's `$PORT`)

A `railway.json` is included with these same commands spelled out
explicitly, in case you want to see or override them in the Railway
dashboard (Settings → Build/Deploy).

No environment variables are required — the page is fully static, nothing
calls an API.

## Project structure

```
index.html          Vite entry HTML (loads the Outfit font, mounts #root)
src/
  main.jsx           React root
  App.jsx            The entire page: hero, sessions, pricing, FAQ, modal
  App.css            All styling — plain CSS custom properties, no build step
vite.config.js
package.json
railway.json
```

## What's still a placeholder

- Speaker names, titles, bios and traits for the four October sessions
  (search `Speaker Name` in `App.jsx`, and the `sessions` array at the
  top of the file for the fuller bio/journey/hear text per session)
- The hero carousel and "Speakers" grid photos are gradient blocks with
  initials — swap `.mini-card`, `.speaker-gc-photo` backgrounds for real
  `<img>` tags once photos are ready
- The "Our speakers come from" strip lists placeholder fund/company names
- The subscription price (`€—`) is a placeholder — put the real monthly
  price in the JSX where `priceAmount` was rendered
- The "Subscribe" buttons call `handleSubscribe()`, which just shows an
  alert — wire this up to your real checkout flow
- The session detail modal is fully data-driven from the `sessions` array
  at the top of `App.jsx` — edit that array once real speakers are confirmed

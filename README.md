# BRAVVA landing page + app prototype

Travel solo. Never alone. Static site for BRAVVA Club Empire, separate from the Sparkle Hub codebase.

- `index.html` — landing page (waitlist)
- `app/` — clickable app prototype, starts at `app/welcome-1.html`
  - Welcome 1–4, Home, Plan timer, Trips (Landed safe), Nearby, Places
  - `dc-lite.js` powers the interactive screens (no build step, no dependencies)

## Brand
Plum `#3B1030` · Cream `#F6EEE2` · Sand `#E6D8C5` · Berry `#B0246E` · Blush `#F0C9D3`
Fonts: Fraunces (headings) + DM Sans (body), from Google Fonts.

## To do
- Replace the photo placeholders (boxes captioned "Photo: …") with real images in an `images/` folder.
- Connect the waitlist form to Systeme.io.
- Fill [YOUR PRICE] and the place names in `app/places.html`.

## Publish free with GitHub Pages
Settings → Pages → Source: "Deploy from a branch" → Branch: `main`, folder `/ (root)` → Save.
Live in about a minute at `https://<your-username>.github.io/bravva-landing/`.

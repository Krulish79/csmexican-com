# CSM — csmexican.com

Static one-page marketing site for CSM (Conservando el Sabor Mexicano),
a Mexico City-based premium co-manufacturer of hot sauces, dressings,
spreads, and condiments for international food brands.

**Stack:** Vanilla HTML / CSS / JS — no build step, no framework.
**Hosting:** GitHub Pages.
**Domain:** `csmexican.com` (owned).

---

## Local preview

Just open `index.html` in a browser, or run a tiny local server:

```bash
python3 -m http.server 8000
# → http://localhost:8000
```

## Deploy (GitHub Pages)

1. Push this folder to a GitHub repository (e.g. `csm-website`)
2. In the repo: **Settings → Pages**
3. Source: **Deploy from branch** → `main` / root (`/`)
4. Wait ~60 seconds. The site goes live at `https://<user>.github.io/csm-website/`

### Custom domain (`csmexican.com`)

1. In the repo root, add a file named `CNAME` containing the single line:
   ```
   csmexican.com
   ```
2. At the domain registrar, point DNS to GitHub Pages:
   - `A` records for the apex domain:
     - `185.199.108.153`
     - `185.199.109.153`
     - `185.199.110.153`
     - `185.199.111.153`
   - `CNAME` for `www`: `<user>.github.io`
3. In **Settings → Pages**, enter `csmexican.com` as the custom domain, tick **Enforce HTTPS**.

---

## File map

```
.
├── index.html              Single-page site, semantic sections
├── css/style.css           Brand tokens + responsive layout
├── js/main.js              Nav toggle, scroll fade-in, form handler
├── images/
│   ├── og-image.png        1200×630 share card
│   ├── logo/               Primary, wordmark, isologo, white variant
│   ├── certifications/     (pending real certification logos)
│   ├── clients/            (not used — client section is text-only)
│   └── sections/           (pending stock photography)
├── robots.txt              Allows search, blocks AI training crawlers
├── sitemap.xml             Homepage + anchored sections
├── .nojekyll               Tells GitHub Pages to serve files as-is
└── NEEDS-FROM-ADRIANA.md   Outstanding inputs before launch
```

---

## Outstanding items to launch

See `NEEDS-FROM-ADRIANA.md`.

Short list:
1. Adriana to purchase `csmexican.com`
2. Public contact info (address, optional phone) — currently shows
   `sales@csmexican.com` and "Ciudad de México, MX"
3. Form destination — Formspree (recommended) or Netlify Forms.
   Wiring instructions are inline next to the `<form>` element.
4. Capacity numbers (MOQ, monthly capacity, lead times) — optional
5. Stock photography (~5–8 images)

---

## Conventions

- `data-needs-photo` — placeholder for stock photo
- `data-pending-info` — value pending final confirmation
- `data-pending-form-destination` — on the `<form>`; removing it
  signals delivery is wired up

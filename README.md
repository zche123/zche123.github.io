# Zhilin (Cassiel) Chen — Portfolio

Personal portfolio website for Zhilin (Cassiel) Chen, Environmental Data Scientist & Sustainability Specialist.

**Live site:** https://zche123.github.io

---

## File Structure

```
zche124.github.io/
├── index.html              # Home page
├── projects.html           # Projects listing
├── about.html              # About / CV page
├── contact.html            # Contact page
├── projects/
│   ├── sea-turtle.html     # Sea Turtle Nesting Habitat project
│   ├── climate-risk.html   # Physical Climate Risk Framework project
│   ├── ecovadis.html       # EcoVadis Top 5% project
│   └── barrier-islands.html # Barrier Island Shoreline Change project
├── css/
│   └── style.css           # All styles (single stylesheet)
├── js/
│   └── main.js             # All JavaScript (active nav, contact form, smooth scroll)
└── README.md
```

---

## Local Development

This is a plain static site — no build tools required.

```bash
# Open directly in browser
open index.html

# Or serve with Python's built-in server (recommended — avoids some path quirks)
cd zche124.github.io
python3 -m http.server 8000
# then open http://localhost:8000
```

---

## Deployment (GitHub Pages)

The site is deployed via GitHub Pages from the `main` branch root.

### First-time setup

```bash
cd zche124.github.io
git init
git add .
git commit -m "Initial portfolio"
git branch -M main
git remote add origin https://github.com/zche124/zche124.github.io.git
git push -u origin main
```

Then in GitHub → repository Settings → Pages:
- **Source:** Deploy from a branch
- **Branch:** `main`, `/ (root)`

The site will be live at `https://zche124.github.io` within a few minutes.

### Subsequent updates

```bash
git add .
git commit -m "describe your change"
git push
```

GitHub Pages rebuilds automatically on every push to `main`.

---

## Customization

| What to change | Where |
|---|---|
| Colors / typography | `css/style.css` — `:root` variables at the top |
| Navigation links | Each HTML file, `<nav>` section |
| Bio text | `index.html`, `about.html` |
| Projects | `projects.html` + individual files in `projects/` |
| Contact email | `contact.html` (mailto link) and `js/main.js` |
| Footer year | Each HTML file, `<footer>` |

---

## Tech Stack

- Plain HTML5, CSS3, vanilla JavaScript — zero dependencies, zero build step
- Google Fonts: [EB Garamond](https://fonts.google.com/specimen/EB+Garamond)
- Hosted on GitHub Pages (free, custom domain supported)

---

## Adding a Custom Domain

1. Buy a domain (e.g., cassielchen.com)
2. In the repo root, create a file named `CNAME` with one line: `cassielchen.com`
3. In your DNS provider, add:
   - `A` record → `185.199.108.153` (and the three other GitHub IPs)
   - or `CNAME` → `zche124.github.io`
4. In GitHub Pages settings, enter the custom domain and enable HTTPS

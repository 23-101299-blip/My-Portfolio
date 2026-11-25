# Aly Gameel — Retro Pixel Portfolio

A personal portfolio website built in **React** (bundled with **Webpack**, no Vite), based on the
"MY PORTFOLIO" Figma file. The site is themed as a retro pixel game: a character walks and jumps
through the home page and **hits a block to open one of the 8 portfolio categories ("worlds")**.

---

## 1. Run it on your computer

You need [Node.js](https://nodejs.org) (version 18 or newer).

Open this folder in VS Code, then open the terminal (**Terminal → New Terminal**) and run:

```bash
npm install      # first time only — downloads the libraries
npm start        # starts the site at http://localhost:3000
```

The page reloads automatically when you save a file. Press `Ctrl + C` in the terminal to stop it.

## 2. Build it for the web

```bash
npm run build
```

This creates a `dist/` folder containing the finished website.

**Free hosting (recommended: Netlify):** go to <https://app.netlify.com/drop> and drag the `dist`
folder onto the page. The `_redirects` file is already included, so addresses such as
`/projects` keep working after a page refresh.

---

## 3. The pages (current version: 8 screens)

| # | Page | Address |
|---|------|---------|
| 1 | Preloader / Loading screen | plays on the first visit, and has its own page at `/loading` |
| 2 | Home — "Retro Home page" | `/` |
| 3 | About Me — "Player profile" | `/about` |
| 4 | All Projects — "Level select" (with category filter) | `/projects`, filtered: `/projects?category=ui-ux` |
| 5 | Categories — "World select" | `/categories` |
| 6 | Contact | `/contact` |
| 7 | Resume / CV | `/resume` |
| 8 | Custom 404 | any unknown address, e.g. `/abc` |

Project Details and Project Case Study pages are **not included in this version**. Each category
(from the Categories page, the Home skills list, or by hitting a block in the game) opens All
Projects filtered to that category. Project cards show category tags instead of a details button.

The **8 categories**: Brand Identity Design · UI/UX · Micro Animation · Contextual Research ·
Game UI/UX Design · Coding & Development · Interactive 3D Design · XR Interaction Design.

## 4. Animations & interactions (rubric: 15 marks)

- **Tour guide:** Pixel Aly walks in, waves and gives page-by-page tips with typewriter text.
- **Mini-game on Home:** ← → (or A/D) to walk, Space/↑ to jump. Hitting a block bumps it,
  pops a coin and opens that category's projects. On phones: ◀ ▶ JUMP buttons, or tap a block and the
  character walks over and jumps by itself.
- **Preloader** with a segmented progress bar and a "Press Start" button.
- **Page transitions:** a pixel "curtain" wipe plus a fade/slide for every page change.
- **Scroll reveals** on cards and windows, **hover effects** on buttons, cards, icons and blocks.
- **All Projects filter** animates cards in and out.
- **404:** glitching "404" and a blinking broken computer.
- Everything respects the visitor's *reduce motion* setting (animations switch off).

## 5. Responsive (rubric: 30 marks)

Layouts are built with CSS Grid/Flexbox (no fixed positioning) and tested at **375px (phone),
768px (tablet), 1024px and 1280px (desktop)**, with no sideways scrolling on any page. Under 900px
the menu becomes a hamburger. The game's camera follows the character, so the level works on
any screen width.

---

## 6. Editing content

**Almost all text lives in one file: `src/data/site.js`.** Change it there and every page updates.

| To change… | Edit in `src/data/site.js` |
|---|---|
| Name, email, phones, bio | `profile` |
| LinkedIn / Instagram / Facebook links | `profile.social` — paste the URL into `url: ''` |
| Add or edit a project | `projects` (copy an existing entry) |
| Which category a project belongs to | the project's `categories: [...]` list (use the category `slug`) |
| Experience / education | `experience`, `education` |
| Tools & skills on Home | `toolGroups`, `skills` |

**Add your CV:** put the PDF at `public/assets/cv/Aly-Gameel-CV.pdf`, then set
`cvAvailable: true` in `profile`. The Download CV button will start working.

**New images:** drop PNGs into `public/assets/img/` and run `npm run optimize-images`. This
converts them to small WebP files (the original Figma exports were 37 MB in total; the site now
loads about 0.7 MB of images). The originals are kept in `design-originals/`.

## 7. Placeholders still to fill in (from the Figma file)

- Resume: institution, qualification, dates; awards & certifications.
- Contact: confirmed LinkedIn / Instagram / Facebook URLs.
- Project roles and durations marked `[Add …]`, and the "Provisional descriptive label" texts.
- The FoodIQ card thumbnail is a schematic placeholder. Replace it with a real screen when you have one.
- **Check the email spelling:** the Figma design uses `ali.gameel.hussein@gmail.com`.

## 8. About the character (Pixel Aly) and the tour guide

The player is **Pixel Aly**, hand-drawn in pixels from Aly's portrait: curly hair with a fade,
sunglasses, beard, black suit, white shirt and pocket square. The skin and hair colours are sampled
from the photo. The pixel grids are in `src/data/sprite.json`. After editing them, run
`node tools/preview-sprite.js` to see every pose in `tools/preview-sprite.png`.

The same character is the **tour guide** (`src/components/TourGuide.jsx`). He walks in at the
bottom-left of every page, waves and types tips about that page, with buttons that take visitors to
the next useful place. Visitors can close him with the × button, which turns him into a small
GUIDE button. On phones he tucks away automatically when you scroll. Edit his lines in
`linesFor()` inside that file.

The Figma file uses the Nintendo Mario sprite and scenery. Those are copyrighted, so the site uses
this original character and original pixel scenery instead.

## 9. Project structure

```
public/            index.html, favicon, _redirects, assets/ (images, icons, pixel art)
src/
  index.jsx        entry point
  App.jsx          routes, preloader, page transitions
  data/site.js     ALL content (edit here)
  components/      Nav, Footer, Window, Button, GameStage, PlayerSprite, Preloader, …
  pages/           one file per page
  styles/          tokens.css (colours/fonts), base, components, game, pages (+ breakpoints)
tools/             image optimiser and helper scripts
webpack.config.js  build setup (Babel + CSS)
```

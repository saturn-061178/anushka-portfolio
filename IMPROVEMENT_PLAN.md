# Improvement plan

Review of the portfolio site as of build `v40` (commit `749b84a`). It is a static site of plain HTML, CSS and JS with no build step, published on GitHub Pages.

## What I checked

- Read every file in `index.html`, `css/`, `js/` and `js/data/`, plus `README.md`, `vercel.json`, `manifest.webmanifest` and `404.html`.
- Loaded the site in headless Chromium at 1440×900 and 390×844. I scrolled the home page and opened `#/work`, `#/case/bhm`, `#/case/cookstove`, `#/case/bhilwa`, `#/case/amulai`, an unknown slug and `#top`.
  - **No JavaScript errors** at either size, and no horizontal scroll.
  - About 2.5 MB over 74 requests on desktop, and 3.2 MB over 87 requests on the phone.
  - The only failed request was three.js from cdnjs. That was caused by the sandbox network, but it shows how the site behaves when the CDN is unavailable (see 2.3).
- Checked keyboard and focus behaviour with reduced motion turned on.

## 0. Wrong project notes (fix first)

The `CLAUDE.md` given for this task describes a different app: "TADA", with a React frontend, a FastAPI backend, SQLite and CSRF. None of that exists in this repository. If that file is put into this repo, it will mislead every future Claude session.

**Action:** write a `CLAUDE.md` for this project. It should cover the static site, the `?v=` and `BUILD_V` cache-busting rule, the script load order, the private-data rule (the phone number), and how to run and publish the site.

## 1. Quick wins (an hour or less each)

| # | Issue | Where | Fix |
|---|---|---|---|
| 1.1 | `becon24.mp4` is **47 MB** and `tedx.mp4` is 10 MB. The README already lists this as a known gap. | `assets/becon24/`, `assets/tedx/` | Re-encode to H.264/H.265 at about 720p and CRF 28 (a 2–5 MB target), and add a WebM/AV1 source. Keep `preload="none"` and set a `poster`. |
| 1.2 | Two images are never referenced: `img-03.jpg` and `img-04.jpg`. | `assets/site/` | Delete them, or use them. |
| 1.3 | The README still describes the parent monorepo (`--directory new-site`, `git subtree push --prefix new-site`). | `README.md` | Rewrite the run and publish steps for this repository as it stands. |
| 1.4 | `vercel.json` is unused because the site is on GitHub Pages, so its cache headers do nothing. | root | Delete it, or move hosting to Vercel or Netlify (see 3.3). |
| 1.5 | The site ships a placeholder phone number (`+91XXXXXXXXXX`). The buttons hide correctly, but the `#cnum` markup still contains `+91 XXXXX XXXXX`. | `js/contact.js`, `index.html` | Set the real number, or remove the placeholder from the HTML so it never flashes. |
| 1.6 | An unknown case slug (`#/case/nope`) silently shows the home page. | `js/effects.js` (`applyRoute`) | Show a toast ("That project isn't here") or the 404 frame. |
| 1.7 | `404.html` hard-codes `/anushka-portfolio/`. | `404.html` | Keep it, but note it in the README next to the canonical/OG URLs that must change if the address moves. |

## 2. Robustness and maintainability

**2.1 Automate cache-busting.** `?v=40` is repeated in 23 places, plus `BUILD_V`. Forgetting one gives visitors stale files. Add a small `scripts/bump-version.sh` (or a Node script) that rewrites every `?v=N` and `BUILD_V` in one step. Optionally, use content hashes instead.

**2.2 Make the implicit globals explicit.** The 17 scripts share undeclared globals across files, for example:

- `pages.js` uses `io`, `CASES`, `target`, `cur` and `maxS` from `home.js`.
- `callback.js` monkey-patches `applyRoute`.

This works, but the load order is fragile and hard to follow. In order of effort:

- **Cheap:** add a header comment to each file listing the names it uses and the names it defines, and add a lint check (`eslint` with `no-undef` and a globals list).
- **Better:** move to ES modules (`<script type="module">`) with explicit imports. That still needs no build step, and the load-order rule goes away.

**2.3 three.js loading.**

- `lab3d.js` loads three.js r128 from cdnjs without an `integrity` hash.
- It then checks for the library 40 times at 250 ms intervals before giving up.

**Fix:** self-host a pinned `three.min.js` under `vendor/`, or add `integrity` and `crossorigin`. Use `script.onload` and `onerror` instead of polling. r128 is old; when convenient, upgrade it and move to the module build.

**2.4 Readability of source.** Most files are written as dense one-liners (`main.css` is 77 KB in about 700 lines, and `home.js` is 21 KB in 136 lines). This makes diffs and reviews hard.

- Run Prettier once over `css/` and `js/` in a dedicated "format only" commit, so behaviour changes stay reviewable.
- Keep the terse style in data files if preferred.

**2.5 Call-back form feedback.** Requests use `fetch(..., {mode:'no-cors'})`, so success is shown even if the Apps Script errors or quota runs out. Options:

- Make the Apps Script return JSON with CORS-friendly JSONP or a redirect, then check the reply.
- At minimum, log failures in the sheet script and send a daily email digest.
- Add basic rate limiting by name and phone on the script side. The honeypot alone won't stop a determined bot.

## 3. Performance

**3.1 Fonts.**

- The home page loads 5 Google font families: Fraunces (variable, with 4 axes), Inter, Instrument Serif, Caveat and IBM Plex Mono.
- The case studies add Archivo and IBM Plex Sans.

**Fix:** subset to the weights actually used, self-host the WOFF2 files, and `preload` the one hero font. This cuts render-blocking requests to third-party origins.

**3.2 Images.**

- Only 3 `<img>` elements use `loading="lazy"`, and few have `width` and `height` set.
- Add `loading="lazy"`, `decoding="async"` and intrinsic sizes to everything below the fold (corner board, work panels, case galleries). This prevents layout shift and saves data on phones.
- Convert the remaining JPG/PNG files in `assets/site/` to WebP or AVIF. `img-29.jpg` alone is 400 KB.

**3.3 Caching.** GitHub Pages serves everything with `max-age=600`. If faster repeat visits matter, move to Cloudflare Pages, Netlify or Vercel. Those allow long-lived immutable caching of the versioned assets, and the existing `vercel.json` would then apply.

**3.4 Main-thread work.** The home page runs several always-on `requestAnimationFrame` loops: the fluid simulation, the contact portrait, maths curves, the cat and the reel. `pageHeld()` already pauses them when hidden. Two improvements:

- Gate each loop on its own `IntersectionObserver` visibility, as `contact.js` already partly does, so off-screen sections cost nothing.
- Measure with the Chrome Performance panel on a mid-range Android device. Target fewer than 50 ms of long tasks while scrolling.

## 4. Accessibility

**4.1 The full-screen page dialog.** `#page` is a `role="dialog"`, but when it opens:

- focus stays on `<body>`;
- the home page behind it is not `inert`, so screen-reader and Tab users can wander into hidden content.

**Fix:** on `openPg`, set `inert` on the home sections and move focus to the page heading or the "← HOME" button. On `closePg`, remove `inert` and restore focus to the link that opened the page.

**4.2 Reduced motion coverage.** `motion.js` respects `prefers-reduced-motion`, and there are 11 rules elsewhere. Audit the scroll choreography in `home.js`, the wipe transition in `effects.js`, and the cat's movement under reduced motion. The eased wheel scroll in particular should fall back to native scrolling.

**4.3 Run an automated audit.** Run axe-core or Lighthouse on `/`, `#/work` and one case page, and fix any contrast, name or role findings. Recent commits fixed label contrast, so this checks that nothing has regressed.

## 5. Quality gates (stop regressions)

There are no tests or CI today. A light setup that fits a no-build site:

1. **Smoke test (Playwright):** load `/` and every `#/case/<slug>` from `PROJECTS`. Fail on any `pageerror` or console error, any 404 for an asset, or horizontal overflow at 390 px wide. That is about 40 lines; a working draft of this check was run for this review.
2. **Link and asset check:** every `assets/...` path referenced in HTML, JS or CSS exists, and every file in `assets/` is referenced. This catches 1.2 automatically.
3. **Version check:** every `?v=` number in `index.html` matches `BUILD_V`.
4. **GitHub Actions:** run 1–3 and axe on every push to a branch, before publishing to `main`.

## 6. Content (owner's call)

- AmulAI shows a "coming soon" page, and Indocables is "in progress". Either finish them, or hide them from the home reel until they're ready, so the first impression shows only finished work.
- Consider a downloadable PDF résumé link in the nav or contact section, since recruiters often look for one.

## Suggested order

1. **Week 1:** Section 0 (fix the project notes) and 1.1–1.6. These are quick and visible, and the video fix is the biggest win for phone visitors.
2. **Week 2:** Section 5, steps 1–3 (the safety net), then 2.1 (version bump script) and 4.1 (dialog focus and `inert`).
3. **Week 3:** Section 3 (fonts, lazy images) and 2.3 (three.js), checking each against the smoke test.
4. **Later:** 2.2 (ES modules) and 2.4 (formatting), each as its own commit with no behaviour change.

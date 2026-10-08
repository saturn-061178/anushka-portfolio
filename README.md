# Anushka Chowdhary — portfolio

A static site: plain HTML, CSS and JavaScript, no build step.

## Run it

Open `index.html` in a browser, or serve the folder:

```bash
python -m http.server 4173 --directory new-site
```

## Host it

The site is live on GitHub Pages: <https://saturn-061178.github.io/anushka-portfolio/>

It is published from the repository <https://github.com/saturn-061178/anushka-portfolio>, which holds only the
contents of this folder. To publish a change, commit it in the main project and run this from the project root:

```bash
git subtree push --prefix new-site pages main
```

Raise the `?v=` number on the CSS and JS links in `index.html` first, so visitors get the new files.
The live site updates a minute or two after the push.

## Layout

| Path | What it holds |
|---|---|
| `index.html` | Page markup: hero, about, work reel, contact, approach, corner |
| `css/main.css` | Styles for the home page and the shared page shell |
| `css/typography.css` | Heading weight for the whole site (`--hw`) |
| `css/projects.css` | Full-screen project pages and their motion |
| `css/motion.css` | Motion graphics: title slate, kinetic band, spinning badge |
| `css/work.css` | The Projects page |
| `js/data/projects.js` | **The list of projects.** Order here is the order on the site |
| `js/data/illustrations.js` | The looping line illustration for each project |
| `js/data/case-studies-data.js` | The two long case studies (Cookstove, Bhilwa) |
| `js/core.js` | Small helpers and the sketch icons |
| `js/home.js` | Home page: work reel, scroll choreography, corner wall, loader |
| `js/cat.js`, `js/lab3d.js`, `js/maths.js`, `js/contact.js` | One home-page feature each |
| `js/pages.js` | `#/work` and `#/case/<slug>` routing |
| `js/work-page.js` | The Projects page (`#/work`) |
| `js/case-studies.js` | Mounts the two long case studies |
| `js/case-study-plus.js` | Motion layered on the long case studies; Bhilwa's dark hero |
| `js/project-pages.js` | Full-screen project pages, image viewer, frame counter |
| `js/motion.js` | Motion graphics on project and Work pages, magnetic buttons |
| `js/callback.js` | "Request a call back" button and form; sends to a Google Sheet |
| `js/effects.js` | Glitter, nav indicator, page transition |
| `js/main.js` | Starts the router |
| `assets/<project>/` | Images and films per project |
| `assets/site/` | Images used by the home page and the long case studies |

Scripts are plain `<script>` tags loaded in the order listed in `index.html`; later files
use names defined by earlier ones, so keep that order.

## Common edits

- **Add or reorder a project:** edit `js/data/projects.js`. The first entry is the big card
  on the home reel. A project with `sections` gets those sections; one without still gets a
  page (cover, illustration and a "coming soon" note).
- **Stale styles after an edit:** bump the `?v=` number on the CSS and JS links in `index.html` so browsers fetch the new files.
- **Heading weight:** change `--hw` in `css/typography.css` (300 to 900).
- **Call-back form to Google Sheet:** follow `google-sheet-setup/README.md` (one level up), then paste the web app URL into `js/callback.js`.
- **Phone number:** set `PHONE` at the top of `js/contact.js`. Until it is set, the
  WhatsApp, Text and Call buttons stay hidden.
- **Email / LinkedIn:** in `index.html`, the contact section and the footer.

## Known gaps

- AmulAI shows a short page marked "full write-up coming soon"; Indocables is marked "in progress".
- `assets/becon24/becon24.mp4` is 47 MB and should be compressed before heavy traffic.
- No social preview image (`og:image`) is set; add one once the site has a public URL.

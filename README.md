# Arsalan Ali Sargana — Portfolio (Frontend-Only)

A complete portfolio website with an admin CMS — **no backend, no
database, no server to deploy or maintain.** Everything runs as a single
static site.

## Stack
React + Vite + Tailwind CSS + Framer Motion. That's it — no Express, no
MongoDB, no Render, no CORS, no environment-variable-across-two-platforms
juggling.

## How content works (read this first)

There's no database, so content lives in `src/data/content.json` — that
file ships with the site and is what every visitor sees.

The admin panel (`/admin/login`) lets you edit everything (settings,
skills, projects, blog posts, testimonials) with the same UI as before.
Edits are saved instantly to **this browser's local storage**, so your
work isn't lost on refresh — but it's only visible to you, in this
browser, until you publish it:

1. In the admin dashboard, go to **Publish Changes** → **Export
   content.json**.
2. Replace `src/data/content.json` in your project with the downloaded file.
3. Commit and push to GitHub. If connected to Vercel/Netlify, it
   redeploys automatically — now everyone sees your changes.

This trade-off is what makes the whole project backend-free: there's
nothing that can go down, misconfigure, or need a database connection
string ever again.

## Images and files
Uploading an image or CV in the admin panel converts it to a compact
embedded format directly in `content.json` — no file storage server
needed. Keep images reasonably sized (a few hundred KB) since they become
part of the page itself.

## Contact form
Without a backend, the form needs somewhere to actually send messages:
- **Recommended:** create a free account at [formspree.io](https://formspree.io),
  get your form endpoint, and paste it into Settings → "Formspree Endpoint".
  Messages arrive in your email, no code changes needed.
- **Without one configured:** the form opens the visitor's email app
  instead, pre-filled with their message.

## Admin password
Set in `.env` as `VITE_ADMIN_PASSWORD` (defaults to `Admin@123` if unset —
change this). Note this is **not real security** — it's a client-side
check baked into the built JavaScript, enough to keep casual visitors out
of the admin UI, but not something to rely on for protecting sensitive
data. There is nothing sensitive to protect here anyway (no user data,
no payments) — just your own portfolio content.

## Local setup
```bash
npm install
cp .env.example .env
# edit .env and set your own VITE_ADMIN_PASSWORD
npm run dev
```
Open http://localhost:5173. Admin panel at http://localhost:5173/admin/login.

## Deploy (Vercel)
1. Push this project to GitHub.
2. Vercel → New Project → import the repo. Framework preset: Vite.
3. Add environment variable `VITE_ADMIN_PASSWORD` with your chosen password.
4. Deploy. Done — one deployment, nothing else to configure.

`vercel.json` is already included so that direct links like
`/admin/login` or `/blog/some-post` work correctly on refresh.

## Project structure
```
src/
  data/content.json         # the site's content — the single source of truth
  context/
    ContentContext.jsx        # in-memory + localStorage content state, export/import
    AuthContext.jsx             # simple client-side admin password check
  utils/fileToDataUrl.js         # converts uploaded images/CVs to embeddable data
  components/                     # public site sections (Hero, About, Skills, ...)
  components/admin/                # AdminLayout, CrudManager, SettingsPanel, PublishPanel
  pages/                             # Home, ProjectDetail, BlogList, BlogDetail, NotFound
  pages/admin/                        # AdminLogin, AdminDashboard
```

## Design system
Dark theme, cyan/purple accents, glassmorphism cards, Space Grotesk +
Inter fonts, Framer Motion scroll reveals — identical to the original
design. Fully responsive: mobile, tablet, desktop, including the admin
dashboard's tables and forms.

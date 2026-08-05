# Swarali — Product Designer

Next.js 16 (App Router, TypeScript) port of the single-file portfolio site.

## Structure

```
src/
  app/
    layout.tsx        root layout — fonts, metadata, wraps everything in SiteChrome
    globals.css        the whole design system (tokens, sheen, nav, reveals, per-page styles)
    page.tsx            /            (home)
    about/page.tsx       /about
    work/page.tsx         /work
    contact/page.tsx       /contact
  components/
    SiteChrome.tsx      overlays (sheen/grain/vignette/progress), intro, curtain,
                         smooth-scroll + reveal-on-scroll engine — the client "runtime"
    Nav.tsx / TransitionLink.tsx   nav + the curtain-covered internal navigation
    WorkDeck.tsx        the scroll-pinned project deck on /work
    SketchWall.tsx      the pinned sketch wall on /work
    ContactForm.tsx     validation + mailto composition
    Footer.tsx, Band.tsx, Logo.tsx, PhotoFallback.tsx
public/
  work/      drop nebula.jpg, pulse.jpg, atlas.jpg, vela.jpg, aura.jpg, terra.jpg here
  sketches/  drop speaker.jpg, earbuds.jpg, mouse.jpg, hairdryer.jpg, iron.jpg here
```

Until real images are dropped into `public/work` and `public/sketches`, every
image gracefully falls back to a placeholder — nothing breaks.

## Fonts

Mona Sans, Anton and Michroma are self-hosted via `@fontsource` packages
(imported in `globals.css`) rather than fetched from Google Fonts at runtime —
faster, more private, and works with no external font request at all.

## Run locally

```bash
npm install
npm run dev
```

Open http://localhost:3000.

## Build

```bash
npm run build
npm run start
```

See `DEPLOY.md` for putting this live on Vercel.

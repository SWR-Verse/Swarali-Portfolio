# Going live on Vercel

Vercel is built by the Next.js team — importing an App Router project like
this one is zero-config. Five-ish minutes, no credit card needed for the free
tier.

## 1. Push this project to GitHub

The project already has a git repo with one commit. You just need to give it
a remote.

```bash
cd swarali-portfolio-next
gh repo create swarali-portfolio --public --source=. --remote=origin --push
```

Don't have the `gh` CLI? Do it from github.com instead:

1. Go to https://github.com/new, create a repo (e.g. `swarali-portfolio`), don't
   initialize it with a README.
2. Back in your terminal:
   ```bash
   cd swarali-portfolio-next
   git remote add origin https://github.com/<your-username>/swarali-portfolio.git
   git branch -M main
   git push -u origin main
   ```

## 2. Import into Vercel

1. Go to https://vercel.com/new and sign in with your GitHub account.
2. Click **Import** next to the `swarali-portfolio` repo.
3. Leave every setting on its default — Vercel detects Next.js automatically
   (framework preset, build command, output directory all pre-filled).
4. Click **Deploy**.

That's it. You'll get a live URL like `swarali-portfolio.vercel.app` within
about a minute. Every future push to `main` redeploys automatically.

## 3. Custom domain (optional)

Project → Settings → Domains → add your domain, then point its DNS at Vercel
per the instructions Vercel shows you there (usually one CNAME record).

## Before you deploy — the two things worth doing first

- **Add real images.** Drop files into `public/work/` and `public/sketches/`
  with the exact names listed in `README.md`. Without them the site still
  works, just shows placeholders.
- **Social links.** `src/components/Footer.tsx` has four `href="#"` links
  (LinkedIn, Dribbble, Behance, Instagram) — swap in your real profile URLs.

Neither blocks a deploy; both are quick to do after you see it live, too.

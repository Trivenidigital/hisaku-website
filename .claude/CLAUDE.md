# Hisaku — Agency Website

## What this is

Marketing and digital agency website for Hisaku.
Target clients: Local Indian SMEs and small businesses.
Goal: Generate client inquiries, showcase services, build credibility.
Live URL: (to be set after deployment)
Repo: github.com/Trivenidigital/hisaku-website

## Brand Identity

* **Name**: Hisaku
* **Tagline**: "We Build What Moves."
* **Vibe**: Futuristic — dark mode, glowing accents, AI-forward, premium
* **Target audience**: Indian SME owners, local business founders, startups
* **Tone**: Confident, direct, forward-thinking — not corporate, not casual

## Services (headline — in this order)

1. Web Design — Beautiful, conversion-focused websites
2. Web Development — Custom apps and platforms
3. Marketing \& SEO — Growth through search and content
4. SME Automation / AI Agents — Business workflows on autopilot

## Design Direction

* Dark backgrounds: #050507 primary, #0d0d12 surface
* Accent: Electric lime #e8ff47 + violet glow #7c6af7
* Typography: Syne (headings, bold/display) + DM Sans (body, clean)
* Aesthetic: Futuristic agency — think Vercel meets Indian startup energy
* Motion: Scroll-triggered reveals, glowing hover states, staggered text
* NO: purple gradients on white, Inter font, cookie-cutter layouts
* YES: dark grain texture, asymmetric grid, oversized typography, glow effects

## Pages to build

1. **Home** — Hero + marquee + services + work samples + CTA
2. **Services** — Each service with detail, process, pricing hint
3. **Work** — Portfolio / case studies grid
4. **About** — Story, team, why Hisaku
5. **Contact** — Simple form + WhatsApp CTA

## Stack

* Framework: Next.js 14 (App Router)
* Styling: Tailwind CSS + custom CSS for animations
* Animations: Framer Motion
* Fonts: Google Fonts (Syne + DM Sans)
* Forms: Resend (email) or Formspree
* Hosting: Vercel
* Analytics: Vercel Analytics

## Project structure

src/
app/              ← Next.js App Router pages
page.tsx        ← Homepage
services/
work/
about/
contact/
components/
ui/             ← Reusable: Button, Badge, Tag
layout/         ← Navbar, Footer
sections/       ← Hero, Services, Work, CTA
lib/              ← Utilities, constants
styles/           ← globals.css, animations
public/
fonts/
images/

## Commands

* Dev server:   npm run dev        (localhost:3000)
* Build:        npm run build
* Type check:   npm run typecheck
* Lint:         npm run lint

## Code conventions

* Components: PascalCase, one per file
* All animations: Framer Motion (not CSS keyframes for complex ones)
* Colors: always use CSS variables from globals.css
* Images: next/image for all images, WebP format
* Mobile first — build mobile layout first, then md: and lg: breakpoints
* No inline styles — Tailwind classes only (except CSS variables)

## Quality gates — run before /ship

1. /design-review http://localhost:3000
2. /qa — test contact form, all nav links, mobile layout
3. npm run build — must pass zero errors
4. Lighthouse score > 90 on mobile

## Skill routing

* New page or section:  /office-hours first
* Design decisions:     /design-shotgun for variants
* After any UI change:  /design-review http://localhost:3000
* Before deploy:        /review then /qa then /ship

## Contact info (for footer / contact page)

* WhatsApp: (add your number)
* Email: (add your email)
* Instagram: (add handle if any)
* Location: Hyderabad, India

## Skill routing
* When starting any new page or section → /office-hours first
* When making design decisions → /design-shotgun for variants  
* When building any component → Use the Frontend Developer agent
* When reviewing before ship → Use the Reality Checker agent
* After any UI change → /design-review http://localhost:3000
* Before any deployment → /review then /qa then /ship


# RuleBase

**The open-source directory for AI editor system prompts.**

Discover, copy, and share curated rules for [Cursor](https://cursor.sh), [Windsurf](https://codeium.com/windsurf), [GitHub Copilot](https://github.com/features/copilot), and more. Ship better code, faster.

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Framework | [Next.js 16](https://nextjs.org) (App Router) |
| UI Library | [React 19](https://react.dev) |
| Styling | [Tailwind CSS v4](https://tailwindcss.com) |
| Components | [Shadcn UI](https://ui.shadcn.com) |
| Icons | [Lucide React](https://lucide.dev) |
| Language | [TypeScript 5](https://typescriptlang.org) |

## Features

- **Browse & Search** — Filter rules by category, framework, or keyword in real-time
- **One-Click Copy** — Copy any system prompt to clipboard instantly
- **Trending Rules** — Featured section highlighting the most popular prompts
- **Star Ratings** — Community-driven quality scores on every rule
- **Category Filters** — Quick pills for Next.js, Python, React Native, TypeScript, and more
- **Pricing Tiers** — Hobby (Free), Pro, and Team plans
- **Auth Page** — Sign-in with GitHub, Google, or email
- **Dark Mode** — Premium dark theme by default with glassmorphism effects
- **Responsive** — Fully optimized for mobile, tablet, and desktop
- **Smooth Navigation** — Anchor-based scroll with sticky header

## Getting Started

### Prerequisites

- Node.js 18.17+
- npm, yarn, pnpm, or bun

### Installation

```bash
git clone https://github.com/dnd21052002/rule-base.git
cd rule-base
npm install
```

### Development

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Build

```bash
npm run build
npm start
```

## Project Structure

```
rule-base/
├── app/
│   ├── sign-in/
│   │   └── page.tsx          # Authentication page
│   ├── globals.css           # Global styles & design tokens
│   ├── layout.tsx            # Root layout
│   └── page.tsx              # Landing page
├── components/
│   ├── ui/                   # Shadcn UI primitives
│   │   ├── badge.tsx
│   │   ├── button.tsx
│   │   └── input.tsx
│   ├── category-pills.tsx    # Filter pills
│   ├── cta-section.tsx       # Call-to-action banner
│   ├── featured-rules.tsx    # Trending rules section
│   ├── footer.tsx            # Multi-column footer
│   ├── header.tsx            # Sticky navigation header
│   ├── hero-section.tsx      # Full-viewport hero
│   ├── how-it-works.tsx      # 3-step bento section
│   ├── pricing-section.tsx   # Pricing tiers
│   ├── prompt-card.tsx       # Rule card with copy
│   ├── prompt-grid.tsx       # Responsive card grid
│   └── star-rating.tsx       # Star rating display
└── lib/
    ├── data.ts               # Mock data & types
    └── utils.ts              # Utility functions
```

## Deploy

Deploy to [Vercel](https://vercel.com) with one click:

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https%3A%2F%2Fgithub.com%2Fdnd21052002%2Frule-base)

## License

MIT

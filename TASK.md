# 2515-savior — Build Task

## Goal
Build a single-page shareholder activist campaign website for stock 2515 (中工/China Engineering Works).
Campaign name: 救救-2515 / 翻轉中工

## Stack
- Next.js 14 (App Router, static export `output: 'export'`)
- Tailwind CSS v3
- TypeScript
- Google Fonts: Noto Sans TC (Bold/Black weights)

## Project Location
~/src/github.com/yujuiting/2515-savior

## Assets (already in this folder)
```
Web/
  Header1-Top.png           # foreground: building + trees (transparent PNG, overlays on bg)
  Header1-TopWithCTA.png    # composite of Top + CTA
  Header2-CTA.png           # LINE QR code + contact text (transparent PNG)
  Header3-Text.png          # 翻轉中工 title text (transparent PNG)
  Header4-Bottom.png        # base background: cityscape panorama (opaque)
  Header4-Bottom-WithText.png # composite of bg + text

Mobile/
  mHeader1-Top.png          # same layers, mobile versions
  mHeader1-TopWithCTA.png
  mHeader2-CTA.png
  mHeader3-Text.png
  mHeader4-Bottom.png
  mHeader4-Bottom-WithText.png
```

## Setup Steps

1. Initialize Next.js project IN THIS DIRECTORY (not as subdirectory):
```bash
cd ~/src/github.com/yujuiting/2515-savior
npx create-next-app@latest . --typescript --tailwind --app --no-src-dir --import-alias "@/*" --no-git
```

2. Copy assets to public folder:
```bash
mkdir -p public/header
cp Web/*.png public/header/
cp Mobile/*.png public/header/mobile/
```

3. Configure next.config.ts for static export:
```ts
const nextConfig = {
  output: 'export',
  images: { unoptimized: true },
}
```

## Page Design

Single page with these sections:

### 1. Hero Header Section
Use CSS absolute positioning to layer the PNG assets:

**Layer stack (bottom to top):**
- Layer 1 (base): `Header4-Bottom.png` — full width background cityscape
- Layer 2: `Header1-Top.png` — foreground building + trees overlay
- Layer 3: `Header3-Text.png` — "翻轉中工" title text overlay
- Layer 4: `Header2-CTA.png` — LINE QR code + contact info overlay

**Mobile:** Replace with corresponding `mHeader*.png` files using Tailwind responsive classes.

Implementation approach:
- `position: relative` container
- Each layer as `<img>` with `position: absolute, top: 0, left: 0, width: 100%`
- Container height = aspect ratio of Header4-Bottom.png
- Use `<picture>` or Tailwind `md:hidden` / `hidden md:block` to swap Web vs Mobile
- Add subtle entrance animation: hero fades in over 0.8s on load

### 2. Statistics Comparison Section
Dark navy background (#0a1628 or similar deep blue).

Two side-by-side cards in a dark blue gradient container:

**Left Card:**
- Header text (small): "寶佳入主華建後改善經營股價翻倍"
- Big number: "400%" (in yellow/gold, huge font ~120px)
- Sub-text: "每股$15至每股$60"

**Right Card:**
- Header text (small): "中工市場派經營不當過去10年股價平均"
- Big number: "$8.24" (in white, huge font ~120px)
- Sub-text: "2015/11 至 2025/10"

**Below both cards, centered:**
- Yellow text: "如何選擇，股東的眼睛是雪亮的"

**Animations:**
- Cards slide up + fade in on scroll (Intersection Observer)
- Numbers do a count-up animation when visible (400 counts up, 8.24 counts up)

### 3. Strategy Section — 翻轉中工：加減乘除
Light sky blue background (like #e8f4fd or a soft gradient).

Section title: "翻轉中工：加減乘除" — centered, with blue horizontal lines on both sides.

Four items, each with a bold Chinese character label + description:

1. **加** — 加入寶佳專業經營，活化中工
2. **減** — 減少既有中工罰款醜習，改善公司治理
3. **乘** — 乘倍效應，實現華建中工乘效
4. **除** — 去除重大賄賂與爭議事件，維護誠信經營

Each item: left blue border accent (4px solid blue), bold character on left, description text.
Staggered fade-in animation on scroll.

### 4. Footer
Dark background.
- LINE QR code image (from Header2-CTA.png, or embed a real QR if possible)
- LINE ID: @99-2515 in green rounded badge
- Tagline: "以實際行動翻轉經營，強化公司治理，並提升營運績效"
- Copyright or campaign info

## Typography
- Import Noto Sans TC from Google Fonts in layout.tsx
- Weights: 400, 700, 900
- Body: Noto Sans TC 400
- Headlines: Noto Sans TC 900
- Numbers in stats section: use system monospace or Impact-style (very bold, condensed)

## Tailwind Config
Extend with:
- Custom colors: navy (#0a1628), gold (#f5c518), campaign-blue (#1a3a6b)
- Custom font: noto-sans-tc

## Color Palette
- Dark navy: #0a1628
- Campaign blue: #1a3a6b  
- Accent yellow/gold: #f5c518
- White: #ffffff
- Sky blue (strategy section): #dbeafe or soft gradient
- LINE green: #00b900

## GitHub Repo
After building and verifying it runs locally (`npm run dev`):

```bash
cd ~/src/github.com/yujuiting/2515-savior
git init
git add .
git commit -m "feat: initial 2515-savior landing page"
gh repo create yujuiting/2515-savior --public --source=. --remote=origin --push
```

Make sure to use gh with yujuiting account (already active).
For git remote, use SSH: `git@github-yujuiting:yujuiting/2515-savior.git` (SSH host alias is configured in ~/.ssh/config).

## Vercel Deploy
After pushing to GitHub:

```bash
cd ~/src/github.com/yujuiting/2515-savior
vercel --yes --prod
```

If prompted for project settings, use defaults. The vercel account should already be configured.

## Done Criteria
1. `npm run build` succeeds with no errors
2. Site looks like the design with all 4 sections
3. GitHub repo created and pushed
4. Vercel deployment URL working

When completely done, run:
openclaw system event --text "Done: 2515-savior site built and deployed to Vercel. Repo: yujuiting/2515-savior" --mode now

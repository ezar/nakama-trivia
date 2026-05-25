# ☠️ One Piece Trivia

**Grand Line Edition** — A One Piece trivia game built for César and his kids.

Live at → **[ezar.github.io/nakama-trivia](https://ezar.github.io/nakama-trivia/)**

---

## Features

- 🏴‍☠️ **150+ questions** across 5 categories (Characters, Devil Fruits, Story Arcs, Bounties, Grand Line)
- ⏱️ **12-second timer** per question with a color-coded countdown bar
- 🔥 **Streak system** with milestone banners (×3 On Fire, ×5 Gear Second, ×10 Gear Third)
- 👤 **Multiple profiles** — each with Berries, rank progression and category stats
- 📈 **Adaptive difficulty** — harder questions as your accuracy improves
- 🍎 **Devil Fruit Encyclopedia** — browse and filter all known fruits
- 🤖 **Claude AI integration** — generates extra questions and explains wrong answers (optional API key)
- 🌐 **English / Spanish** — live language toggle, no reload needed
- 💾 **Offline-first** — all questions are local; AI features are optional
- 📱 **PWA** — installable on iOS and Android

## Ranks

| Berries | Rank |
|---------|------|
| 0 | Cabin Boy |
| 500 | Sailor |
| 1,500 | Pirate |
| 3,500 | First Mate |
| 7,000 | Captain |
| 15,000 | Warlord |
| 30,000 | Emperor |
| 60,000 | Pirate King |

## Stack

| Layer | Tech |
|-------|------|
| Framework | React 18 + Vite + TypeScript |
| Styles | Tailwind CSS (custom One Piece palette) |
| State | Zustand 5 + persist middleware |
| Animations | framer-motion |
| AI | Anthropic claude-sonnet (optional) |
| Deploy | GitHub Pages via GitHub Actions |

## Running locally

```bash
git clone https://github.com/ezar/nakama-trivia
cd nakama-trivia
npm install
cp .env.example .env        # optional: add VITE_ANTHROPIC_API_KEY
npm run dev
```

The game works 100% without an API key — Claude integration is purely additive.

## Project structure

```
src/
├── screens/          # StartScreen, HubScreen, GameScreen, Result, Ranking, DevilFruits
├── store/            # Zustand stores (game, profile, settings, claude)
├── engine/           # QuestionEngine (local + Claude mix), ClaudeEngine
├── data/questions/   # 150+ local questions across 5 categories
├── data/devilfruits  # Devil Fruit encyclopedia data
├── config/           # Categories, ranks, achievements
└── i18n/             # EN/ES translations
```

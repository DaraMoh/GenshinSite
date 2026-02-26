# Genshin Impact Fan Site

A fan-made compendium for Genshin Impact featuring character databases, tier lists, and endgame guides.

## Tech Stack

- **React 19** with React Router 7
- **Vite 7** for development and builds
- **Tailwind CSS 3** for utility styling
- **@dnd-kit** for drag-and-drop tier list maker
- **html-to-image** for PNG export

## Features

- **Characters** — Browse all playable characters with filters for element, weapon, and rarity
- **Tier List** — Meta rankings organized by role (Main DPS, Sub DPS, Support, Sustain) with character tags (Expert, F2P Friendly, etc.)
- **Tier List Maker** — Drag-and-drop custom tier list builder with PNG export
- **Endgame** — Guides for Spiral Abyss, Imaginarium Theatre, and Stygian Onslaught
  - Spiral Abyss floor layouts with enemy info and recommended team compositions

## Getting Started

### Prerequisites

- Node.js (v20.19+ or v22.12+)

### Installation

```bash
# Install dependencies
npm install

# Start dev server
npm run dev

# Build for production
npm run build

# Refresh character data from Enka Network
npm run fetch:characters
```

Open your browser and navigate to `http://localhost:5173`.

## Project Structure

```
src/
├── components/              # Reusable components
│   ├── Navbar.jsx           # Navigation bar with dropdowns
│   ├── CharacterCard.jsx    # Character display card
│   ├── CharacterPool.jsx    # Unranked character pool (tier maker)
│   ├── TierRow.jsx          # Draggable tier row (tier maker)
│   └── DraggableCharacter.jsx
├── pages/                   # Route pages
│   ├── Home.jsx             # Landing page
│   ├── Characters.jsx       # Character browser with filters
│   ├── TierList.jsx         # Static tier list by role
│   ├── TierListMaker.jsx    # Drag-and-drop tier maker
│   ├── Endgame.jsx          # Endgame hub
│   ├── SpiralAbyss.jsx      # Spiral Abyss floor guide
│   ├── ImaginariumTheatre.jsx
│   └── StygianOnslaught.jsx
├── data/                    # Data files
│   ├── characters.js        # Character data (auto-generated from Enka Network)
│   ├── tierList.js          # Role-based tier lists and character tags
│   └── spiralAbyss.js       # Spiral Abyss floor data
└── App.jsx                  # Router and route definitions
```

## Customization

Character data is auto-generated from [Enka Network](https://enka.network/). Run `npm run fetch:characters` to refresh.

To edit tier placements, modify `src/data/tierList.js`. To edit Spiral Abyss data (enemies, recommended teams), modify `src/data/spiralAbyss.js`.

## Disclaimer

Genshin Impact™ is a trademark of HoYoverse. This is a fan project and is not affiliated with or endorsed by HoYoverse.

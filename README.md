# Genshin Impact Fan Website

A Genshin Impact fan website built with React, Tailwind CSS, and dnd-kit, featuring character showcases, tier lists, and an interactive tier list maker.

## Features

- **Home Page**: Landing page with navigation to all features
- **Characters Page**: Browse all Genshin Impact characters with filtering by element and search functionality
- **Tier List**: View a community-curated tier list ranking characters by performance
- **Tier List Maker**: Create your own custom tier list using drag-and-drop functionality

## Tech Stack

- **React**: UI library
- **Vite**: Build tool and dev server
- **Tailwind CSS**: Utility-first CSS framework
- **dnd-kit**: Modern drag-and-drop toolkit for React
- **React Router**: Client-side routing

## Getting Started

### Prerequisites

- Node.js (v20.19+ or v22.12+)

### Installation

1. Install dependencies:
```bash
npm install
```

2. Start the development server:
```bash
npm run dev
```

3. Open your browser and navigate to `http://localhost:5173`

### Building for Production

```bash
npm run build
```

The production-ready files will be in the `dist` folder.

## Project Structure

```
src/
├── components/          # Reusable components
│   ├── Navbar.jsx      # Navigation bar
│   ├── CharacterCard.jsx
│   ├── TierRow.jsx
│   ├── CharacterPool.jsx
│   └── DraggableCharacter.jsx
├── pages/              # Page components
│   ├── Home.jsx
│   ├── Characters.jsx
│   ├── TierList.jsx
│   └── TierListMaker.jsx
├── data/               # Data files
│   ├── characters.js   # Character data
│   └── tierList.js     # Default tier list
└── App.jsx             # Main app component with routing
```

## Features Detail

### Characters Page
- View all characters with their stats (element, weapon, rarity, role)
- Filter by element
- Search by character name
- Color-coded by element type

### Tier List Maker
- Drag and drop characters between tiers (S, A, B, C, D)
- Visual feedback during dragging
- Reset functionality to start over
- Fully responsive design

## Customization

To add more characters, edit `src/data/characters.js` and add new character objects with the following structure:

```javascript
{
  id: 'character-id',
  name: 'Character Name',
  element: 'Pyro|Hydro|Electro|Cryo|Anemo|Geo|Dendro',
  weapon: 'Sword|Claymore|Polearm|Bow|Catalyst',
  rarity: 4|5,
  role: 'DPS|Support',
  icon: '🔥', // emoji icon
}
```

## License

This is a fan-made project and is not affiliated with miHoYo/HoYoverse.

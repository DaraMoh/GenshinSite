import { useState } from "react";

const styles = `
  @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,600;1,300;1,400&family=Cinzel:wght@400;600;700;900&family=Cinzel+Decorative:wght@400;700&display=swap');

  * { margin: 0; padding: 0; box-sizing: border-box; }

  .teyvatApp {
    background: #0a0807;
    color: #f0e6c8;
    font-family: 'Cormorant Garamond', serif;
    overflow-x: hidden;
    min-height: 100vh;
    position: relative;
  }

  .teyvatApp::before {
    content: '';
    position: fixed;
    inset: 0;
    background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='300' height='300'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='300' height='300' filter='url(%23noise)' opacity='0.03'/%3E%3C/svg%3E");
    pointer-events: none;
    z-index: 0;
  }

  /* HEADER */
  .tv-header {
    position: sticky;
    top: 0;
    z-index: 100;
    background: rgba(10, 8, 7, 0.95);
    backdrop-filter: blur(10px);
    border-bottom: 1px solid #7a6018;
    padding: 0 48px;
  }

  .tv-header-inner {
    display: flex;
    align-items: center;
    justify-content: space-between;
    height: 72px;
    position: relative;
  }

  .tv-nav {
    display: flex;
    gap: 36px;
    align-items: center;
  }

  .tv-nav-link {
    font-family: 'Cinzel', serif;
    font-size: 11px;
    letter-spacing: 3px;
    text-transform: uppercase;
    color: #9a8a6a;
    text-decoration: none;
    transition: color 0.3s;
    position: relative;
    background: none;
    border: none;
    cursor: pointer;
    padding: 0;
  }
  .tv-nav-link:hover { color: #c9a227; }
  .tv-nav-link.active { color: #c9a227; }
  .tv-nav-link.active::after {
    content: '';
    position: absolute;
    bottom: -6px; left: 0;
    height: 1px;
    background: #c9a227;
    width: 100%;
  }

  .tv-nav-divider { color: #7a6018; font-size: 8px; }

  .tv-logo { text-align: center; text-decoration: none; cursor: pointer; }
  .tv-logo-main {
    font-family: 'Cinzel Decorative', serif;
    font-size: 20px;
    font-weight: 700;
    color: #c9a227;
    letter-spacing: 4px;
    display: block;
    line-height: 1;
    text-shadow: 0 0 30px rgba(201,162,39,0.3);
  }
  .tv-logo-sub {
    font-family: 'Cinzel', serif;
    font-size: 9px;
    letter-spacing: 6px;
    color: #9a8a6a;
    display: block;
    margin-top: 4px;
    text-transform: uppercase;
  }

  /* HERO */
  .tv-hero {
    position: relative;
    z-index: 1;
    text-align: center;
    padding: 80px 48px 60px;
    overflow: hidden;
  }

  .tv-hero-glow {
    position: absolute;
    top: 0; left: 50%;
    transform: translateX(-50%);
    width: 600px; height: 400px;
    background: radial-gradient(ellipse, rgba(201,162,39,0.08) 0%, transparent 70%);
    pointer-events: none;
  }

  .tv-hero-ornament {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 20px;
    margin-bottom: 28px;
  }

  .tv-orn-line {
    height: 1px;
    width: 120px;
    background: linear-gradient(90deg, transparent, #7a6018);
  }
  .tv-orn-line-r { background: linear-gradient(270deg, transparent, #7a6018); }

  .tv-orn-symbol {
    font-size: 20px;
    color: #c9a227;
    text-shadow: 0 0 20px rgba(201,162,39,0.5);
  }

  .tv-hero-eyebrow {
    font-family: 'Cinzel', serif;
    font-size: 10px;
    letter-spacing: 8px;
    color: #c9a227;
    text-transform: uppercase;
    margin-bottom: 20px;
  }

  .tv-hero-h1 {
    font-family: 'Cinzel Decorative', serif;
    font-size: clamp(36px, 6vw, 72px);
    font-weight: 400;
    color: #f0e6c8;
    letter-spacing: 4px;
    line-height: 1.1;
    margin-bottom: 16px;
  }
  .tv-hero-h1 span { color: #c9a227; }

  .tv-hero-tagline {
    font-family: 'Cormorant Garamond', serif;
    font-style: italic;
    font-size: 18px;
    color: #9a8a6a;
    letter-spacing: 2px;
  }

  /* ORNAMENT DIVIDER */
  .tv-divider {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 16px;
    margin: 0 48px;
    opacity: 0.4;
    position: relative;
    z-index: 1;
  }
  .tv-divider-line {
    flex: 1;
    height: 1px;
    background: linear-gradient(90deg, transparent, #c9a227);
  }
  .tv-divider-line-r { background: linear-gradient(270deg, transparent, #c9a227); }
  .tv-divider-symbols {
    color: #7a6018;
    font-size: 12px;
    letter-spacing: 8px;
    font-family: 'Cinzel', serif;
  }

  /* SECTION */
  .tv-section {
    position: relative;
    z-index: 1;
    padding: 64px 48px;
  }

  .tv-section-heading { text-align: center; margin-bottom: 48px; }

  .tv-section-ornament {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 16px;
    margin-bottom: 12px;
  }

  .tv-title-line {
    height: 1px;
    width: 80px;
    background: linear-gradient(90deg, transparent, #7a6018);
  }
  .tv-title-line-r { background: linear-gradient(270deg, transparent, #7a6018); }

  .tv-section-title {
    font-family: 'Cinzel', serif;
    font-size: 22px;
    font-weight: 700;
    letter-spacing: 6px;
    text-transform: uppercase;
    color: #c9a227;
  }

  .tv-section-subtitle {
    font-family: 'Cormorant Garamond', serif;
    font-style: italic;
    font-size: 14px;
    color: #9a8a6a;
    letter-spacing: 2px;
    margin-top: 6px;
  }

  /* TIER LIST */
  .tv-tier-list { max-width: 1000px; margin: 0 auto; }

  .tv-tier-row {
    display: flex;
    align-items: stretch;
    margin-bottom: 2px;
    border: 1px solid #2e2416;
    background: #181410;
    transition: border-color 0.3s;
    position: relative;
    overflow: hidden;
  }
  .tv-tier-row::before {
    content: '';
    position: absolute;
    left: 0; top: 0; bottom: 0;
    width: 3px;
  }
  .tv-tier-row:hover { border-color: #7a6018; }

  .tv-tier-s::before { background: #e8c84a; box-shadow: 2px 0 12px rgba(232,200,74,0.4); }
  .tv-tier-a::before { background: #c0997a; }
  .tv-tier-b::before { background: #8aabb0; }
  .tv-tier-c::before { background: #8a9a7a; }
  .tv-tier-d::before { background: #7a7a9a; }

  .tv-tier-label {
    width: 80px;
    min-height: 90px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 4px;
    border-right: 1px solid #2e2416;
    padding: 16px;
    flex-shrink: 0;
  }

  .tv-tier-letter {
    font-family: 'Cinzel', serif;
    font-size: 28px;
    font-weight: 700;
    line-height: 1;
  }
  .tv-tier-text {
    font-family: 'Cormorant Garamond', serif;
    font-size: 9px;
    letter-spacing: 2px;
    text-transform: uppercase;
    opacity: 0.6;
  }

  .tv-tier-s .tv-tier-letter { color: #e8c84a; text-shadow: 0 0 15px rgba(232,200,74,0.5); }
  .tv-tier-a .tv-tier-letter { color: #c0997a; }
  .tv-tier-b .tv-tier-letter { color: #8aabb0; }
  .tv-tier-c .tv-tier-letter { color: #8a9a7a; }

  .tv-tier-chars {
    display: flex;
    flex-wrap: wrap;
    gap: 10px;
    padding: 16px 20px;
    align-items: center;
  }

  .tv-char-chip {
    display: flex;
    align-items: center;
    gap: 10px;
    padding: 8px 14px 8px 8px;
    background: #1f1a14;
    border: 1px solid #2e2416;
    cursor: pointer;
    transition: all 0.3s;
  }
  .tv-char-chip:hover {
    border-color: #7a6018;
    background: rgba(201,162,39,0.05);
  }

  .tv-char-avatar {
    width: 40px; height: 40px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 20px;
    border-radius: 1px;
    flex-shrink: 0;
  }

  .tv-char-name {
    font-family: 'Cinzel', serif;
    font-size: 11px;
    font-weight: 600;
    letter-spacing: 2px;
    color: #f0e6c8;
    text-transform: uppercase;
  }
  .tv-char-element {
    font-family: 'Cormorant Garamond', serif;
    font-style: italic;
    font-size: 11px;
    color: #9a8a6a;
  }

  /* CHARACTER GRID */
  .tv-char-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
    gap: 20px;
    max-width: 1200px;
    margin: 0 auto;
  }

  .tv-char-card {
    background: #181410;
    border: 1px solid #2e2416;
    cursor: pointer;
    transition: all 0.4s;
    position: relative;
    overflow: hidden;
  }
  .tv-char-card:hover {
    border-color: #7a6018;
    transform: translateY(-3px);
    box-shadow: 0 10px 40px rgba(0,0,0,0.5), 0 0 20px rgba(201,162,39,0.1);
  }

  .tv-card-art {
    height: 130px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 56px;
    position: relative;
  }
  .tv-card-art::after {
    content: '';
    position: absolute;
    bottom: 0; left: 0; right: 0;
    height: 50px;
    background: linear-gradient(transparent, #181410);
  }

  .tv-card-stars {
    position: absolute;
    top: 8px; right: 8px;
    font-size: 8px;
    color: #c9a227;
  }

  .tv-card-body { padding: 16px; }

  .tv-card-name {
    font-family: 'Cinzel', serif;
    font-size: 13px;
    font-weight: 700;
    letter-spacing: 2px;
    color: #f0e6c8;
    margin-bottom: 8px;
  }

  .tv-card-meta {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }

  .tv-element-badge {
    font-family: 'Cormorant Garamond', serif;
    font-style: italic;
    font-size: 12px;
    padding: 2px 8px;
    border: 1px solid #2e2416;
  }

  .tv-tier-badge {
    font-family: 'Cinzel', serif;
    font-size: 10px;
    font-weight: 600;
    letter-spacing: 1px;
  }

  .tv-badge-s { color: #e8c84a; }
  .tv-badge-a { color: #c0997a; }
  .tv-badge-b { color: #8aabb0; }

  .tv-pyro-el  { background: rgba(255,100,50,0.1); border-color: rgba(255,100,50,0.3); color: #ff8060; }
  .tv-hydro-el { background: rgba(50,150,255,0.1); border-color: rgba(50,150,255,0.3); color: #60a0ff; }
  .tv-cryo-el  { background: rgba(100,200,255,0.1); border-color: rgba(100,200,255,0.3); color: #80d0ff; }
  .tv-electro-el { background: rgba(170,100,255,0.1); border-color: rgba(170,100,255,0.3); color: #c080ff; }
  .tv-anemo-el { background: rgba(80,200,160,0.1); border-color: rgba(80,200,160,0.3); color: #60d0a0; }
  .tv-geo-el   { background: rgba(255,180,0,0.1); border-color: rgba(255,180,0,0.3); color: #ffc040; }
  .tv-dendro-el { background: rgba(100,200,50,0.1); border-color: rgba(100,200,50,0.3); color: #80c040; }

  /* FILTER BAR */
  .tv-filter-bar {
    display: flex;
    justify-content: center;
    gap: 4px;
    flex-wrap: wrap;
    margin-bottom: 40px;
  }

  .tv-filter-btn {
    font-family: 'Cinzel', serif;
    font-size: 9px;
    letter-spacing: 3px;
    text-transform: uppercase;
    padding: 7px 18px;
    background: transparent;
    border: 1px solid #2e2416;
    color: #9a8a6a;
    cursor: pointer;
    transition: all 0.3s;
  }
  .tv-filter-btn:hover {
    border-color: #7a6018;
    color: #c9a227;
    background: rgba(201,162,39,0.05);
  }
  .tv-filter-btn.active {
    border-color: #7a6018;
    color: #c9a227;
    background: rgba(201,162,39,0.05);
  }

  /* FOOTER */
  .tv-footer {
    position: relative;
    z-index: 1;
    border-top: 1px solid #2e2416;
    padding: 48px;
    text-align: center;
  }

  .tv-footer-ornament {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 16px;
    margin-bottom: 20px;
    color: #7a6018;
    font-size: 12px;
    letter-spacing: 10px;
  }

  .tv-footer p {
    font-family: 'Cinzel', serif;
    font-size: 9px;
    letter-spacing: 4px;
    color: #9a8a6a;
    text-transform: uppercase;
    opacity: 0.5;
  }
  .tv-footer p + p { margin-top: 8px; }
`;

// ── Data ──────────────────────────────────────────────────────────────────────

const TIERS = [
  {
    tier: "S", label: "Legendary", cls: "tv-tier-s",
    chars: [
      { name: "Hu Tao",      element: "Pyro",    weapon: "Polearm",  icon: "🔥", bg: "rgba(255,80,30,0.15)"   },
      { name: "Furina",      element: "Hydro",   weapon: "Sword",    icon: "💧", bg: "rgba(40,120,255,0.15)"  },
      { name: "Raiden Shogun", element: "Electro", weapon: "Polearm", icon: "⚡", bg: "rgba(150,80,255,0.15)" },
      { name: "Neuvillette", element: "Hydro",   weapon: "Catalyst", icon: "💧", bg: "rgba(40,160,255,0.15)"  },
      { name: "Kazuha",      element: "Anemo",   weapon: "Sword",    icon: "🌊", bg: "rgba(60,180,130,0.15)"  },
      { name: "Nahida",      element: "Dendro",  weapon: "Catalyst", icon: "🌿", bg: "rgba(60,180,30,0.15)"   },
    ]
  },
  {
    tier: "A", label: "Superior", cls: "tv-tier-a",
    chars: [
      { name: "Zhongli",   element: "Geo",     weapon: "Polearm", icon: "🪨", bg: "rgba(200,140,0,0.15)"   },
      { name: "Xiangling", element: "Pyro",    weapon: "Polearm", icon: "🔥", bg: "rgba(255,80,30,0.15)"   },
      { name: "Yelan",     element: "Hydro",   weapon: "Bow",     icon: "💧", bg: "rgba(40,120,255,0.15)"  },
      { name: "Shenhe",    element: "Cryo",    weapon: "Polearm", icon: "❄️", bg: "rgba(80,200,255,0.15)"  },
      { name: "Fischl",    element: "Electro", weapon: "Bow",     icon: "⚡", bg: "rgba(150,80,255,0.15)"  },
      { name: "Venti",     element: "Anemo",   weapon: "Bow",     icon: "🌊", bg: "rgba(60,180,130,0.15)"  },
    ]
  },
  {
    tier: "B", label: "Capable", cls: "tv-tier-b",
    chars: [
      { name: "Diluc",        element: "Pyro",  weapon: "Claymore", icon: "🔥", bg: "rgba(255,80,30,0.15)"  },
      { name: "Ganyu",        element: "Cryo",  weapon: "Bow",      icon: "❄️", bg: "rgba(80,200,255,0.15)" },
      { name: "Mona",         element: "Hydro", weapon: "Catalyst", icon: "💧", bg: "rgba(40,120,255,0.15)" },
      { name: "Arataki Itto", element: "Geo",   weapon: "Claymore", icon: "🪨", bg: "rgba(200,140,0,0.15)"  },
    ]
  },
  {
    tier: "C", label: "Average", cls: "tv-tier-c",
    chars: [
      { name: "Amber",  element: "Pyro", weapon: "Bow",     icon: "🔥", bg: "rgba(255,80,30,0.15)"  },
      { name: "Noelle", element: "Geo",  weapon: "Claymore",icon: "🪨", bg: "rgba(200,140,0,0.15)"  },
    ]
  },
];

const CHARACTERS = [
  { name: "Hu Tao",      element: "Pyro",    stars: 5, tier: "S", icon: "🔥", cardBg: "linear-gradient(160deg,#1a0800,#330d00)", badgeCls: "tv-badge-s", elCls: "tv-pyro-el"    },
  { name: "Furina",      element: "Hydro",   stars: 5, tier: "S", icon: "💧", cardBg: "linear-gradient(160deg,#00091a,#001433)", badgeCls: "tv-badge-s", elCls: "tv-hydro-el"   },
  { name: "Raiden Shogun",element:"Electro", stars: 5, tier: "S", icon: "⚡", cardBg: "linear-gradient(160deg,#08001a,#150033)", badgeCls: "tv-badge-s", elCls: "tv-electro-el" },
  { name: "Neuvillette", element: "Hydro",   stars: 5, tier: "S", icon: "💧", cardBg: "linear-gradient(160deg,#001020,#002040)", badgeCls: "tv-badge-s", elCls: "tv-hydro-el"   },
  { name: "Kazuha",      element: "Anemo",   stars: 5, tier: "S", icon: "🌊", cardBg: "linear-gradient(160deg,#001a12,#003020)", badgeCls: "tv-badge-s", elCls: "tv-anemo-el"   },
  { name: "Nahida",      element: "Dendro",  stars: 5, tier: "S", icon: "🌿", cardBg: "linear-gradient(160deg,#001200,#002a00)", badgeCls: "tv-badge-s", elCls: "tv-dendro-el"  },
  { name: "Zhongli",     element: "Geo",     stars: 5, tier: "A", icon: "🪨", cardBg: "linear-gradient(160deg,#141000,#2a2000)", badgeCls: "tv-badge-a", elCls: "tv-geo-el"     },
  { name: "Shenhe",      element: "Cryo",    stars: 5, tier: "A", icon: "❄️", cardBg: "linear-gradient(160deg,#001422,#002a44)", badgeCls: "tv-badge-a", elCls: "tv-cryo-el"    },
  { name: "Xiangling",   element: "Pyro",    stars: 4, tier: "A", icon: "🔥", cardBg: "linear-gradient(160deg,#1a0800,#330d00)", badgeCls: "tv-badge-a", elCls: "tv-pyro-el"    },
  { name: "Yelan",       element: "Hydro",   stars: 5, tier: "A", icon: "💧", cardBg: "linear-gradient(160deg,#001020,#002040)", badgeCls: "tv-badge-a", elCls: "tv-hydro-el"   },
  { name: "Fischl",      element: "Electro", stars: 4, tier: "A", icon: "⚡", cardBg: "linear-gradient(160deg,#08001a,#150033)", badgeCls: "tv-badge-a", elCls: "tv-electro-el" },
  { name: "Venti",       element: "Anemo",   stars: 5, tier: "A", icon: "🌊", cardBg: "linear-gradient(160deg,#001a12,#003020)", badgeCls: "tv-badge-a", elCls: "tv-anemo-el"   },
  { name: "Diluc",       element: "Pyro",    stars: 5, tier: "B", icon: "🔥", cardBg: "linear-gradient(160deg,#1a0800,#330d00)", badgeCls: "tv-badge-b", elCls: "tv-pyro-el"    },
  { name: "Ganyu",       element: "Cryo",    stars: 5, tier: "B", icon: "❄️", cardBg: "linear-gradient(160deg,#001422,#002a44)", badgeCls: "tv-badge-b", elCls: "tv-cryo-el"    },
  { name: "Mona",        element: "Hydro",   stars: 5, tier: "B", icon: "💧", cardBg: "linear-gradient(160deg,#001020,#002040)", badgeCls: "tv-badge-b", elCls: "tv-hydro-el"   },
];

const FILTERS = ["All Characters","🔥 Pyro","💧 Hydro","❄️ Cryo","⚡ Electro","🌊 Anemo","🪨 Geo","🌿 Dendro"];
const NAV_LEFT  = ["Tier List","Characters","Builds"];
const NAV_RIGHT = ["Artifacts","Weapons","Lore"];

// ── Sub-components ────────────────────────────────────────────────────────────

function OrnamentDivider() {
  return (
    <div className="tv-divider">
      <div className="tv-divider-line" />
      <span className="tv-divider-symbols">✦ ✦ ✦</span>
      <div className="tv-divider-line tv-divider-line-r" />
    </div>
  );
}

function SectionHeading({ title, subtitle }) {
  return (
    <div className="tv-section-heading">
      <div className="tv-section-ornament">
        <div className="tv-title-line" />
        <div className="tv-section-title">{title}</div>
        <div className="tv-title-line tv-title-line-r" />
      </div>
      <div className="tv-section-subtitle">{subtitle}</div>
    </div>
  );
}

function CharChip({ char }) {
  return (
    <div className="tv-char-chip">
      <div className="tv-char-avatar" style={{ background: char.bg }}>{char.icon}</div>
      <div>
        <div className="tv-char-name">{char.name}</div>
        <div className="tv-char-element">{char.element} · {char.weapon}</div>
      </div>
    </div>
  );
}

function TierRow({ data }) {
  return (
    <div className={`tv-tier-row ${data.cls}`}>
      <div className="tv-tier-label">
        <span className="tv-tier-letter">{data.tier}</span>
        <span className="tv-tier-text">{data.label}</span>
      </div>
      <div className="tv-tier-chars">
        {data.chars.map(c => <CharChip key={c.name} char={c} />)}
      </div>
    </div>
  );
}

function CharCard({ char }) {
  return (
    <div className="tv-char-card">
      <div className="tv-card-art" style={{ background: char.cardBg }}>
        {char.icon}
        <div className="tv-card-stars">{"★".repeat(char.stars)}</div>
      </div>
      <div className="tv-card-body">
        <div className="tv-card-name">{char.name}</div>
        <div className="tv-card-meta">
          <span className={`tv-element-badge ${char.elCls}`}>{char.element}</span>
          <span className={`tv-tier-badge ${char.badgeCls}`}>{char.tier} Tier</span>
        </div>
      </div>
    </div>
  );
}

// ── Main App ──────────────────────────────────────────────────────────────────

export default function TeyvatChronicle() {
  const [activeFilter, setActiveFilter] = useState("All Characters");
  const [activeNav, setActiveNav] = useState("Tier List");

  const filteredChars = activeFilter === "All Characters"
    ? CHARACTERS
    : CHARACTERS.filter(c => activeFilter.includes(c.element));

  return (
    <>
      <style>{styles}</style>
      <div className="teyvatApp">

        {/* HEADER */}
        <header className="tv-header">
          <div className="tv-header-inner">
            <nav className="tv-nav">
              {NAV_LEFT.map((item, i) => (
                <span key={item}>
                  <button
                    className={`tv-nav-link ${activeNav === item ? "active" : ""}`}
                    onClick={() => setActiveNav(item)}
                  >{item}</button>
                  {i < NAV_LEFT.length - 1 && <span className="tv-nav-divider">✦</span>}
                </span>
              ))}
            </nav>

            <a className="tv-logo" href="#">
              <span className="tv-logo-main">Teyvat</span>
              <span className="tv-logo-sub">Chronicle</span>
            </a>

            <nav className="tv-nav">
              {NAV_RIGHT.map((item, i) => (
                <span key={item}>
                  <button
                    className={`tv-nav-link ${activeNav === item ? "active" : ""}`}
                    onClick={() => setActiveNav(item)}
                  >{item}</button>
                  {i < NAV_RIGHT.length - 1 && <span className="tv-nav-divider">✦</span>}
                </span>
              ))}
            </nav>
          </div>
        </header>

        {/* HERO */}
        <section className="tv-hero">
          <div className="tv-hero-glow" />
          <div className="tv-hero-eyebrow">Version 4.6 · Natlan Update</div>
          <div className="tv-hero-ornament">
            <div className="tv-orn-line" />
            <div className="tv-orn-symbol">✦</div>
            <div className="tv-orn-line tv-orn-line-r" />
          </div>
          <h1 className="tv-hero-h1">
            Genshin<br /><span>Impact</span>
          </h1>
          <p className="tv-hero-tagline">The complete traveler's compendium of Teyvat</p>
        </section>

        <OrnamentDivider />

        {/* TIER LIST */}
        <section className="tv-section">
          <SectionHeading
            title="Tier List"
            subtitle="Current meta ranking for Version 4.6"
          />
          <div className="tv-tier-list">
            {TIERS.map(t => <TierRow key={t.tier} data={t} />)}
          </div>
        </section>

        <OrnamentDivider />

        {/* CHARACTERS */}
        <section className="tv-section">
          <SectionHeading
            title="Characters"
            subtitle="All known wielders of Visions across Teyvat"
          />

          <div className="tv-filter-bar">
            {FILTERS.map(f => (
              <button
                key={f}
                className={`tv-filter-btn ${activeFilter === f ? "active" : ""}`}
                onClick={() => setActiveFilter(f)}
              >{f}</button>
            ))}
          </div>

          <div className="tv-char-grid">
            {filteredChars.map(c => <CharCard key={c.name} char={c} />)}
          </div>
        </section>

        {/* FOOTER */}
        <footer className="tv-footer">
          <div className="tv-footer-ornament">✦ ✦ ✦ ✦ ✦</div>
          <p>Teyvat Chronicle — A fan-made compendium</p>
          <p>Genshin Impact™ is a trademark of HoYoverse. All rights reserved.</p>
        </footer>

      </div>
    </>
  );
}

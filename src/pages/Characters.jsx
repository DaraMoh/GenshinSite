import { useState } from 'react';
import { characters } from '../data/characters';

const ELEMENTS = ['All', 'Pyro', 'Hydro', 'Cryo', 'Electro', 'Anemo', 'Geo', 'Dendro'];
const WEAPONS = ['All', 'Sword', 'Claymore', 'Polearm', 'Bow', 'Catalyst'];
const RARITIES = ['All', '5', '4'];

function CharCard({ character }) {
  const elClass = character.element.toLowerCase();
  return (
    <div
      className="transition-all duration-400"
      style={{
        background: '#181410',
        border: '1px solid #2e2416',
        cursor: 'pointer',
        position: 'relative',
        overflow: 'hidden',
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.borderColor = '#b89830';
        e.currentTarget.style.transform = 'translateY(-3px)';
        e.currentTarget.style.boxShadow = '0 10px 40px rgba(0,0,0,0.5), 0 0 20px rgba(201,162,39,0.1)';
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.borderColor = '#2e2416';
        e.currentTarget.style.transform = 'translateY(0)';
        e.currentTarget.style.boxShadow = 'none';
      }}
    >
      <div
        className={`el-bg-${elClass}`}
        style={{
          height: '130px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          position: 'relative',
        }}
      >
        {character.image && (
          <img
            src={character.image}
            alt={character.name}
            style={{ width: '80px', height: '80px', objectFit: 'cover', borderRadius: '4px', position: 'relative', zIndex: 1 }}
            loading="lazy"
          />
        )}
        <div
          style={{
            position: 'absolute',
            top: '8px',
            right: '8px',
            fontSize: '10px',
            color: '#e8d068',
            zIndex: 1,
          }}
        >
          {'★'.repeat(character.rarity)}
        </div>
        <div
          style={{
            position: 'absolute',
            bottom: 0, left: 0, right: 0,
            height: '50px',
            background: 'linear-gradient(transparent, #181410)',
          }}
        />
      </div>

      <div style={{ padding: '16px' }}>
        <div
          style={{
            fontFamily: "'Cinzel', serif",
            fontSize: '16px',
            fontWeight: 700,
            letterSpacing: '2px',
            color: '#f0e6c8',
            marginBottom: '8px',
          }}
        >
          {character.name}
        </div>
        <div className="flex items-center justify-between">
          <span className={`el-${elClass}`} style={{ fontFamily: "'Inter', sans-serif", fontSize: '13px', fontWeight: 500, padding: '2px 8px', border: '1px solid' }}>
            {character.element}
          </span>
          <span style={{ fontFamily: "'Inter', sans-serif", fontSize: '13px', fontWeight: 500, color: '#c4b48a' }}>
            {character.weapon}
          </span>
        </div>
      </div>
    </div>
  );
}

function FilterRow({ label, options, value, onChange, renderOption }) {
  return (
    <div className="flex items-center gap-3 flex-wrap justify-center">
      <span style={{ fontFamily: "'Inter', sans-serif", fontSize: '13px', fontWeight: 600, letterSpacing: '2px', textTransform: 'uppercase', color: '#c4b48a', minWidth: '60px' }}>
        {label}
      </span>
      <div className="flex gap-1 flex-wrap">
        {options.map((opt) => (
          <button
            key={opt}
            onClick={() => onChange(opt)}
            style={{
              fontFamily: "'Inter', sans-serif",
              fontSize: '13px',
              fontWeight: value === opt ? 600 : 400,
              letterSpacing: '1px',
              padding: '5px 14px',
              background: value === opt ? 'rgba(201,162,39,0.05)' : 'transparent',
              border: `1px solid ${value === opt ? '#b89830' : '#2e2416'}`,
              color: value === opt ? '#e8d068' : '#c4b48a',
              cursor: 'pointer',
              transition: 'all 0.3s',
            }}
            onMouseEnter={(e) => {
              if (value !== opt) {
                e.currentTarget.style.borderColor = '#b89830';
                e.currentTarget.style.color = '#e8d068';
              }
            }}
            onMouseLeave={(e) => {
              if (value !== opt) {
                e.currentTarget.style.borderColor = '#2e2416';
                e.currentTarget.style.color = '#c4b48a';
              }
            }}
          >
            {renderOption ? renderOption(opt) : opt}
          </button>
        ))}
      </div>
    </div>
  );
}

export default function Characters() {
  const [elementFilter, setElementFilter] = useState('All');
  const [weaponFilter, setWeaponFilter] = useState('All');
  const [rarityFilter, setRarityFilter] = useState('All');
  const [search, setSearch] = useState('');

  const filteredCharacters = characters.filter((char) => {
    const matchesElement = elementFilter === 'All' || char.element === elementFilter;
    const matchesWeapon = weaponFilter === 'All' || char.weapon === weaponFilter;
    const matchesRarity = rarityFilter === 'All' || char.rarity === parseInt(rarityFilter);
    const matchesSearch = char.name.toLowerCase().includes(search.toLowerCase());
    return matchesElement && matchesWeapon && matchesRarity && matchesSearch;
  });

  return (
    <div className="relative z-[1] min-h-screen">
      <section className="relative py-16 px-6 md:px-12">
        {/* Section heading */}
        <div className="text-center mb-12">
          <div className="flex items-center justify-center gap-4 mb-3">
            <div style={{ height: '1px', width: '80px', background: 'linear-gradient(90deg, transparent, #b89830)' }} />
            <div
              style={{
                fontFamily: "'Cinzel', serif",
                fontSize: '28px',
                fontWeight: 700,
                letterSpacing: '6px',
                textTransform: 'uppercase',
                color: '#e8d068',
              }}
            >
              Characters
            </div>
            <div style={{ height: '1px', width: '80px', background: 'linear-gradient(270deg, transparent, #b89830)' }} />
          </div>
          <div style={{ fontFamily: "'Cormorant Garamond', serif", fontStyle: 'italic', fontSize: '17px', color: '#c4b48a', letterSpacing: '2px' }}>
            Playable Characters in Genshin Impact
          </div>
        </div>

        {/* Search */}
        <div className="max-w-md mx-auto mb-8">
          <input
            type="text"
            placeholder="Search by name..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            style={{
              width: '100%',
              padding: '10px 20px',
              background: '#181410',
              border: '1px solid #2e2416',
              color: '#f0e6c8',
              fontFamily: "'Inter', sans-serif",
              fontSize: '15px',
              outline: 'none',
              transition: 'border-color 0.3s',
            }}
            onFocus={(e) => { e.target.style.borderColor = '#b89830'; }}
            onBlur={(e) => { e.target.style.borderColor = '#2e2416'; }}
          />
        </div>

        {/* Filters */}
        <div className="space-y-3 mb-10">
          <FilterRow label="Element" options={ELEMENTS} value={elementFilter} onChange={setElementFilter} />
          <FilterRow label="Weapon" options={WEAPONS} value={weaponFilter} onChange={setWeaponFilter} />
          <FilterRow label="Rarity" options={RARITIES} value={rarityFilter} onChange={setRarityFilter} renderOption={(opt) => opt === 'All' ? 'All' : `${opt}★`} />
        </div>

        {/* Results count */}
        <div className="text-center mb-8">
          <span style={{ fontFamily: "'Inter', sans-serif", fontSize: '14px', color: '#c4b48a' }}>
            Showing {filteredCharacters.length} character{filteredCharacters.length !== 1 ? 's' : ''}
          </span>
        </div>

        {/* Character grid */}
        <div
          className="max-w-[1200px] mx-auto"
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))',
            gap: '20px',
          }}
        >
          {filteredCharacters.map((character) => (
            <CharCard key={character.id} character={character} />
          ))}
        </div>

        {filteredCharacters.length === 0 && (
          <div className="text-center py-20">
            <div style={{ fontFamily: "'Cinzel', serif", fontSize: '16px', color: '#c4b48a', letterSpacing: '3px' }}>
              No characters found
            </div>
          </div>
        )}
      </section>
    </div>
  );
}

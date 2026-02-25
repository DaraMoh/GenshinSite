import { useState } from 'react';
import { useDroppable } from '@dnd-kit/core';
import { SortableContext, rectSortingStrategy } from '@dnd-kit/sortable';
import DraggableCharacter from './DraggableCharacter';
import { characters } from '../data/characters';

const ELEMENTS = ['All', 'Pyro', 'Hydro', 'Cryo', 'Electro', 'Anemo', 'Geo', 'Dendro'];
const WEAPONS = ['All', 'Sword', 'Claymore', 'Polearm', 'Bow', 'Catalyst'];
const RARITIES = ['All', '5', '4'];

function FilterPill({ label, active, onClick }) {
  return (
    <button
      onClick={onClick}
      style={{
        fontFamily: "'Inter', sans-serif",
        fontSize: '9px',
        fontWeight: active ? 600 : 400,
        letterSpacing: '1px',
        padding: '3px 10px',
        background: active ? 'rgba(201,162,39,0.05)' : 'transparent',
        border: `1px solid ${active ? '#b89830' : '#2e2416'}`,
        color: active ? '#e8d068' : '#c4b48a',
        cursor: 'pointer',
        transition: 'all 0.3s',
      }}
      onMouseEnter={(e) => {
        if (!active) {
          e.currentTarget.style.borderColor = '#b89830';
          e.currentTarget.style.color = '#e8d068';
        }
      }}
      onMouseLeave={(e) => {
        if (!active) {
          e.currentTarget.style.borderColor = '#2e2416';
          e.currentTarget.style.color = '#c4b48a';
        }
      }}
    >
      {label}
    </button>
  );
}

export default function CharacterPool({ characterIds }) {
  const { setNodeRef, isOver } = useDroppable({ id: 'unranked' });
  const [elementFilter, setElementFilter] = useState('All');
  const [weaponFilter, setWeaponFilter] = useState('All');
  const [rarityFilter, setRarityFilter] = useState('All');
  const [search, setSearch] = useState('');

  // Filter the visible characters but keep all IDs in the sortable context
  const visibleIds = characterIds.filter((id) => {
    const char = characters.find((c) => c.id === id);
    if (!char) return false;
    const matchesElement = elementFilter === 'All' || char.element === elementFilter;
    const matchesWeapon = weaponFilter === 'All' || char.weapon === weaponFilter;
    const matchesRarity = rarityFilter === 'All' || char.rarity === parseInt(rarityFilter);
    const matchesSearch = !search || char.name.toLowerCase().includes(search.toLowerCase());
    return matchesElement && matchesWeapon && matchesRarity && matchesSearch;
  });

  return (
    <div
      style={{
        background: '#181410',
        border: isOver ? '1px solid #b89830' : '1px solid #2e2416',
        padding: '24px',
        transition: 'all 0.3s',
      }}
    >
      <div className="flex items-center justify-between mb-4">
        <div>
          <h2 style={{ fontFamily: "'Cinzel', serif", fontSize: '16px', fontWeight: 700, letterSpacing: '4px', color: '#e8d068', textTransform: 'uppercase' }}>
            Character Pool
          </h2>
          <p style={{ fontFamily: "'Cormorant Garamond', serif", fontStyle: 'italic', fontSize: '13px', color: '#c4b48a', marginTop: '4px' }}>
            Drag characters from here to rank them
          </p>
        </div>
        <span style={{ fontFamily: "'Inter', sans-serif", fontSize: '12px', color: '#c4b48a' }}>
          {visibleIds.length} / {characterIds.length} unranked
        </span>
      </div>

      {/* Filters */}
      <div className="mb-4 space-y-2" style={{ borderBottom: '1px solid #2e2416', paddingBottom: '12px' }}>
        {/* Search */}
        <input
          type="text"
          placeholder="Search..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          style={{
            width: '100%',
            maxWidth: '280px',
            padding: '6px 12px',
            background: '#0a0807',
            border: '1px solid #2e2416',
            color: '#f0e6c8',
            fontFamily: "'Inter', sans-serif",
            fontSize: '12px',
            outline: 'none',
            transition: 'border-color 0.3s',
            marginBottom: '8px',
          }}
          onFocus={(e) => { e.target.style.borderColor = '#b89830'; }}
          onBlur={(e) => { e.target.style.borderColor = '#2e2416'; }}
        />
        <div className="flex items-center gap-2 flex-wrap">
          <span style={{ fontFamily: "'Inter', sans-serif", fontSize: '9px', fontWeight: 600, letterSpacing: '2px', textTransform: 'uppercase', color: '#c4b48a' }}>
            Element
          </span>
          {ELEMENTS.map((el) => (
            <FilterPill key={el} label={el} active={elementFilter === el} onClick={() => setElementFilter(el)} />
          ))}
        </div>
        <div className="flex items-center gap-2 flex-wrap">
          <span style={{ fontFamily: "'Inter', sans-serif", fontSize: '9px', fontWeight: 600, letterSpacing: '2px', textTransform: 'uppercase', color: '#c4b48a' }}>
            Weapon
          </span>
          {WEAPONS.map((w) => (
            <FilterPill key={w} label={w} active={weaponFilter === w} onClick={() => setWeaponFilter(w)} />
          ))}
        </div>
        <div className="flex items-center gap-2 flex-wrap">
          <span style={{ fontFamily: "'Inter', sans-serif", fontSize: '9px', fontWeight: 600, letterSpacing: '2px', textTransform: 'uppercase', color: '#c4b48a' }}>
            Rarity
          </span>
          {RARITIES.map((r) => (
            <FilterPill key={r} label={r === 'All' ? 'All' : `${r}★`} active={rarityFilter === r} onClick={() => setRarityFilter(r)} />
          ))}
        </div>
      </div>

      <div ref={setNodeRef} style={{ minHeight: '200px' }}>
        <SortableContext items={characterIds} strategy={rectSortingStrategy}>
          <div className="flex flex-wrap gap-2.5">
            {characterIds.length === 0 ? (
              <div className="w-full text-center py-12">
                <div style={{ fontFamily: "'Cinzel', serif", fontSize: '16px', color: '#e8d068', letterSpacing: '3px', marginBottom: '8px' }}>
                  All characters ranked
                </div>
                <div style={{ fontFamily: "'Cormorant Garamond', serif", fontStyle: 'italic', fontSize: '14px', color: '#c4b48a' }}>
                  Well done, Traveler
                </div>
              </div>
            ) : visibleIds.length === 0 ? (
              <div className="w-full text-center py-8">
                <div style={{ fontFamily: "'Inter', sans-serif", fontSize: '13px', color: '#c4b48a' }}>
                  No matches for current filters
                </div>
              </div>
            ) : (
              characterIds.map((id) => {
                const character = characters.find((c) => c.id === id);
                if (!character) return null;
                // Hide filtered-out characters but keep them in DOM for drag context
                const isVisible = visibleIds.includes(id);
                return (
                  <div key={id} style={{ display: isVisible ? 'block' : 'none' }}>
                    <DraggableCharacter character={character} />
                  </div>
                );
              })
            )}
          </div>
        </SortableContext>
      </div>
    </div>
  );
}

import { useDroppable } from '@dnd-kit/core';
import { SortableContext, horizontalListSortingStrategy } from '@dnd-kit/sortable';
import DraggableCharacter from './DraggableCharacter';
import { characters } from '../data/characters';

const TIER_META = {
  'S+': { label: '', cls: 'tier-splus' },
  S: { label: '', cls: 'tier-s' },
  'A+': { label: '', cls: 'tier-aplus' },
  A: { label: '', cls: 'tier-a' },
  B: { label: '', cls: 'tier-b' },
  C: { label: '', cls: 'tier-c' },
  D: { label: '', cls: 'tier-d' },
};

export default function TierRow({ tier, characterIds }) {
  const { setNodeRef, isOver } = useDroppable({ id: tier });
  const meta = TIER_META[tier];

  return (
    <div
      className={meta.cls}
      style={{
        display: 'flex',
        alignItems: 'stretch',
        marginBottom: '2px',
        border: isOver ? '1px solid #b89830' : '1px solid #2e2416',
        background: isOver ? 'rgba(201,162,39,0.02)' : '#181410',
        position: 'relative',
        overflow: 'hidden',
        transition: 'all 0.3s',
      }}
    >
      <div
        style={{
          width: '80px',
          minHeight: '90px',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '4px',
          borderRight: '1px solid #2e2416',
          padding: '16px',
          flexShrink: 0,
        }}
      >
        <span className="tier-letter" style={{ fontSize: '34px', fontWeight: 700, lineHeight: 1, fontFamily: "'Cinzel', serif" }}>
          {tier}
        </span>
        <span style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '11px', letterSpacing: '2px', textTransform: 'uppercase', opacity: 0.6, color: '#f0e6c8' }}>
          {meta.label}
        </span>
        <span style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '12px', color: '#c4b48a' }}>
          {characterIds.length}
        </span>
      </div>
      <div ref={setNodeRef} className="flex-1 p-4" style={{ minHeight: '90px' }}>
        <SortableContext items={characterIds} strategy={horizontalListSortingStrategy}>
          <div className="flex flex-wrap gap-2.5">
            {characterIds.length === 0 ? (
              <div style={{ fontStyle: 'italic', color: '#c4b48a', fontSize: '15px', padding: '16px 0' }}>
                {isOver ? 'Drop here...' : 'Drag characters here'}
              </div>
            ) : (
              characterIds.map((id) => {
                const character = characters.find((c) => c.id === id);
                if (!character) return null;
                return <DraggableCharacter key={id} character={character} />;
              })
            )}
          </div>
        </SortableContext>
      </div>
    </div>
  );
}

import { Link } from 'react-router-dom';
import { characters } from '../data/characters';
import { roleTierLists, characterTags } from '../data/tierList';

const TAG_STYLES = {
  Expert: { color: '#ff6868', bg: 'rgba(255,104,104,0.12)', border: '#ff6868' },
  'F2P Friendly': { color: '#68d8ff', bg: 'rgba(104,216,255,0.12)', border: '#68d8ff' },
  Flexible: { color: '#a8e068', bg: 'rgba(168,224,104,0.12)', border: '#a8e068' },
  Niche: { color: '#c4b48a', bg: 'rgba(196,180,138,0.12)', border: '#c4b48a' },
};

const DEFAULT_TAG_STYLE = { color: '#e8d068', bg: 'rgba(232,208,104,0.12)', border: '#e8d068' };

const TIER_META = {
  'S+': { cls: 'tier-splus' },
  S: { cls: 'tier-s' },
  'A+': { cls: 'tier-aplus' },
  A: { cls: 'tier-a' },
  B: { cls: 'tier-b' },
  C: { cls: 'tier-c' },
  D: { cls: 'tier-d' },
};

function SectionHeading({ title, subtitle }) {
  return (
    <div className="text-center mb-12">
      <div className="flex items-center justify-center gap-4 mb-3">
        <div style={{ height: '1px', width: '80px', background: 'linear-gradient(90deg, transparent, #b89830)' }} />
        <div
          style={{
            fontFamily: "'Cinzel', serif",
            fontSize: '22px',
            fontWeight: 700,
            letterSpacing: '6px',
            textTransform: 'uppercase',
            color: '#e8d068',
          }}
        >
          {title}
        </div>
        <div style={{ height: '1px', width: '80px', background: 'linear-gradient(270deg, transparent, #b89830)' }} />
      </div>
      <div style={{ fontFamily: "'Cormorant Garamond', serif", fontStyle: 'italic', fontSize: '14px', color: '#c4b48a', letterSpacing: '2px' }}>
        {subtitle}
      </div>
    </div>
  );
}

function CharChip({ character }) {
  const tags = characterTags[character.id] || [];
  const hasTags = tags.length > 0;

  return (
    <div
      className="relative group"
      style={{ position: 'relative' }}
    >
      <div
        className="flex items-center gap-2 transition-all duration-300"
        style={{
          padding: '5px 8px 5px 5px',
          background: '#1f1a14',
          border: '1px solid #2e2416',
          cursor: 'pointer',
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.borderColor = '#b89830';
          e.currentTarget.style.background = 'rgba(201,162,39,0.05)';
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.borderColor = '#2e2416';
          e.currentTarget.style.background = '#1f1a14';
        }}
      >
        <div
          className={`el-bg-${character.element.toLowerCase()}`}
          style={{ width: '32px', height: '32px', borderRadius: '2px', flexShrink: 0, display: 'flex', alignItems: 'center', justifyContent: 'center' }}
        >
          {character.image && (
            <img src={character.image} alt={character.name} style={{ width: '28px', height: '28px', objectFit: 'cover', borderRadius: '2px' }} loading="lazy" />
          )}
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
          <span style={{ fontFamily: "'Inter', sans-serif", fontSize: '10px', fontWeight: 600, letterSpacing: '0.3px', color: '#f0e6c8', whiteSpace: 'nowrap' }}>
            {character.name}
          </span>
          {hasTags && (
            <span style={{ display: 'flex', flexDirection: 'column', gap: '2px', flexShrink: 0 }}>
              {tags.map((tag) => (
                <span
                  key={tag}
                  style={{ width: '5px', height: '5px', borderRadius: '50%', background: (TAG_STYLES[tag] || DEFAULT_TAG_STYLE).color }}
                />
              ))}
            </span>
          )}
        </div>
      </div>

      {/* Tooltip on hover */}
      {hasTags && (
        <div
          className="invisible group-hover:visible opacity-0 group-hover:opacity-100 transition-all duration-200"
          style={{
            position: 'absolute',
            bottom: '100%',
            left: '50%',
            transform: 'translateX(-50%)',
            marginBottom: '6px',
            zIndex: 100,
            pointerEvents: 'none',
            display: 'flex',
            flexDirection: 'column',
            gap: '3px',
            padding: '6px 8px',
            background: '#0a0807',
            border: '1px solid #2e2416',
            boxShadow: '0 4px 16px rgba(0,0,0,0.6)',
            whiteSpace: 'nowrap',
          }}
        >
          {tags.map((tag) => {
            const s = TAG_STYLES[tag] || DEFAULT_TAG_STYLE;
            return (
              <span
                key={tag}
                style={{
                  fontFamily: "'Inter', sans-serif",
                  fontSize: '9px',
                  fontWeight: 600,
                  letterSpacing: '1px',
                  textTransform: 'uppercase',
                  color: s.color,
                  background: s.bg,
                  border: `1px solid ${s.border}`,
                  padding: '2px 6px',
                }}
              >
                {tag}
              </span>
            );
          })}
        </div>
      )}
    </div>
  );
}

function TierRow({ tier, characterIds }) {
  const meta = TIER_META[tier];
  const chars = characterIds
    .map((id) => characters.find((c) => c.id === id))
    .filter(Boolean);

  return (
    <div
      className={`${meta.cls} flex items-stretch relative transition-all duration-300`}
      style={{ marginBottom: '2px', border: '1px solid #2e2416', background: '#181410' }}
      onMouseEnter={(e) => { e.currentTarget.style.borderColor = '#b89830'; }}
      onMouseLeave={(e) => { e.currentTarget.style.borderColor = '#2e2416'; }}
    >
      <div
        style={{
          width: '40px',
          minHeight: '50px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          borderRight: '1px solid #2e2416',
          flexShrink: 0,
        }}
      >
        <span className="tier-letter" style={{ fontSize: '20px', fontWeight: 700, lineHeight: 1, fontFamily: "'Cinzel', serif" }}>
          {tier}
        </span>
      </div>
      <div className="flex flex-wrap gap-1.5 p-2 items-center flex-1">
        {chars.length === 0 ? (
          <span style={{ fontStyle: 'italic', color: '#c4b48a', fontSize: '11px', padding: '4px' }}>—</span>
        ) : (
          chars.map((c) => <CharChip key={c.id} character={c} />)
        )}
      </div>
    </div>
  );
}

function RoleColumn({ role, tierData }) {
  return (
    <div style={{ background: '#0f0d0a', border: '1px solid #2e2416', padding: '16px' }}>
      <div className="text-center mb-4">
        <div
          style={{
            fontFamily: "'Cinzel', serif",
            fontSize: '14px',
            fontWeight: 700,
            letterSpacing: '3px',
            textTransform: 'uppercase',
            color: '#e8d068',
            marginBottom: '4px',
          }}
        >
          {role}
        </div>
        <div style={{ height: '1px', width: '60px', margin: '0 auto', background: 'linear-gradient(90deg, transparent, #b89830, transparent)' }} />
      </div>
      {['S+', 'S', 'A+', 'A', 'B', 'C', 'D'].map((tier) => (
        <TierRow key={tier} tier={tier} characterIds={tierData[tier] || []} />
      ))}
    </div>
  );
}

export default function TierList() {
  return (
    <div className="relative z-[1] min-h-screen">
      {/* Hero glow */}
      <div
        className="absolute top-0 left-1/2 -translate-x-1/2 pointer-events-none"
        style={{ width: '600px', height: '300px', background: 'radial-gradient(ellipse, rgba(201,162,39,0.06) 0%, transparent 70%)' }}
      />

      <section className="relative py-16 px-6 md:px-12">
        <SectionHeading title="Tier List" subtitle="Current meta ranking by role" />

        <div
          className="max-w-[1400px] mx-auto"
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(4, 1fr)',
            gap: '12px',
          }}
        >
          {Object.entries(roleTierLists).map(([role, tierData]) => (
            <RoleColumn key={role} role={role} tierData={tierData} />
          ))}
        </div>

        {/* Responsive stacked layout for smaller screens */}
        <style>{`
          @media (max-width: 1200px) {
            .max-w-\\[1400px\\] { grid-template-columns: repeat(2, 1fr) !important; }
          }
          @media (max-width: 640px) {
            .max-w-\\[1400px\\] { grid-template-columns: 1fr !important; }
          }
        `}</style>

        <div className="text-center mt-16">
          <Link
            to="/tier-list-maker"
            className="inline-block transition-all duration-300"
            style={{
              fontFamily: "'Cinzel', serif",
              fontSize: '10px',
              letterSpacing: '3px',
              textTransform: 'uppercase',
              padding: '12px 32px',
              background: 'transparent',
              border: '1px solid #b89830',
              color: '#e8d068',
              textDecoration: 'none',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = 'rgba(201,162,39,0.1)';
              e.currentTarget.style.boxShadow = '0 0 15px rgba(201,162,39,0.15)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = 'transparent';
              e.currentTarget.style.boxShadow = 'none';
            }}
          >
            Create Your Own Tier List
          </Link>
        </div>
      </section>
    </div>
  );
}

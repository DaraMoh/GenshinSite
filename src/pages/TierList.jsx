import { useState, createContext, useContext } from 'react';
import { Link } from 'react-router-dom';
import { characters } from '../data/characters';
import { useTierListData } from '../hooks/useTierListData';

const TAG_STYLES = {
  Expert: { color: '#ff6868', bg: 'rgba(255,104,104,0.12)', border: '#ff6868' },
  'F2P Friendly': { color: '#68d8ff', bg: 'rgba(104,216,255,0.12)', border: '#68d8ff' },
  Flexible: { color: '#a8e068', bg: 'rgba(168,224,104,0.12)', border: '#a8e068' },
  Niche: { color: '#c4b48a', bg: 'rgba(196,180,138,0.12)', border: '#c4b48a' },
  Partner: { color: '#d898e8', bg: 'rgba(216,152,232,0.12)', border: '#d898e8' },
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

// Context to pass Supabase data to sub-components without prop drilling
const TierDataContext = createContext(null);

// Renders a tag description string, replacing {{character-id}} with inline character icons
function RichDescription({ text }) {
  const parts = text.split(/(\{\{[^}]+\}\})/g);
  return (
    <span style={{ display: 'inline', alignItems: 'center' }}>
      {parts.map((part, i) => {
        const match = part.match(/^\{\{(.+)\}\}$/);
        if (match) {
          const char = characters.find((c) => c.id === match[1]);
          if (char) {
            return (
              <span key={i} style={{ display: 'inline-flex', alignItems: 'center', gap: '3px', verticalAlign: 'middle' }}>
                <img
                  src={char.image}
                  alt={char.name}
                  style={{ width: '18px', height: '18px', borderRadius: '2px', verticalAlign: 'middle' }}
                  loading="lazy"
                />
                <span style={{ fontWeight: 600, color: '#f0e6c8', fontSize: '13px' }}>{char.name}</span>
              </span>
            );
          }
        }
        return <span key={i}>{part}</span>;
      })}
    </span>
  );
}

function TagDescriptionBox() {
  const [open, setOpen] = useState(false);
  const { tagDescriptions, partnerConnections } = useContext(TierDataContext);

  return (
    <div className="max-w-[1400px] mx-auto mb-8">
      <button
        onClick={() => setOpen(!open)}
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '8px',
          background: '#181410',
          border: '1px solid #2e2416',
          padding: '12px 20px',
          cursor: 'pointer',
          width: '100%',
          transition: 'border-color 0.3s',
        }}
        onMouseEnter={(e) => { e.currentTarget.style.borderColor = '#b89830'; }}
        onMouseLeave={(e) => { e.currentTarget.style.borderColor = '#2e2416'; }}
      >
        <span
          style={{
            fontFamily: "'Cinzel', serif",
            fontSize: '14px',
            fontWeight: 700,
            letterSpacing: '3px',
            textTransform: 'uppercase',
            color: '#e8d068',
          }}
        >
          Tag Descriptions
        </span>
        <span
          style={{
            color: '#c4b48a',
            fontSize: '12px',
            transition: 'transform 0.3s',
            transform: open ? 'rotate(180deg)' : 'rotate(0deg)',
            display: 'inline-block',
          }}
        >
          &#9660;
        </span>
      </button>
      {open && (
        <div
          style={{
            background: '#181410',
            borderLeft: '1px solid #2e2416',
            borderRight: '1px solid #2e2416',
            borderBottom: '1px solid #2e2416',
            padding: '16px 20px',
          }}
        >
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            {Object.entries(tagDescriptions).map(([tag, desc]) => {
              const s = TAG_STYLES[tag] || DEFAULT_TAG_STYLE;
              return (
                <div key={tag} style={{ display: 'flex', alignItems: 'flex-start', gap: '12px' }}>
                  <span
                    style={{
                      fontFamily: "'Inter', sans-serif",
                      fontSize: '11px',
                      fontWeight: 600,
                      letterSpacing: '1px',
                      textTransform: 'uppercase',
                      color: s.color,
                      background: s.bg,
                      border: `1px solid ${s.border}`,
                      padding: '3px 8px',
                      flexShrink: 0,
                      whiteSpace: 'nowrap',
                    }}
                  >
                    <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: s.color, display: 'inline-block', marginRight: '6px', verticalAlign: 'middle' }} />
                    {tag}
                  </span>
                  <span
                    style={{
                      fontFamily: "'Cormorant Garamond', serif",
                      fontSize: '15px',
                      color: '#c4b48a',
                      lineHeight: 1.5,
                    }}
                  >
                    <RichDescription text={desc} />
                  </span>
                </div>
              );
            })}
          </div>

          {/* Partner Connections */}
          {partnerConnections.length > 0 && (
            <div style={{ marginTop: '16px', paddingTop: '16px', borderTop: '1px solid #2e2416' }}>
              <div
                style={{
                  fontFamily: "'Cinzel', serif",
                  fontSize: '13px',
                  fontWeight: 700,
                  letterSpacing: '2px',
                  textTransform: 'uppercase',
                  color: TAG_STYLES.Partner.color,
                  marginBottom: '12px',
                }}
              >
                Partner Connections
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                {partnerConnections.map(([, , desc], i) => (
                  <div
                    key={i}
                    style={{
                      padding: '10px 14px',
                      background: 'rgba(216,152,232,0.04)',
                      border: '1px solid rgba(216,152,232,0.15)',
                    }}
                  >
                    <span
                      style={{
                        fontFamily: "'Cormorant Garamond', serif",
                        fontSize: '15px',
                        color: '#c4b48a',
                        lineHeight: 1.6,
                      }}
                    >
                      <RichDescription text={desc} />
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

function SectionHeading({ title, subtitle }) {
  return (
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
          {title}
        </div>
        <div style={{ height: '1px', width: '80px', background: 'linear-gradient(270deg, transparent, #b89830)' }} />
      </div>
      <div style={{ fontFamily: "'Cormorant Garamond', serif", fontStyle: 'italic', fontSize: '17px', color: '#c4b48a', letterSpacing: '2px' }}>
        {subtitle}
      </div>
    </div>
  );
}

function CharChip({ character }) {
  const { characterTags } = useContext(TierDataContext);
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
            fontSize: '17px',
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
  const { roleTierLists, characterTags, tagDescriptions, partnerConnections, loading } = useTierListData();

  if (loading) {
    return (
      <div className="relative z-[1] min-h-screen flex items-center justify-center">
        <div style={{ fontFamily: "'Cinzel', serif", fontSize: '18px', color: '#c4b48a', letterSpacing: '4px' }}>
          Loading...
        </div>
      </div>
    );
  }

  return (
    <TierDataContext.Provider value={{ characterTags, tagDescriptions, partnerConnections }}>
      <div className="relative z-[1] min-h-screen">
        {/* Hero glow */}
        <div
          className="absolute top-0 left-1/2 -translate-x-1/2 pointer-events-none"
          style={{ width: '600px', height: '300px', background: 'radial-gradient(ellipse, rgba(201,162,39,0.06) 0%, transparent 70%)' }}
        />

        <section className="relative py-16 px-6 md:px-12">
          <SectionHeading title="Tier List" subtitle="Current meta ranking by role" />

          <TagDescriptionBox />

          <div
            className="max-w-[1400px] mx-auto"
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(4, 1fr)',
              gap: '12px',
            }}
          >
            {['Main DPS', 'Sub DPS', 'Support', 'Sustain'].map((role) => (
              <RoleColumn key={role} role={role} tierData={roleTierLists[role] || {}} />
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
                fontSize: '13px',
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
    </TierDataContext.Provider>
  );
}

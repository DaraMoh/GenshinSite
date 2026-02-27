import { characters } from '../data/characters';
import { floor12 } from '../data/spiralAbyss';

function CharacterIcon({ characterId }) {
  const character = characters.find((c) => c.id === characterId);
  if (!character) return null;

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '6px', width: '64px' }}>
      <div
        className={`el-bg-${character.element.toLowerCase()}`}
        style={{
          width: '48px',
          height: '48px',
          borderRadius: '4px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          border: '1px solid #2e2416',
        }}
      >
        {character.image && (
          <img
            src={character.image}
            alt={character.name}
            style={{ width: '44px', height: '44px', objectFit: 'cover', borderRadius: '3px' }}
            loading="lazy"
          />
        )}
      </div>
      <span
        style={{
          fontFamily: "'Inter', sans-serif",
          fontSize: '11px',
          fontWeight: 600,
          color: character.rarity === 5 ? '#e8d068' : '#b080d0',
          textAlign: 'center',
          lineHeight: 1.2,
          whiteSpace: 'nowrap',
          overflow: 'hidden',
          textOverflow: 'ellipsis',
          maxWidth: '64px',
        }}
      >
        {character.name}
      </span>
    </div>
  );
}

function TeamRow({ team }) {
  return (
    <div style={{ display: 'flex', gap: '12px' }}>
      {team.map((id) => (
        <CharacterIcon key={id} characterId={id} />
      ))}
    </div>
  );
}

function EnemySlots({ enemies }) {
  if (enemies.length === 0) {
    return (
      <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
        {[1, 2, 3].map((n) => (
          <div
            key={n}
            style={{
              padding: '8px 16px',
              background: '#0a0807',
              border: '1px dashed #2e2416',
              fontFamily: "'Inter', sans-serif",
              fontSize: '13px',
              color: '#c4b48a',
              opacity: 0.5,
            }}
          >
            Enemy {n}
          </div>
        ))}
      </div>
    );
  }

  return (
    <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
      {enemies.map((enemy, i) => (
        <div
          key={i}
          style={{
            padding: '8px 16px',
            background: '#0a0807',
            border: '1px solid #2e2416',
            fontFamily: "'Inter', sans-serif",
            fontSize: '13px',
            color: '#f0e6c8',
          }}
        >
          {enemy}
        </div>
      ))}
    </div>
  );
}

function HalfSection({ label, data }) {
  return (
    <div style={{ flex: 1 }}>
      <div
        style={{
          fontFamily: "'Cinzel', serif",
          fontSize: '14px',
          fontWeight: 700,
          letterSpacing: '3px',
          textTransform: 'uppercase',
          color: '#e8d068',
          marginBottom: '16px',
          paddingBottom: '8px',
          borderBottom: '1px solid #2e2416',
        }}
      >
        {label}
      </div>

      {/* Enemies */}
      <div style={{ marginBottom: '20px' }}>
        <div
          style={{
            fontFamily: "'Inter', sans-serif",
            fontSize: '12px',
            fontWeight: 600,
            letterSpacing: '2px',
            textTransform: 'uppercase',
            color: '#c4b48a',
            marginBottom: '10px',
          }}
        >
          Enemies
        </div>
        <EnemySlots enemies={data.enemies} />
      </div>

      {/* Recommended Teams */}
      <div>
        <div
          style={{
            fontFamily: "'Inter', sans-serif",
            fontSize: '12px',
            fontWeight: 600,
            letterSpacing: '2px',
            textTransform: 'uppercase',
            color: '#c4b48a',
            marginBottom: '10px',
          }}
        >
          Recommended Teams
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          {data.teams.map((team, i) => (
            <div key={i}>
              <div
                style={{
                  fontFamily: "'Inter', sans-serif",
                  fontSize: '11px',
                  color: '#c4b48a',
                  opacity: 0.6,
                  marginBottom: '8px',
                }}
              >
                Team {i + 1}
              </div>
              <TeamRow team={team} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function ChamberBlock({ chamberData }) {
  return (
    <div
      style={{
        background: '#181410',
        border: '1px solid #2e2416',
        marginBottom: '16px',
      }}
    >
      {/* Chamber header */}
      <div
        style={{
          padding: '16px 24px',
          borderBottom: '1px solid #2e2416',
          display: 'flex',
          alignItems: 'center',
          gap: '12px',
        }}
      >
        <span
          style={{
            fontFamily: "'Cinzel', serif",
            fontSize: '18px',
            fontWeight: 700,
            letterSpacing: '4px',
            textTransform: 'uppercase',
            color: '#f0e6c8',
          }}
        >
          Chamber {chamberData.chamber}
        </span>
      </div>

      {/* Two halves */}
      <div style={{ display: 'flex' }}>
        <div style={{ flex: 1, padding: '20px 24px' }}>
          <HalfSection label="First Half" data={chamberData.firstHalf} />
        </div>
        <div style={{ width: '1px', background: '#2e2416' }} />
        <div style={{ flex: 1, padding: '20px 24px' }}>
          <HalfSection label="Second Half" data={chamberData.secondHalf} />
        </div>
      </div>
    </div>
  );
}

export default function SpiralAbyss() {
  return (
    <div className="relative z-[1] min-h-screen">
      <section className="relative py-16 px-6 md:px-12">
        {/* Header */}
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
              Spiral Abyss
            </div>
            <div style={{ height: '1px', width: '80px', background: 'linear-gradient(270deg, transparent, #b89830)' }} />
          </div>
          <div style={{ fontFamily: "'Cormorant Garamond', serif", fontStyle: 'italic', fontSize: '17px', color: '#c4b48a', letterSpacing: '2px' }}>
            Fight waves of enemies in the OG endgame challenge!
          </div>
        </div>

        {/* Floor 12 heading */}
        <div className="max-w-[1100px] mx-auto mb-8">
          <div className="flex items-center gap-4">
            <div
              style={{
                fontFamily: "'Cinzel', serif",
                fontSize: '22px',
                fontWeight: 700,
                letterSpacing: '4px',
                textTransform: 'uppercase',
                color: '#e8d068',
              }}
            >
              Floor 12
            </div>
            <div style={{ flex: 1, height: '1px', background: 'linear-gradient(90deg, #b89830, transparent)' }} />
          </div>
        </div>

        {/* Chambers */}
        <div className="max-w-[1100px] mx-auto">
          {floor12.chambers.map((chamber) => (
            <ChamberBlock key={chamber.chamber} chamberData={chamber} />
          ))}
        </div>
      </section>
    </div>
  );
}

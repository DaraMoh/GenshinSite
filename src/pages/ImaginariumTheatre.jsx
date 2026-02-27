import { characters } from '../data/characters';
import { useImaginariumData } from '../hooks/useImaginariumData';

const ELEMENT_COLORS = {
  Pyro: '#ef7938',
  Hydro: '#4cc2f1',
  Electro: '#b07ed8',
  Cryo: '#9fd6e3',
  Anemo: '#74c2a8',
  Geo: '#f0b232',
  Dendro: '#a0c842',
};

function CharacterIcon({ characterId }) {
  const character = characters.find((c) => c.id === characterId);
  if (!character) return null;

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '6px', width: '72px' }}>
      <div
        className={`el-bg-${character.element.toLowerCase()}`}
        style={{
          width: '56px',
          height: '56px',
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
            style={{ width: '52px', height: '52px', objectFit: 'cover', borderRadius: '3px' }}
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
          maxWidth: '72px',
        }}
      >
        {character.name}
      </span>
    </div>
  );
}

function ElementBadge({ element }) {
  const color = ELEMENT_COLORS[element] || '#c4b48a';

  return (
    <div
      className={`el-bg-${element.toLowerCase()}`}
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: '10px',
        padding: '12px 20px',
        border: `1px solid ${color}40`,
        borderRadius: '4px',
      }}
    >
      <span
        style={{
          width: '10px',
          height: '10px',
          borderRadius: '50%',
          background: color,
          boxShadow: `0 0 8px ${color}60`,
          flexShrink: 0,
        }}
      />
      <span
        style={{
          fontFamily: "'Cinzel', serif",
          fontSize: '16px',
          fontWeight: 700,
          letterSpacing: '3px',
          textTransform: 'uppercase',
          color: color,
        }}
      >
        {element}
      </span>
    </div>
  );
}

function SectionBlock({ title, description, children }) {
  return (
    <div
      style={{
        background: '#181410',
        border: '1px solid #2e2416',
        padding: '24px',
        marginBottom: '16px',
      }}
    >
      <div style={{ marginBottom: '16px' }}>
        <div
          style={{
            fontFamily: "'Cinzel', serif",
            fontSize: '18px',
            fontWeight: 700,
            letterSpacing: '4px',
            textTransform: 'uppercase',
            color: '#e8d068',
            marginBottom: '8px',
          }}
        >
          {title}
        </div>
        {description && (
          <div
            style={{
              fontFamily: "'Cormorant Garamond', serif",
              fontStyle: 'italic',
              fontSize: '15px',
              color: '#c4b48a',
              lineHeight: 1.5,
            }}
          >
            {description}
          </div>
        )}
      </div>
      {children}
    </div>
  );
}

export default function ImaginariumTheatre() {
  const { seasonName, elements, openingCharacters, specialGuests, loading } = useImaginariumData();

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
              Imaginarium Theatre
            </div>
            <div style={{ height: '1px', width: '80px', background: 'linear-gradient(270deg, transparent, #b89830)' }} />
          </div>
          <div style={{ fontFamily: "'Cormorant Garamond', serif", fontStyle: 'italic', fontSize: '17px', color: '#c4b48a', letterSpacing: '2px' }}>
            A rotating roguelike challenge across the acts
          </div>
        </div>

        {/* Season heading */}
        <div className="max-w-[900px] mx-auto mb-8">
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
              {seasonName}
            </div>
            <div style={{ flex: 1, height: '1px', background: 'linear-gradient(90deg, #b89830, transparent)' }} />
          </div>
        </div>

        <div className="max-w-[900px] mx-auto">
          {/* Featured Elements */}
          <SectionBlock
            title="Featured Elements"
            description="Characters of these elements can be selected for your party in this month's theatre."
          >
            <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
              {elements.map((el) => (
                <ElementBadge key={el} element={el} />
              ))}
            </div>
          </SectionBlock>

          {/* Opening Characters */}
          <SectionBlock
            title="Opening Characters"
            description="These characters are available to all players for this month, regardless of whether you own them."
          >
            <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap' }}>
              {openingCharacters.map((id) => (
                <CharacterIcon key={id} characterId={id} />
              ))}
            </div>
          </SectionBlock>

          {/* Special Guest Stars */}
          <SectionBlock
            title="Special Guest Stars"
            description="These characters are only available if you own them in this month's theatre."
          >
            <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap' }}>
              {specialGuests.map((id) => (
                <CharacterIcon key={id} characterId={id} />
              ))}
            </div>
          </SectionBlock>
        </div>
      </section>
    </div>
  );
}

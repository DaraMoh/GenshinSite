import { characters } from '../data/characters';
import { useStygianData } from '../hooks/useStygianData';

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

function BossCard({ boss, index }) {
  return (
    <div
      style={{
        background: '#181410',
        border: '1px solid #2e2416',
        padding: '20px 24px',
        flex: 1,
        minWidth: '250px',
      }}
    >
      <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '12px' }}>
        <span
          style={{
            fontFamily: "'Cinzel', serif",
            fontSize: '14px',
            fontWeight: 700,
            color: '#b89830',
            letterSpacing: '2px',
          }}
        >
          {index + 1}
        </span>
        <span
          style={{
            fontFamily: "'Cinzel', serif",
            fontSize: '17px',
            fontWeight: 700,
            letterSpacing: '3px',
            textTransform: 'uppercase',
            color: '#f0e6c8',
          }}
        >
          {boss.name}
        </span>
      </div>
      <div
        style={{
          fontFamily: "'Cormorant Garamond', serif",
          fontSize: '15px',
          color: '#c4b48a',
          lineHeight: 1.6,
          fontStyle: 'italic',
        }}
      >
        {boss.description}
      </div>
    </div>
  );
}

function TeamCard({ team }) {
  return (
    <div
      style={{
        background: '#181410',
        border: '1px solid #2e2416',
        padding: '16px 20px',
      }}
    >
      {team.name && (
        <div
          style={{
            fontFamily: "'Inter', sans-serif",
            fontSize: '13px',
            fontWeight: 600,
            color: '#e8d068',
            marginBottom: '12px',
            letterSpacing: '1px',
          }}
        >
          {team.name}
        </div>
      )}
      <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
        {team.characters.map((id) => (
          <CharacterIcon key={id} characterId={id} />
        ))}
      </div>
      {team.note && (
        <div
          style={{
            fontFamily: "'Cormorant Garamond', serif",
            fontSize: '14px',
            fontStyle: 'italic',
            color: '#c4b48a',
            marginTop: '12px',
            opacity: 0.8,
          }}
        >
          {team.note}
        </div>
      )}
    </div>
  );
}

function StrategyCard({ strategy }) {
  return (
    <div
      style={{
        background: '#181410',
        border: '1px solid #2e2416',
        padding: '16px 20px',
      }}
    >
      <div
        style={{
          fontFamily: "'Cinzel', serif",
          fontSize: '15px',
          fontWeight: 700,
          letterSpacing: '2px',
          textTransform: 'uppercase',
          color: '#e8d068',
          marginBottom: '8px',
        }}
      >
        {strategy.title}
      </div>
      <div
        style={{
          fontFamily: "'Cormorant Garamond', serif",
          fontSize: '15px',
          color: '#c4b48a',
          lineHeight: 1.6,
        }}
      >
        {strategy.content}
      </div>
    </div>
  );
}

function EmptyState({ text }) {
  return (
    <div style={{ fontFamily: "'Cormorant Garamond', serif", fontStyle: 'italic', fontSize: '15px', color: '#c4b48a', opacity: 0.6, padding: '20px', textAlign: 'center' }}>
      {text}
    </div>
  );
}

function SectionBlock({ title, description, children }) {
  return (
    <div
      style={{
        background: '#0f0d0a',
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
            marginBottom: description ? '8px' : 0,
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

export default function StygianOnslaught() {
  const { iterationName, bosses, recommendedTeams, strategies, loading } = useStygianData();

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
              Stygian Onslaught
            </div>
            <div style={{ height: '1px', width: '80px', background: 'linear-gradient(270deg, transparent, #b89830)' }} />
          </div>
          <div style={{ fontFamily: "'Cormorant Garamond', serif", fontStyle: 'italic', fontSize: '17px', color: '#c4b48a', letterSpacing: '2px' }}>
            Everyone's favorite gamemode!!!
          </div>
        </div>

        {/* Iteration heading */}
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
              {iterationName}
            </div>
            <div style={{ flex: 1, height: '1px', background: 'linear-gradient(90deg, #b89830, transparent)' }} />
          </div>
        </div>

        <div className="max-w-[900px] mx-auto">
          {/* Bosses */}
          <SectionBlock
            title="Bosses"
            description="The three bosses you'll face in this iteration."
          >
            <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
              {bosses.map((boss, i) => (
                <BossCard key={i} boss={boss} index={i} />
              ))}
            </div>
          </SectionBlock>

          {/* Recommended Teams */}
          <SectionBlock
            title="Recommended Teams"
            description="Team compositions that perform well against this iteration's bosses."
          >
            {recommendedTeams.length > 0 ? (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                {recommendedTeams.map((team, i) => (
                  <TeamCard key={i} team={team} />
                ))}
              </div>
            ) : (
              <EmptyState text="No team recommendations yet — check back soon." />
            )}
          </SectionBlock>

          {/* Strategies */}
          <SectionBlock
            title="Strategies"
            description="Tips and approaches for clearing this iteration."
          >
            {strategies.length > 0 ? (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                {strategies.map((strategy, i) => (
                  <StrategyCard key={i} strategy={strategy} />
                ))}
              </div>
            ) : (
              <EmptyState text="No strategies yet — check back soon." />
            )}
          </SectionBlock>
        </div>
      </section>
    </div>
  );
}

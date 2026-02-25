import { Link } from 'react-router-dom';

const ENDGAME_MODES = [
  {
    to: '/endgame/spiral-abyss',
    title: 'Spiral Abyss',
    desc: 'The ultimate test of strength beneath Musk Reef',
  },
  {
    to: '/endgame/imaginarium-theatre',
    title: 'Imaginarium Theatre',
    desc: 'A rotating roguelike challenge across the acts',
  },
  {
    to: '/endgame/stygian-onslaught',
    title: 'Stygian Onslaught',
    desc: 'Confront the abyss in endless waves of combat',
  },
];

export default function Endgame() {
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
              Endgame
            </div>
            <div style={{ height: '1px', width: '80px', background: 'linear-gradient(270deg, transparent, #b89830)' }} />
          </div>
          <div style={{ fontFamily: "'Cormorant Garamond', serif", fontStyle: 'italic', fontSize: '17px', color: '#c4b48a', letterSpacing: '2px' }}>
            Endgame content and guides
          </div>
        </div>

        {/* Navigation Cards */}
        <div className="grid md:grid-cols-3 gap-5 max-w-4xl mx-auto">
          {ENDGAME_MODES.map((mode) => (
            <Link
              key={mode.to}
              to={mode.to}
              className="block p-8 transition-all duration-400"
              style={{
                background: '#181410',
                border: '1px solid #2e2416',
                textDecoration: 'none',
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
              <h3
                style={{
                  fontFamily: "'Cinzel', serif",
                  fontSize: '18px',
                  fontWeight: 700,
                  letterSpacing: '4px',
                  textTransform: 'uppercase',
                  color: '#e8d068',
                  marginBottom: '12px',
                }}
              >
                {mode.title}
              </h3>
              <p style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '18px', color: '#c4b48a', lineHeight: 1.6 }}>
                {mode.desc}
              </p>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}

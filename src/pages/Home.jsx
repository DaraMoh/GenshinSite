import { Link } from 'react-router-dom';
import { characters } from '../data/characters';

function OrnamentDivider() {
  return (
    <div className="ornament-divider">
      <div className="ornament-line" />
      <span className="ornament-symbols">&#9670; &#9670; &#9670;</span>
      <div className="ornament-line ornament-line-r" />
    </div>
  );
}

export default function Home() {
  return (
    <div className="relative z-[1] min-h-screen">
      {/* Hero Glow */}
      <div
        className="absolute top-0 left-1/2 -translate-x-1/2 pointer-events-none"
        style={{
          width: '600px',
          height: '400px',
          background: 'radial-gradient(ellipse, rgba(201,162,39,0.08) 0%, transparent 70%)',
        }}
      />

      {/* Hero Section */}
      <section className="relative text-center py-20 px-12">
        <div
          className="mb-5"
          style={{
            fontFamily: "'Cinzel', serif",
            fontSize: '13px',
            letterSpacing: '8px',
            color: '#e8d068',
            textTransform: 'uppercase',
          }}
        >
          Fan-Made Genshin Compendium
          {/*&middot; {characters.length} Characters*/}
        </div>

        <div className="flex items-center justify-center gap-5 mb-7">
          <div style={{ height: '1px', width: '120px', background: 'linear-gradient(90deg, transparent, #b89830)' }} />
          <div style={{ fontSize: '20px', color: '#e8d068', textShadow: '0 0 20px rgba(201,162,39,0.5)' }}>&#9670;</div>
          <div style={{ height: '1px', width: '120px', background: 'linear-gradient(270deg, transparent, #b89830)' }} />
        </div>

        <h1
          style={{
            fontFamily: "'Cinzel Decorative', serif",
            fontSize: 'clamp(36px, 6vw, 72px)',
            fontWeight: 400,
            color: '#f0e6c8',
            letterSpacing: '4px',
            lineHeight: 1.1,
            marginBottom: '16px',
          }}
        >
          Genshin<br /><span style={{ color: '#e8d068' }}>Impact</span>
        </h1>

        <p
          style={{
            fontFamily: "'Cormorant Garamond', serif",
            fontStyle: 'italic',
            fontSize: '22px',
            color: '#c4b48a',
            letterSpacing: '2px',
          }}
        >
          Placeholder Desc.
        </p>
      </section>

      <OrnamentDivider />

      {/* Navigation Cards */}
      <section className="relative py-16 px-12">
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
              Explore
            </div>
            <div style={{ height: '1px', width: '80px', background: 'linear-gradient(270deg, transparent, #b89830)' }} />
          </div>
          {/*<div style={{ fontFamily: "'Cormorant Garamond', serif", fontStyle: 'italic', fontSize: '14px', color: '#c4b48a', letterSpacing: '2px' }}>
            Choose your path through Teyvat
          </div>*/}
        </div>

        <div className="grid md:grid-cols-3 gap-5 max-w-4xl mx-auto">
          {[
            { to: '/characters', title: 'Characters', desc: 'Browse all wielders of Visions across the seven nations' },
            { to: '/tier-list', title: 'Tier List', desc: 'Current meta ranking for the latest version' },
            { to: '/tier-list-maker', title: 'Tier Maker', desc: 'Create your own custom tier list with drag and drop' },
          ].map((card) => (
            <Link
              key={card.to}
              to={card.to}
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
                {card.title}
              </h3>
              <p style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '18px', color: '#c4b48a', lineHeight: 1.6 }}>
                {card.desc}
              </p>
            </Link>
          ))}
        </div>
      </section>

      <OrnamentDivider />

      {/* Footer */}
      <footer className="relative text-center py-12 px-12" style={{ borderTop: '1px solid #2e2416' }}>
        <div style={{ color: '#b89830', fontSize: '14px', letterSpacing: '10px', marginBottom: '20px' }}>
          &#9670; &#9670; &#9670; &#9670; &#9670;
        </div>
        <p style={{ fontFamily: "'Cinzel', serif", fontSize: '12px', letterSpacing: '4px', color: '#c4b48a', textTransform: 'uppercase', opacity: 0.5 }}>
          Teyvat Chronicle &mdash; A fan-made compendium
        </p>
        <p style={{ fontFamily: "'Cinzel', serif", fontSize: '12px', letterSpacing: '4px', color: '#c4b48a', textTransform: 'uppercase', opacity: 0.5, marginTop: '8px' }}>
          Genshin Impact&trade; is a trademark of HoYoverse. All rights reserved.
        </p>
      </footer>
    </div>
  );
}

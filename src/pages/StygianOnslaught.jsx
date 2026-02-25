export default function StygianOnslaught() {
  return (
    <div className="relative z-[1] min-h-screen">
      <section className="relative py-16 px-6 md:px-12">
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

        <div className="max-w-[1000px] mx-auto text-center py-20">
          <div style={{ fontFamily: "'Cinzel', serif", fontSize: '20px', color: '#c4b48a', letterSpacing: '3px' }}>
            Coming Soon
          </div>
          <div style={{ fontFamily: "'Cormorant Garamond', serif", fontStyle: 'italic', fontSize: '17px', color: '#c4b48a', marginTop: '12px', opacity: 0.7 }}>
            Team strategies, enemy breakdowns, and more!
          </div>
        </div>
      </section>
    </div>
  );
}

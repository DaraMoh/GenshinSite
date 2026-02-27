import { useState, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';

const linkStyle = {
  fontFamily: "'Cinzel', serif",
  fontSize: '14px',
  letterSpacing: '3px',
  textTransform: 'uppercase',
  textDecoration: 'none',
  transition: 'color 0.3s',
};

function NavLink({ to, label, isActive }) {
  return (
    <Link
      to={to}
      className="relative pb-1"
      style={{
        ...linkStyle,
        color: isActive ? '#e8d068' : '#c4b48a',
      }}
      onMouseEnter={(e) => { if (!isActive) e.target.style.color = '#e8d068'; }}
      onMouseLeave={(e) => { if (!isActive) e.target.style.color = '#c4b48a'; }}
    >
      {label}
      {isActive && (
        <span
          className="absolute bottom-0 left-0 w-full"
          style={{ height: '1px', background: '#e8d068' }}
        />
      )}
    </Link>
  );
}

function NavDropdown({ to, label, isActive, items }) {
  const [open, setOpen] = useState(false);
  const timeoutRef = useRef(null);

  const handleEnter = () => {
    clearTimeout(timeoutRef.current);
    setOpen(true);
  };

  const handleLeave = () => {
    timeoutRef.current = setTimeout(() => setOpen(false), 150);
  };

  return (
    <div
      className="relative"
      onMouseEnter={handleEnter}
      onMouseLeave={handleLeave}
    >
      <Link
        to={to}
        className="relative pb-1"
        style={{
          ...linkStyle,
          color: isActive ? '#e8d068' : '#c4b48a',
        }}
        onMouseEnter={(e) => { if (!isActive) e.target.style.color = '#e8d068'; }}
        onMouseLeave={(e) => { if (!isActive) e.target.style.color = '#c4b48a'; }}
      >
        {label}
        {isActive && (
          <span
            className="absolute bottom-0 left-0 w-full"
            style={{ height: '1px', background: '#e8d068' }}
          />
        )}
      </Link>

      {open && (
        <div
          style={{
            position: 'absolute',
            top: '100%',
            left: '50%',
            transform: 'translateX(-50%)',
            marginTop: '12px',
            background: 'rgba(10, 8, 7, 0.98)',
            border: '1px solid #2e2416',
            padding: '8px 0',
            minWidth: '210px',
            zIndex: 100,
          }}
        >
          {items.map((item) => (
            <Link
              key={item.to}
              to={item.to}
              style={{
                display: 'block',
                padding: '10px 20px',
                fontFamily: "'Cinzel', serif",
                fontSize: '13px',
                letterSpacing: '2px',
                textTransform: 'uppercase',
                color: '#c4b48a',
                textDecoration: 'none',
                transition: 'all 0.2s',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.color = '#e8d068';
                e.currentTarget.style.background = 'rgba(201,162,39,0.05)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.color = '#c4b48a';
                e.currentTarget.style.background = 'transparent';
              }}
            >
              {item.label}
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}

export default function Navbar() {
  const location = useLocation();
  const isActive = (path) => location.pathname === path;

  return (
    <nav
      className="sticky top-0 z-50 backdrop-blur-md"
      style={{
        background: 'rgba(10, 8, 7, 0.95)',
        borderBottom: '1px solid #b89830',
      }}
    >
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <div className="flex items-center justify-between h-[80px]">
          <div className="flex items-center gap-6 md:gap-9">
            <NavLink to="/" label="Home" isActive={isActive('/')} />
            <span style={{ color: '#b89830', fontSize: '10px' }}>&#9670;</span>
            <NavLink to="/characters" label="Characters" isActive={isActive('/characters')} />
          </div>

          <Link to="/" className="text-center" style={{ textDecoration: 'none' }}>
            <span
              className="block leading-none"
              style={{
                fontFamily: "'Cinzel Decorative', serif",
                fontSize: '26px',
                fontWeight: 700,
                color: '#e8d068',
                letterSpacing: '4px',
                textShadow: '0 0 30px rgba(201,162,39,0.3)',
              }}
            >
              Placeholder
            </span>
            <span
              className="block mt-1"
              style={{
                fontFamily: "'Cinzel', serif",
                fontSize: '11px',
                letterSpacing: '6px',
                color: '#c4b48a',
                textTransform: 'uppercase',
              }}
            >
              Name
            </span>
          </Link>

          <div className="flex items-center gap-6 md:gap-9">
            <NavDropdown
              to="/tier-list"
              label="Tier List"
              isActive={isActive('/tier-list')}
              items={[{ to: '/tier-list-maker', label: 'Tier Maker' }]}
            />
            <span style={{ color: '#b89830', fontSize: '10px' }}>&#9670;</span>
            <NavDropdown
              to="/endgame"
              label="Endgame"
              isActive={isActive('/endgame')}
              items={[
                { to: '/endgame/spiral-abyss', label: 'Spiral Abyss' },
                { to: '/endgame/imaginarium-theatre', label: 'Imaginarium Theatre' },
                { to: '/endgame/stygian-onslaught', label: 'Stygian Onslaught' },
              ]}
            />
          </div>
        </div>
      </div>
    </nav>
  );
}

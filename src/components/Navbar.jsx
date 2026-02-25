import { Link, useLocation } from 'react-router-dom';

export default function Navbar() {
  const location = useLocation();
  const isActive = (path) => location.pathname === path;

  const navLinks = [
    { path: '/', label: 'Home' },
    { path: '/characters', label: 'Characters' },
    { path: '/tier-list', label: 'Tier List' },
    { path: '/tier-list-maker', label: 'Maker' },
  ];

  return (
    <nav
      className="sticky top-0 z-50 backdrop-blur-md"
      style={{
        background: 'rgba(10, 8, 7, 0.95)',
        borderBottom: '1px solid #b89830',
      }}
    >
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <div className="flex items-center justify-between h-[72px]">
          <div className="flex items-center gap-6 md:gap-9">
            {navLinks.slice(0, 2).map((link, i) => (
              <span key={link.path} className="flex items-center gap-6 md:gap-9">
                <Link
                  to={link.path}
                  className="relative pb-1"
                  style={{
                    fontFamily: "'Cinzel', serif",
                    fontSize: '11px',
                    letterSpacing: '3px',
                    textTransform: 'uppercase',
                    color: isActive(link.path) ? '#e8d068' : '#c4b48a',
                    textDecoration: 'none',
                    transition: 'color 0.3s',
                  }}
                  onMouseEnter={(e) => { if (!isActive(link.path)) e.target.style.color = '#e8d068'; }}
                  onMouseLeave={(e) => { if (!isActive(link.path)) e.target.style.color = '#c4b48a'; }}
                >
                  {link.label}
                  {isActive(link.path) && (
                    <span
                      className="absolute bottom-0 left-0 w-full"
                      style={{ height: '1px', background: '#e8d068' }}
                    />
                  )}
                </Link>
                {i < 1 && <span style={{ color: '#b89830', fontSize: '8px' }}>&#9670;</span>}
              </span>
            ))}
          </div>

          <Link to="/" className="text-center" style={{ textDecoration: 'none' }}>
            <span
              className="block leading-none"
              style={{
                fontFamily: "'Cinzel Decorative', serif",
                fontSize: '20px',
                fontWeight: 700,
                color: '#e8d068',
                letterSpacing: '4px',
                textShadow: '0 0 30px rgba(201,162,39,0.3)',
              }}
            >
              Teyvat
            </span>
            <span
              className="block mt-1"
              style={{
                fontFamily: "'Cinzel', serif",
                fontSize: '9px',
                letterSpacing: '6px',
                color: '#c4b48a',
                textTransform: 'uppercase',
              }}
            >
              Chronicle
            </span>
          </Link>

          <div className="flex items-center gap-6 md:gap-9">
            {navLinks.slice(2).map((link, i) => (
              <span key={link.path} className="flex items-center gap-6 md:gap-9">
                <Link
                  to={link.path}
                  className="relative pb-1"
                  style={{
                    fontFamily: "'Cinzel', serif",
                    fontSize: '11px',
                    letterSpacing: '3px',
                    textTransform: 'uppercase',
                    color: isActive(link.path) ? '#e8d068' : '#c4b48a',
                    textDecoration: 'none',
                    transition: 'color 0.3s',
                  }}
                  onMouseEnter={(e) => { if (!isActive(link.path)) e.target.style.color = '#e8d068'; }}
                  onMouseLeave={(e) => { if (!isActive(link.path)) e.target.style.color = '#c4b48a'; }}
                >
                  {link.label}
                  {isActive(link.path) && (
                    <span
                      className="absolute bottom-0 left-0 w-full"
                      style={{ height: '1px', background: '#e8d068' }}
                    />
                  )}
                </Link>
                {i < 1 && <span style={{ color: '#b89830', fontSize: '8px' }}>&#9670;</span>}
              </span>
            ))}
          </div>
        </div>
      </div>
    </nav>
  );
}

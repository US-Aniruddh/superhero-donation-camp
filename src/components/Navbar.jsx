import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useTheme } from '../contexts/ThemeContext';

const Navbar = () => {
  const { homeTheme, toggleHomeTheme } = useTheme();
  const location = useLocation();
  const isHomePage = location.pathname === '/';

  return (
    <nav className="navbar">
      <Link to="/" className="nav-logo">
        HERO.CAPITAL
      </Link>
      
      <div className="nav-links" style={{ display: 'flex', gap: '2rem', alignItems: 'center' }}>
        {isHomePage && (
          <button 
            onClick={toggleHomeTheme}
            style={{ 
              background: 'transparent',
              border: '1px solid rgba(255, 255, 255, 0.2)',
              color: 'inherit',
              padding: '0.4rem 1rem',
              borderRadius: '4px',
              fontSize: '0.7rem',
              letterSpacing: '1px',
              cursor: 'pointer',
              textTransform: 'uppercase'
            }}
          >
            {homeTheme === 'light' ? 'DARK_MODE' : 'LIGHT_MODE'}
          </button>
        )}
      </div>
    </nav>
  );
};

export default Navbar;

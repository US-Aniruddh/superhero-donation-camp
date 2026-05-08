import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTheme } from '../contexts/ThemeContext';
import spideyLogo from '../assets/Spiderman.png';
import batmanLogo from '../assets/Batman.png';
import Rain from '../components/Rain';


const Home = () => {
  const { homeTheme } = useTheme();
  const navigate = useNavigate();

  useEffect(() => {
    document.body.className = `home-${homeTheme}`;
    return () => { document.body.className = ''; };
  }, [homeTheme]);

  return (
    <div className="page-container">
      {homeTheme === 'dark' && <Rain />}

      <header className="hero-header">
        <h1 className="hero-title">
          SuperHero Donations
        </h1>
        <p className="hero-subtitle">
          Support Your Favourite SuperHero!
        </p>
      </header>

      <div className="card-grid">
        {/* Spider-Man Card */}
        <div
          onClick={() => navigate('/spiderman')}
          className="minimal-card"
          style={{
            minHeight: '380px',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: '#00409a',
            backgroundImage: `
              radial-gradient(circle at 50% 0%, transparent 60%, rgba(0,0,0,0.3) 60%),
              repeating-linear-gradient(0deg, transparent, transparent 38px, rgba(255,255,255,0.07) 38px, rgba(255,255,255,0.07) 40px),
              repeating-linear-gradient(90deg, transparent, transparent 38px, rgba(255,255,255,0.07) 38px, rgba(255,255,255,0.07) 40px)
            `,
            border: '1px solid rgba(0,80,180,0.4)',
          }}
        >
          <img
            src={spideyLogo}
            alt="Spider-Man"
            style={{ width: 'clamp(80px, 15vw, 110px)', height: 'auto', objectFit: 'contain', marginBottom: '2rem' }}
          />
          <h2 style={{ fontSize: '1.2rem', fontWeight: '300', letterSpacing: '5px', color: '#ffffff', marginBottom: '0.5rem' }}>
            SPIDER-MAN
          </h2>
          <p style={{ fontSize: '0.75rem', opacity: 0.6, letterSpacing: '2px', textTransform: 'uppercase', color: 'white' }}>
            Peter's Photography Project!
          </p>
        </div>

        {/* Batman Card */}
        <div
          onClick={() => navigate('/batman')}
          className="minimal-card"
          style={{
            minHeight: '380px',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: '#1a1a1a',
          }}
        >
          <img
            src={batmanLogo}
            alt="Batman"
            style={{
              width: 'clamp(120px, 20vw, 160px)',
              height: 'auto',
              objectFit: 'contain',
              marginBottom: '2.5rem',
              filter: 'brightness(0) invert(0.85)'
            }}
          />
          <h2 style={{ fontSize: '1.2rem', fontWeight: '300', letterSpacing: '5px', color: '#d0d0d0', marginBottom: '0.5rem' }}>
            BATMAN
          </h2>
          <p style={{ fontSize: '0.75rem', opacity: 0.4, letterSpacing: '2px', textTransform: 'uppercase', color: '#d0d0d0' }}>
            The BatMobile Project!
          </p>
        </div>
      </div>
    </div>
  );
};

export default Home;

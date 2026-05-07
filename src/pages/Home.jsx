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
    <div style={{ padding: '4rem 5%', textAlign: 'center', position: 'relative' }}>
      {homeTheme === 'dark' && <Rain />}

      <header style={{ marginBottom: '5rem' }}>
        <h1 style={{
          fontSize: '3rem',
          fontWeight: '300',
          letterSpacing: '10px',
          textTransform: 'uppercase',
          marginBottom: '1rem'
        }}>
          SuperHero Donations
        </h1>
        <p style={{ fontSize: '0.9rem', opacity: 0.5, letterSpacing: '3px', textTransform: 'uppercase' }}>
          Support Your Favourite SuperHero!
        </p>
      </header>

      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
        gap: '2.5rem',
        maxWidth: '900px',
        margin: '0 auto'
      }}>

        {/* Spider-Man Card */}
        <div
          onClick={() => navigate('/spiderman')}
          style={{
            cursor: 'pointer',
            borderRadius: '8px',
            overflow: 'hidden',
            minHeight: '380px',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '3rem 2rem',
            position: 'relative',
            /* Web SVG pattern over blue bg */
            backgroundColor: '#00409a',
            backgroundImage: `
              radial-gradient(circle at 50% 0%, transparent 60%, rgba(0,0,0,0.3) 60%),
              repeating-linear-gradient(
                0deg,
                transparent,
                transparent 38px,
                rgba(255,255,255,0.07) 38px,
                rgba(255,255,255,0.07) 40px
              ),
              repeating-linear-gradient(
                90deg,
                transparent,
                transparent 38px,
                rgba(255,255,255,0.07) 38px,
                rgba(255,255,255,0.07) 40px
              )
            `,
            border: '1px solid rgba(0,80,180,0.4)',
            transition: 'transform 0.35s ease, box-shadow 0.35s ease'
          }}
          onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-6px)'; e.currentTarget.style.boxShadow = '0 20px 40px rgba(0,0,0,0.4)'; }}
          onMouseLeave={e => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = 'none'; }}
        >
          <img
            src={spideyLogo}
            alt="Spider-Man"
            style={{ width: '110px', height: '110px', objectFit: 'contain', marginBottom: '2rem' }}
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
          style={{
            cursor: 'pointer',
            borderRadius: '8px',
            overflow: 'hidden',
            minHeight: '380px',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '3rem 2rem',
            backgroundColor: '#1a1a1a',
            border: '1px solid rgba(255,255,255,0.08)',
            transition: 'transform 0.35s ease, box-shadow 0.35s ease'
          }}
          onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-6px)'; e.currentTarget.style.boxShadow = '0 20px 40px rgba(0,0,0,0.6)'; }}
          onMouseLeave={e => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = 'none'; }}
        >
          <img
            src={batmanLogo}
            alt="Batman"
            style={{
              width: '160px',
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

import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

const Donors = () => {
  const { hero } = useParams();
  const [donors, setDonors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const fetchDonors = async () => {
    setLoading(true);
    setError(null);
    try {
      const endpoint = hero === 'spider-man' ? '/api/spiderman-donors' : '/api/batman-donors';
      const response = await axios.get(endpoint);
      setDonors(response.data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching donors:', error);
      setError('Failed to load transmission data. The signal might be blocked.');
      setLoading(false);
    }
  };

  useEffect(() => {
    const themeClass = hero === 'spider-man' ? 'theme-spiderman' : 'theme-batman';
    document.body.className = themeClass;
    
    fetchDonors();
    return () => { document.body.className = ''; };
  }, [hero]);

  const heroName = hero === 'spider-man' ? 'SPIDER-MAN' : 'BATMAN';
  const heroColor = hero === 'spider-man' ? '#ff3333' : '#ffd700';

  return (
    <div style={{ padding: '4rem 5%', minHeight: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      <div style={{ maxWidth: '700px', width: '100%' }}>
        <header style={{ marginBottom: '4rem', textAlign: 'center' }}>
          <h1 style={{ fontSize: '2rem', fontWeight: '300', letterSpacing: '8px', marginBottom: '1rem', color: heroColor }}>
            {heroName} CONTRIBUTORS
          </h1>
          <p style={{ fontSize: '0.8rem', opacity: 0.5, letterSpacing: '2px' }}>
            SECURE LEDGER OF VERIFIED TRANSACTIONS
          </p>
        </header>

        <div style={{ 
          background: 'rgba(255, 255, 255, 0.02)', 
          padding: '2.5rem', 
          borderRadius: '16px', 
          border: '1px solid rgba(255, 255, 255, 0.05)',
          backdropFilter: 'blur(10px)',
          minHeight: '300px',
          display: 'flex',
          flexDirection: 'column'
        }}>
          {loading ? (
            <div style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', gap: '1.5rem' }}>
              <div className="pulse-spinner" style={{ 
                width: '40px', 
                height: '40px', 
                background: heroColor, 
                borderRadius: '50%',
                opacity: 0.5,
                animation: 'pulse 1.5s infinite ease-in-out'
              }} />
              <p style={{ opacity: 0.3, letterSpacing: '4px', fontSize: '0.7rem' }}>DECRYPTING DATA...</p>
            </div>
          ) : error ? (
            <div style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', gap: '1.5rem' }}>
              <p style={{ color: '#f87171', opacity: 0.8 }}>{error}</p>
              <button onClick={fetchDonors} className="btn" style={{ padding: '0.5rem 2rem', fontSize: '0.8rem' }}>
                RETRY CONNECTION
              </button>
            </div>
          ) : donors.length > 0 ? (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
              {donors.map((donor, index) => (
                <div key={donor._id || index} style={{ 
                  display: 'flex', 
                  justifyContent: 'space-between', 
                  padding: '1.2rem 0',
                  borderBottom: '1px solid rgba(255, 255, 255, 0.03)',
                  animation: `fadeInUp 0.5s ease forwards ${index * 0.1}s`,
                  opacity: 0,
                  transform: 'translateY(10px)'
                }}>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                    <span style={{ fontWeight: '400', letterSpacing: '2px', fontSize: '0.9rem' }}>{donor.name.toUpperCase()}</span>
                    <span style={{ fontSize: '0.6rem', opacity: 0.3 }}>{new Date(donor.timestamp).toLocaleString()}</span>
                  </div>
                  <span style={{ fontWeight: '700', color: heroColor, fontSize: '1.1rem' }}>₹{donor.amount.toLocaleString()}</span>
                </div>
              ))}
            </div>
          ) : (
            <div style={{ flex: 1, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
              <p style={{ opacity: 0.2, letterSpacing: '4px' }}>NO RECORDS IN LEDGER</p>
            </div>
          )}
        </div>

        <div style={{ marginTop: '3rem', textAlign: 'center' }}>
          <button onClick={() => navigate('/')} className="btn btn-secondary" style={{ fontSize: '0.8rem', opacity: 0.6 }}>
            BACK TO DASHBOARD
          </button>
        </div>
      </div>

      <style>{`
        @keyframes pulse {
          0% { transform: scale(0.8); opacity: 0.5; }
          50% { transform: scale(1.2); opacity: 0.2; }
          100% { transform: scale(0.8); opacity: 0.5; }
        }
        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  );
};

export default Donors;


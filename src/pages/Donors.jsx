import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

const Donors = () => {
  const { hero } = useParams();
  const [donors, setDonors] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const themeClass = hero === 'spider-man' ? 'theme-spiderman' : 'theme-batman';
    document.body.className = themeClass;
    
    const fetchDonors = async () => {
      try {
        const response = await axios.get(`/api/donors/${hero}`);
        setDonors(response.data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching donors:', error);
        setLoading(false);
      }
    };

    fetchDonors();
    return () => { document.body.className = ''; };
  }, [hero]);

  const heroName = hero === 'spider-man' ? 'SPIDER-MAN' : 'BATMAN';

  return (
    <div style={{ padding: '4rem 5%', minHeight: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      <div style={{ maxWidth: '700px', width: '100%' }}>
        <header style={{ marginBottom: '4rem', textAlign: 'center' }}>
          <h1 style={{ fontSize: '2rem', fontWeight: '300', letterSpacing: '8px', marginBottom: '1rem' }}>
            {heroName} CONTRIBUTORS
          </h1>
          <p style={{ fontSize: '0.8rem', opacity: 0.5, letterSpacing: '2px' }}>
            REGISTERED VERIFIED TRANSACTIONS
          </p>
        </header>

        <div style={{ 
          background: 'rgba(255, 255, 255, 0.02)', 
          padding: '2rem', 
          borderRadius: '8px', 
          border: '1px solid rgba(255, 255, 255, 0.05)'
        }}>
          {loading ? (
            <p style={{ textAlign: 'center', opacity: 0.3 }}>DECODING DATA...</p>
          ) : donors.length > 0 ? (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
              {donors.map((donor, index) => (
                <div key={donor._id || index} style={{ 
                  display: 'flex', 
                  justifyContent: 'space-between', 
                  padding: '1rem 0',
                  borderBottom: '1px solid rgba(255, 255, 255, 0.03)'
                }}>
                  <span style={{ fontWeight: '400', letterSpacing: '1px' }}>{donor.name.toUpperCase()}</span>
                  <span style={{ fontWeight: '700', color: 'rgba(255,255,255,0.9)' }}>₹{donor.amount.toLocaleString()}</span>
                </div>
              ))}
            </div>
          ) : (
            <p style={{ textAlign: 'center', opacity: 0.3 }}>NO RECORDS FOUND</p>
          )}
        </div>

        <div style={{ marginTop: '3rem', textAlign: 'center' }}>
          <button onClick={() => navigate('/')} className="btn btn-secondary" style={{ fontSize: '0.8rem' }}>
            BACK TO DASHBOARD
          </button>
        </div>
      </div>
    </div>
  );
};

export default Donors;

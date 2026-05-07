import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import QRCodeModal from '../components/QRCodeModal';

const SpiderMan = () => {
  const [name, setName] = useState('');
  const [amount, setAmount] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const navigate = useNavigate();
  const upiId = import.meta.env.VITE_UPI_ID;

  useEffect(() => {
    document.body.className = 'theme-spiderman';
    return () => { document.body.className = ''; };
  }, []);

  const handleDonateRequest = (e) => {
    e.preventDefault();
    if (!name || !amount) return;
    setIsModalOpen(true);
  };

  return (
    <div style={{ padding: '4rem 5%', minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <div style={{ maxWidth: '600px', width: '100%', textAlign: 'center' }}>
        <header style={{ marginBottom: '4rem' }}>
          <h1 style={{ 
            fontSize: '2.5rem', 
            fontWeight: '300', 
            letterSpacing: '8px', 
            marginBottom: '1.5rem', 
            color: '#ff3333' // Spiderman Red Title
          }}>
            THE SPIDER-MAN'S PHOTOGRAPHY PROJECT
          </h1>
          <p style={{ fontSize: '0.9rem', opacity: 0.8, lineHeight: '2', letterSpacing: '1px' }}>
            Support Peter's transition to professional photography. 
            A high-grade camera system is required for the Daily Bugle.
          </p>
        </header>

        <div style={{ 
          background: 'rgba(255, 255, 255, 0.1)', 
          padding: '3rem', 
          borderRadius: '12px',
          border: '1px solid rgba(255, 255, 255, 0.2)',
          backdropFilter: 'blur(10px)'
        }}>
          <form onSubmit={handleDonateRequest}>
            <input 
              type="text" 
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="YOUR NAME"
              required
              style={{ background: 'rgba(0,0,0,0.2)', border: '1px solid rgba(255,255,255,0.1)' }}
            />
            <input 
              type="number" 
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              placeholder="SUPPORT AMOUNT (INR)"
              required
              style={{ background: 'rgba(0,0,0,0.2)', border: '1px solid rgba(255,255,255,0.1)' }}
            />
            <button type="submit" className="btn">
              GENERATE PAYMENT QR
            </button>
          </form>
        </div>

        <div style={{ marginTop: '3rem' }}>
          <button onClick={() => navigate('/donors/spider-man')} className="btn btn-secondary" style={{ fontSize: '0.8rem' }}>
            VIEW RECENT DONORS
          </button>
        </div>
      </div>

      <QRCodeModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)}
        amount={amount}
        name={name}
        hero="spider-man"
        upiId={upiId}
      />
    </div>
  );
};

export default SpiderMan;

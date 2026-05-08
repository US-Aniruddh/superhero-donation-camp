import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Rain from '../components/Rain';
import QRCodeModal from '../components/QRCodeModal';
import batmanBg from '../assets/Batman_bg.png';

const Batman = () => {
  const [name, setName] = useState('');
  const [amount, setAmount] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const navigate = useNavigate();
  const upiId = import.meta.env.VITE_UPI_ID;

  useEffect(() => {
    document.body.className = 'theme-batman';
    return () => { document.body.className = ''; };
  }, []);

  const handleDonateRequest = (e) => {
    e.preventDefault();
    if (!name || !amount) return;
    setIsModalOpen(true);
  };

  return (
    <div style={{ padding: '4rem 5%', position: 'relative', minHeight: '100vh', overflow: 'hidden' }}>
      {/* Cinematic Background with Gaussian Blur */}
      <div style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        backgroundImage: `url(${batmanBg})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        filter: 'blur(8px) brightness(0.4)',
        zIndex: 0,
        pointerEvents: 'none'
      }} />
      
      <div style={{ position: 'relative', zIndex: 10 }}>
        <Rain />
      </div>
      
      <div style={{ maxWidth: '600px', margin: '0 auto', textAlign: 'center', position: 'relative', zIndex: 11 }}>
        <header style={{ marginBottom: '4rem' }}>
          <h1 style={{ fontSize: '2.5rem', fontWeight: '300', letterSpacing: '8px', marginBottom: '1.5rem' }}>
            THE BAT-MOBILE PROJECT
          </h1>
          <p style={{ fontSize: '0.9rem', opacity: 0.5, lineHeight: '2', letterSpacing: '1px' }}>
            Batman requires a Triumph Scrambler for rapid deployment. 
            The city of Gotham relies on your silent contribution.
          </p>
        </header>

        <div style={{ 
          background: 'rgba(255, 255, 255, 0.02)', 
          padding: '3rem', 
          borderRadius: '4px',
          border: '1px solid rgba(255, 255, 255, 0.05)'
        }}>
          <form onSubmit={handleDonateRequest}>
            <input 
              type="text" 
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="ANONYMOUS SOURCE"
              required
            />
            <input 
              type="number" 
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              placeholder="CONTRIBUTION AMOUNT (INR)"
              required
            />
            <button type="submit" className="btn">
              GENERATE SECURE QR
            </button>
          </form>
        </div>

        <div style={{ marginTop: '3rem' }}>
          <button onClick={() => navigate('/donors/batman')} className="btn btn-secondary" style={{ fontSize: '0.8rem' }}>
            VIEW RECENT CONTRIBUTORS
          </button>
        </div>
      </div>

      <QRCodeModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)}
        amount={amount}
        name={name}
        hero="batman"
        upiId={upiId}
      />
    </div>
  );
};

export default Batman;

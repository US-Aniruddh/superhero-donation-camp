import React, { useState } from 'react';
import { QRCodeSVG } from 'qrcode.react';
import axios from 'axios';
import confetti from 'canvas-confetti';
import { useNavigate } from 'react-router-dom';

const QRCodeModal = ({ isOpen, onClose, amount, name, hero, upiId }) => {
  const [isVerifying, setIsVerifying] = useState(false);
  const [status, setStatus] = useState('pending'); // pending, success, failed
  const navigate = useNavigate();

  if (!isOpen) return null;

  const upiUrl = `upi://pay?pa=${upiId}&pn=${hero === 'spider-man' ? 'SpiderManDonation' : 'BatmanDonation'}&am=${amount}&cu=INR`;

  const handleConfirmPayment = async () => {
    setIsVerifying(true);
    
    // Simulate a slight delay for "verification"
    setTimeout(async () => {
      try {
        await axios.post('/api/donate', {
          name,
          amount: Number(amount),
          hero
        });
        
        setStatus('success');
        confetti({
          particleCount: 150,
          spread: 70,
          origin: { y: 0.6 }
        });
      } catch (error) {
        console.error('Save error:', error);
        setStatus('failed');
      } finally {
        setIsVerifying(false);
      }
    }, 2000);
  };

  const handleFinalClose = () => {
    const isSuccess = status === 'success';
    setStatus('pending'); // Reset for next time
    onClose();
    if (isSuccess) {
      navigate('/');
    }
  };

  return (
    <div className="modal-overlay" style={{ zIndex: 10000 }}>
      <div className="modal-content" style={{ 
        background: '#0a0a0a', 
        border: '1px solid rgba(255, 255, 255, 0.1)',
        color: 'white',
        padding: '3rem'
      }}>
        {status === 'pending' && (
          <>
            <h2 style={{ fontSize: '1.2rem', fontWeight: '300', letterSpacing: '4px', marginBottom: '2rem' }}>
              SECURE PAYMENT GATEWAY
            </h2>
            <div style={{ background: 'white', padding: '1.5rem', display: 'inline-block', borderRadius: '4px', marginBottom: '2rem' }}>
              <QRCodeSVG value={upiUrl} size={180} />
            </div>
            <p style={{ fontSize: '0.8rem', opacity: 0.5, marginBottom: '2rem' }}>
              Scan with any UPI app to complete your ₹{amount} contribution.
            </p>
            <button 
              onClick={handleConfirmPayment} 
              disabled={isVerifying}
              className="btn"
            >
              {isVerifying ? 'VERIFYING TRANSACTION...' : 'I HAVE COMPLETED PAYMENT'}
            </button>
            <button 
              onClick={onClose} 
              style={{ background: 'transparent', border: 'none', color: 'white', marginTop: '1rem', cursor: 'pointer', opacity: 0.3, fontSize: '0.7rem' }}
            >
              CANCEL TRANSACTION
            </button>
          </>
        )}

        {status === 'success' && (
          <div style={{ animation: 'fadeIn 0.5s ease' }}>
            <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>✓</div>
            <h2 style={{ fontSize: '1.2rem', fontWeight: '300', letterSpacing: '4px', marginBottom: '1rem' }}>
              TRANSACTION SECURED
            </h2>
            <p style={{ fontSize: '0.9rem', opacity: 0.5, marginBottom: '2rem' }}>
              Your contribution has been verified. The {hero === 'spider-man' ? 'Spider' : 'Bat'} thanks you.
            </p>
            <button onClick={handleFinalClose} className="btn">
              RETURN TO BASE
            </button>
          </div>
        )}

        {status === 'failed' && (
          <div style={{ animation: 'fadeIn 0.5s ease' }}>
            <div style={{ fontSize: '3rem', marginBottom: '1rem', color: '#ff4444' }}>✕</div>
            <h2 style={{ fontSize: '1.2rem', fontWeight: '300', letterSpacing: '4px', marginBottom: '1rem' }}>
              PAYMENT FAILED
            </h2>
            <p style={{ fontSize: '0.9rem', opacity: 0.5, marginBottom: '2rem' }}>
              We could not verify your transaction. Please ensure the payment was successful on your device.
            </p>
            <button onClick={() => setStatus('pending')} className="btn">
              RETRY VERIFICATION
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default QRCodeModal;

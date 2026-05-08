import React, { useState } from 'react';
import { QRCodeSVG } from 'qrcode.react';
import axios from 'axios';
import confetti from 'canvas-confetti';
import { useNavigate } from 'react-router-dom';

const QRCodeModal = ({ isOpen, onClose, amount, name, hero, upiId }) => {
  const [isVerifying, setIsVerifying] = useState(false);
  const [status, setStatus] = useState('pending'); // pending, success, failed
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();

  if (!isOpen) return null;

  const upiUrl = `upi://pay?pa=${upiId}&pn=${hero === 'spider-man' ? 'SpiderManDonation' : 'BatmanDonation'}&am=${amount}&cu=INR`;

  const handleConfirmPayment = async () => {
    setIsVerifying(true);
    setErrorMessage('');
    
    // Use hero-specific endpoint
    const endpoint = hero === 'spider-man' ? '/api/spiderman-donate' : '/api/batman-donate';

    try {
      const response = await axios.post(endpoint, {
        name,
        amount: Number(amount)
      }, {
        timeout: 10000 // 10 second timeout
      });
      
      if (response.data.success) {
        setStatus('success');
        confetti({
          particleCount: 150,
          spread: 70,
          origin: { y: 0.6 }
        });
      } else {
        throw new Error('Server responded with failure');
      }
    } catch (error) {
      console.error('Save error:', error);
      setStatus('failed');
      if (error.code === 'ECONNABORTED') {
        setErrorMessage('Connection timed out. Please check your internet and retry.');
      } else if (error.response?.data?.error) {
        setErrorMessage(error.response.data.error);
      } else {
        setErrorMessage('Could not verify your transaction. Please try again.');
      }
    } finally {
      setIsVerifying(false);
    }
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
        padding: '3rem',
        maxWidth: '500px',
        width: '90%',
        borderRadius: '20px',
        boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5)',
        textAlign: 'center',
        position: 'relative',
        overflow: 'hidden'
      }}>
        {/* Progress Bar for Loading */}
        {isVerifying && (
          <div style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '4px',
            background: 'rgba(255, 255, 255, 0.1)',
            overflow: 'hidden'
          }}>
            <div style={{
              width: '100%',
              height: '100%',
              background: hero === 'spider-man' ? '#ff3333' : '#ffd700',
              animation: 'loadingProgress 2s infinite ease-in-out'
            }} />
          </div>
        )}

        {status === 'pending' && (
          <>
            <h2 style={{ fontSize: '1.2rem', fontWeight: '300', letterSpacing: '4px', marginBottom: '2rem', color: hero === 'spider-man' ? '#ff3333' : '#ffd700' }}>
              SECURE PAYMENT GATEWAY
            </h2>
            <div style={{ 
              background: 'white', 
              padding: '1.5rem', 
              display: 'inline-block', 
              borderRadius: '12px', 
              marginBottom: '2rem',
              boxShadow: '0 0 20px rgba(255,255,255,0.1)'
            }}>
              <QRCodeSVG value={upiUrl} size={180} />
            </div>
            <p style={{ fontSize: '0.8rem', opacity: 0.6, marginBottom: '2rem', lineHeight: '1.6' }}>
              Scan with any UPI app to complete your contribution of <br />
              <strong style={{ fontSize: '1.2rem', color: 'white' }}>₹{amount}</strong>
            </p>
            
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              <button 
                onClick={handleConfirmPayment} 
                disabled={isVerifying}
                className="btn"
                style={{ 
                  background: isVerifying ? 'rgba(255,255,255,0.05)' : (hero === 'spider-man' ? '#ff3333' : '#ffd700'),
                  color: hero === 'spider-man' ? 'white' : 'black',
                  fontWeight: '600',
                  padding: '1rem',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '10px'
                }}
              >
                {isVerifying && (
                  <div className="spinner" style={{ 
                    width: '16px', 
                    height: '16px', 
                    border: '2px solid rgba(255,255,255,0.3)', 
                    borderTop: '2px solid white', 
                    borderRadius: '50%',
                    animation: 'spin 0.8s linear infinite'
                  }} />
                )}
                {isVerifying ? 'VERIFYING...' : 'I HAVE COMPLETED PAYMENT'}
              </button>
              <button 
                onClick={onClose} 
                disabled={isVerifying}
                style={{ 
                  background: 'transparent', 
                  border: 'none', 
                  color: 'white', 
                  cursor: isVerifying ? 'not-allowed' : 'pointer', 
                  opacity: 0.3, 
                  fontSize: '0.75rem',
                  letterSpacing: '2px'
                }}
              >
                CANCEL TRANSACTION
              </button>
            </div>
          </>
        )}

        {status === 'success' && (
          <div style={{ animation: 'fadeIn 0.5s ease' }}>
            <div style={{ 
              fontSize: '4rem', 
              marginBottom: '1.5rem', 
              color: '#4ade80',
              textShadow: '0 0 20px rgba(74, 222, 128, 0.3)'
            }}>✓</div>
            <h2 style={{ fontSize: '1.5rem', fontWeight: '300', letterSpacing: '4px', marginBottom: '1rem' }}>
              PAYMENT VERIFIED
            </h2>
            <p style={{ fontSize: '0.9rem', opacity: 0.6, marginBottom: '2.5rem' }}>
              Your contribution has been successfully recorded in our secure database. <br />
              The {hero === 'spider-man' ? 'Spider' : 'Dark Knight'} is grateful.
            </p>
            <button onClick={handleFinalClose} className="btn" style={{ background: '#4ade80', color: 'black', fontWeight: '600' }}>
              RETURN TO DASHBOARD
            </button>
          </div>
        )}

        {status === 'failed' && (
          <div style={{ animation: 'fadeIn 0.5s ease' }}>
            <div style={{ 
              fontSize: '4rem', 
              marginBottom: '1.5rem', 
              color: '#f87171',
              textShadow: '0 0 20px rgba(248, 113, 113, 0.3)'
            }}>✕</div>
            <h2 style={{ fontSize: '1.5rem', fontWeight: '300', letterSpacing: '4px', marginBottom: '1rem' }}>
              VERIFICATION FAILED
            </h2>
            <p style={{ fontSize: '0.9rem', opacity: 0.7, marginBottom: '2rem', color: '#f87171' }}>
              {errorMessage}
            </p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              <button onClick={() => handleConfirmPayment()} className="btn" style={{ background: '#f87171', color: 'white' }}>
                RETRY VERIFICATION
              </button>
              <button 
                onClick={() => setStatus('pending')} 
                style={{ background: 'transparent', border: 'none', color: 'white', opacity: 0.5, cursor: 'pointer' }}
              >
                BACK TO QR CODE
              </button>
            </div>
          </div>
        )}

        <style>{`
          @keyframes spin { to { transform: rotate(360deg); } }
          @keyframes loadingProgress {
            0% { transform: translateX(-100%); }
            100% { transform: translateX(100%); }
          }
          @keyframes fadeIn { from { opacity: 0; transform: translateY(10px); } to { opacity: 1; transform: translateY(0); } }
        `}</style>
      </div>
    </div>
  );
};

export default QRCodeModal;


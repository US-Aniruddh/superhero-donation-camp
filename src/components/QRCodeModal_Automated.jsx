/**
 * PAYMENT AUTOMATION TEMPLATE (FRONTEND)
 * 
 * This is a template showing how to use Socket.io to listen for payment success.
 */

import React, { useEffect, useState } from 'react';
import { io } from 'socket.io-client';

const socket = io('http://localhost:5000'); // Your backend URL

const QRCodeModalAutomated = ({ orderId, amount, onVerified }) => {
    const [status, setStatus] = useState('waiting');

    useEffect(() => {
        if (!orderId) return;

        // Listen for the specific event for this order
        const eventName = `payment_success_${orderId}`;
        
        socket.on(eventName, (data) => {
            if (data.status === 'success') {
                setStatus('verified');
                onVerified(); // Trigger confetti, etc.
            }
        });

        return () => socket.off(eventName);
    }, [orderId]);

    return (
        <div>
            {status === 'waiting' ? (
                <p>Waiting for payment of ₹{amount}...</p>
            ) : (
                <p style={{ color: 'green' }}>✓ Payment Verified Automatically!</p>
            )}
        </div>
    );
};

export default QRCodeModalAutomated;

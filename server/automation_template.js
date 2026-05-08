/**
 * PAYMENT AUTOMATION TEMPLATE (BACKEND)
 * 
 * How to use:
 * 1. Install dependencies: npm install razorpay socket.io
 * 2. Integrate the logic below into your main server.js
 */

import Razorpay from 'razorpay';
import { Server } from 'socket.io';
import crypto from 'crypto';

// 1. Initialize Razorpay
const razorpay = new Razorpay({
    key_id: process.env.RAZORPAY_KEY_ID,
    key_secret: process.env.RAZORPAY_KEY_SECRET,
});

// 2. Setup Socket.io (In your main server.js)
// const io = new Server(server, { cors: { origin: "*" } });

/**
 * API: Create Order
 * Called when user clicks "Generate Secure QR"
 */
app.post('/api/create-order', async (req, res) => {
    try {
        const { amount, name, hero } = req.body;
        const options = {
            amount: amount * 100, // Amount in paise
            currency: "INR",
            receipt: `receipt_${Date.now()}`,
            notes: { name, hero }
        };

        const order = await razorpay.orders.create(options);
        res.json(order);
    } catch (error) {
        res.status(500).send(error);
    }
});

/**
 * WEBHOOK: Payment Verification
 * This is called by Razorpay servers automatically when payment is successful.
 * Point your Razorpay Dashboard Webhook URL to: https://your-ngrok-url.com/api/webhook
 */
app.post('/api/webhook', async (req, res) => {
    const secret = process.env.RAZORPAY_WEBHOOK_SECRET;
    
    // Verify Webhook Signature
    const shasum = crypto.createHmac('sha256', secret);
    shasum.update(JSON.stringify(req.body));
    const digest = shasum.digest('hex');

    if (digest === req.headers['x-razorpay-signature']) {
        console.log('Payment Verified via Webhook');
        const { payload } = req.body;
        const orderId = payload.payment.entity.order_id;
        const notes = payload.payment.entity.notes;

        // 1. Save to Database
        await saveDonation({
            name: notes.name,
            amount: payload.payment.entity.amount / 100,
            hero: notes.hero
        });

        // 2. Notify Frontend via WebSockets
        // io.emit(`payment_success_${orderId}`, { status: 'success' });

        res.json({ status: 'ok' });
    } else {
        res.status(400).send('Invalid signature');
    }
});

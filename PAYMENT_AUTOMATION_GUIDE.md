# Real-Time Payment Automation Guide

This guide explains how to transition from "Simulated Verification" to "Real-Time Automated Verification" using Razorpay and WebSockets.

## 1. Prerequisites
- **Razorpay Account**: Sign up at [razorpay.com](https://razorpay.com) (Test Mode is fine).
- **Ngrok**: Install ngrok to expose your localhost to the internet so Razorpay can send Webhooks to your machine.
  ```bash
  npm install -g ngrok
  ngrok http 5000
  ```

## 2. Install Required Dependencies
Run this in your terminal:
```bash
npm install razorpay socket.io socket.io-client
```

## 3. Environment Setup
Add these to your `.env` file:
```env
RAZORPAY_KEY_ID=your_key_here
RAZORPAY_KEY_SECRET=your_secret_here
RAZORPAY_WEBHOOK_SECRET=a_random_string_of_your_choice
```

## 4. How the Flow Works
1. **Frontend**: Instead of a static QR, the frontend calls the backend to create a "Razorpay Order".
2. **Backend**: Calls Razorpay API to generate a unique order and returns the `order_id`.
3. **Frontend**: Displays the QR code (or opens the Razorpay checkout).
4. **Webhook**: When the payment is successful, Razorpay sends a POST request to your `/api/webhook` endpoint.
5. **WebSockets (Socket.io)**: The backend receives the webhook and "emits" a message: `socket.emit('payment-success', { orderId })`.
6. **Frontend**: The `QRCodeModal` is listening for this event. As soon as it hears it, it shows the success state and confetti automatically.

## 5. Implementation Template
Check `server/automation_template.js` for the backend code structure.
Check `src/components/QRCodeModal_Automated.jsx` (template) for the frontend logic.

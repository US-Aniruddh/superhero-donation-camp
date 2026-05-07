# SuperHero Donation Camp 🕷️🦇

A visually stunning, superhero-themed donation platform built with React, Express, and MongoDB.

## Features
- **Dynamic Superhero Themes**: Dedicated UI/UX for Spider-Man (Red/Blue comic style) and Batman (Dark Gotham style).
- **Home Page Modes**: Light mode (Spidey-inspired) and Dark mode (Batman-inspired).
- **Dynamic QR Generation**: Generates UPI QR codes based on donor name and amount.
- **Donor Leaderboard**: Real-time list of donors stored in MongoDB (with JSON fallback).
- **Responsive Design**: Fully optimized for mobile and desktop.
- **Premium Aesthetics**: Glassmorphism, animations, and custom fonts.

## Tech Stack
- **Frontend**: React + Vite + Vanilla CSS
- **Backend**: Node.js + Express
- **Database**: MongoDB Atlas (with local JSON fallback)
- **Deployment**: Vercel (Frontend) + Render/Railway (Backend)

## Setup Instructions

### 1. Prerequisites
- Node.js installed
- MongoDB installed locally OR a MongoDB Atlas URI

### 2. Installation
```bash
# Clone the repository
git clone <your-repo-link>
cd superhero-donation-camp

# Install dependencies
npm install
```

### 3. Environment Setup
Create a `.env` file in the root directory:
```env
VITE_UPI_ID=aniruddhaus58@okaxis
MONGODB_URI=mongodb://localhost:27017/?authMechanism=DEFAULT
```

### 4. Running Locally
Run both frontend and backend concurrently:
```bash
npm run dev:all
```
- Frontend: `http://localhost:5173`
- Backend: `http://localhost:5000`

## Deployment

### Frontend (Vercel)
1. Push your code to GitHub.
2. Import the project in Vercel.
3. Set environment variables: `VITE_UPI_ID`.

### Backend (Render)
1. Create a new Web Service on Render.
2. Connect your GitHub repo.
3. Set Build Command: `npm install`
4. Set Start Command: `node server/server.js`
5. Set environment variables: `MONGODB_URI`.

---
*Created with ❤️ for Superheroes and Donors.*

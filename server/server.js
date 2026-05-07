import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { connectDB, saveDonation, getDonations } from './db.js';

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

// Connect DB (Mongo or Fallback)
connectDB();

app.post('/api/donate', async (req, res) => {
    try {
        const { name, amount, hero } = req.body;
        if (!name || !amount || !hero) {
            return res.status(400).json({ error: 'Missing required fields' });
        }
        
        const donation = await saveDonation({ name, amount, hero });
        res.status(201).json({ success: true, donation });
    } catch (error) {
        console.error('Error saving donation:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

app.get('/api/donors/:hero', async (req, res) => {
    try {
        const { hero } = req.params;
        const donations = await getDonations(hero);
        res.status(200).json(donations);
    } catch (error) {
        console.error('Error fetching donations:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

export default app;

// Start the server if running locally
if (process.env.NODE_ENV !== 'production') {
    const PORT = process.env.PORT || 5000;
    app.listen(PORT, () => {
        console.log(`Server running on port ${PORT}`);
    });
}

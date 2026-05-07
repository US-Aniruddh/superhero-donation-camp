import mongoose from 'mongoose';
import fs from 'fs';
import path from 'path';

export const connectDB = async () => {
    if (process.env.MONGODB_URI) {
        try {
            await mongoose.connect(process.env.MONGODB_URI);
            console.log('MongoDB connected successfully');
        } catch (error) {
            console.error('MongoDB connection error:', error);
            console.log('Falling back to local JSON database');
        }
    } else {
        console.log('No MONGODB_URI provided. Using local JSON database.');
    }
};

const JSON_DB_PATH = path.join(process.cwd(), 'server', 'donations.json');

// Initialize JSON DB if it doesn't exist
const initJSONDb = () => {
    if (!fs.existsSync(JSON_DB_PATH)) {
        try {
            // Ensure server directory exists
            const dir = path.join(process.cwd(), 'server');
            if (!fs.existsSync(dir)) fs.mkdirSync(dir);
            fs.writeFileSync(JSON_DB_PATH, JSON.stringify([]));
        } catch (e) {
            console.error("Could not create JSON db:", e);
        }
    }
};

export const saveDonation = async (donation) => {
    if (mongoose.connection.readyState === 1) {
        // Use MongoDB
        const Donation = mongoose.models.Donation || mongoose.model('Donation', new mongoose.Schema({
            name: String,
            amount: Number,
            hero: String, // 'spider-man' or 'batman'
            date: { type: Date, default: Date.now }
        }));
        const newDonation = new Donation(donation);
        await newDonation.save();
        return newDonation;
    } else {
        // Use JSON
        initJSONDb();
        const data = JSON.parse(fs.readFileSync(JSON_DB_PATH, 'utf-8'));
        const newDonation = { ...donation, _id: Date.now().toString(), date: new Date().toISOString() };
        data.push(newDonation);
        fs.writeFileSync(JSON_DB_PATH, JSON.stringify(data, null, 2));
        return newDonation;
    }
};

export const getDonations = async (hero) => {
    if (mongoose.connection.readyState === 1) {
        // Use MongoDB
        const Donation = mongoose.models.Donation || mongoose.model('Donation', new mongoose.Schema({
            name: String,
            amount: Number,
            hero: String,
            date: { type: Date, default: Date.now }
        }));
        return await Donation.find({ hero }).sort({ date: -1 });
    } else {
        // Use JSON
        initJSONDb();
        const data = JSON.parse(fs.readFileSync(JSON_DB_PATH, 'utf-8'));
        return data.filter(d => d.hero === hero).sort((a, b) => new Date(b.date) - new Date(a.date));
    }
};

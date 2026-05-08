import { dbConnect, SpiderManDonor } from '../lib/mongodb.js';

export default async function handler(req, res) {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    await dbConnect();
    const donors = await SpiderManDonor.find({}).sort({ timestamp: -1 });
    res.status(200).json(donors);
  } catch (error) {
    console.error('API Error (Spider-Man Donors):', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
}

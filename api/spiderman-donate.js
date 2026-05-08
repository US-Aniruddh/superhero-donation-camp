import { dbConnect, SpiderManDonor } from '../lib/mongodb.js';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    await dbConnect();
    const { name, amount } = req.body;

    // Validation
    if (!name || !amount) {
      return res.status(400).json({ error: 'Missing name or amount' });
    }

    if (isNaN(amount) || amount <= 0) {
      return res.status(400).json({ error: 'Invalid amount' });
    }

    const newDonor = new SpiderManDonor({
      name,
      amount: Number(amount),
    });

    await newDonor.save();

    res.status(201).json({ success: true, donor: newDonor });
  } catch (error) {
    console.error('API Error (Spider-Man Donate):', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
}

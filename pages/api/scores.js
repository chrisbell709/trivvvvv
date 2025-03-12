import { connectToDatabase } from '../../lib/mongodb';

export default async function handler(req, res) {
  const { db } = await connectToDatabase();
  
  if (req.method === 'GET') {
    try {
      const scores = await db
        .collection('scores')
        .find({})
        .sort({ score: -1 })
        .limit(10)
        .toArray();
      
      res.status(200).json(scores);
    } catch (error) {
      console.error('Error fetching scores:', error);
      res.status(500).json({ error: 'Failed to fetch scores' });
    }
  } else if (req.method === 'POST') {
    try {
      const { username, score, date } = req.body;
      
      const result = await db.collection('scores').insertOne({
        username,
        score,
        date,
      });
      
      res.status(201).json({ success: true, id: result.insertedId });
    } catch (error) {
      console.error('Error saving score:', error);
      res.status(500).json({ error: 'Failed to save score' });
    }
  } else {
    res.setHeader('Allow', ['GET', 'POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}

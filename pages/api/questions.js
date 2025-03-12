import { getQuestionOfTheDay } from '../../lib/questions';

export default async function handler(req, res) {
  if (req.method === 'GET') {
    try {
      const question = await getQuestionOfTheDay();
      res.status(200).json(question);
    } catch (error) {
      console.error('Error fetching question:', error);
      res.status(500).json({ error: 'Failed to fetch question' });
    }
  } else {
    res.setHeader('Allow', ['GET']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}

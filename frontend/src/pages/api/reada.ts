import { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'GET') {
    try {
      res.status(200).json({ message: 'Success' });
    } catch (error) {
      console.error('Error:', error);
      res.status(500).json({ error: 'Failed to process the request' });
    }
  } else {
    res.status(405).json({ error: 'Method Not Allowed' });
  }
}

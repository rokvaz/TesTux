import { NextApiRequest, NextApiResponse } from 'next';
import { getDataFromDatabase } from '../../utils/sql';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'GET') {
    try {
      const { pavadinimas } = req.query;
      if (!pavadinimas) {
        throw new Error('name parameter is missing');
      }
      const id = await getIdByName(pavadinimas.toString());
      res.status(200).send(String(id));
    } catch (error) {
      console.error('Error reading data from the database:', error);
      res.status(500).json({ error: 'Failed to read data from the database' });
    }
  } else {
    res.status(405).json({ error: 'Method Not Allowed' });
  }
}

const getIdByName = async (pavadinimas: string) => {
  try {
    const allData = await getDataFromDatabase('Testai');

    const item = allData.find(item => item.pavadinimas === pavadinimas);
    const id = item ? item.id : null;

    return id;
  } catch (error) {
    console.error('Error retrieving ID by name:', error);
    throw new Error('Failed to retrieve ID by name');
  }
};

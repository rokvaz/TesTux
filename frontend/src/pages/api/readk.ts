import { NextApiRequest, NextApiResponse } from 'next';
import { getDataFromDatabase } from '../../utils/sql';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'GET') {
    try {
      const { tekstas } = req.query;
      if (!tekstas) {
        throw new Error('text parameter is missing');
      }
      const id = await getIdByText(tekstas.toString());
      if (id !== null) {
        res.status(200).json({ id: id });
      } else {
        res.status(404).json({ error: 'Record not found' });
      }
    } catch (error) {
      console.error('Error reading data from the database:', error);
      res.status(500).json({ error: 'Failed to read data from the database' });
    }
  } else {
    res.status(405).json({ error: 'Method Not Allowed' });
  }
}

const getIdByText = async (tekstas: string) => {
  try {
    const allData = await getDataFromDatabase('klausimai');

    const item = allData.find(item => item.tekstas === tekstas);
    const id = item ? item.id : null;

    return id;
  } catch (error) {
    console.error('Error retrieving ID by text:', error);
    throw new Error('Failed to retrieve ID by text');
  }
};

import { NextApiRequest, NextApiResponse } from 'next';
import { writeDataToDatabase, getDataFromDatabase } from '../../utils/sql';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    try {
      const highestId = await getHighestIdFromDatabase('klausimai');
      const newData = { ...req.body, id: highestId + 1 };
      await writeDataToDatabase('klausimai', newData);
      res.status(200).json({ message: 'Data successfully written to the database' });
    } catch (error) {
      console.error('Error writing data to the database:', error);
      res.status(500).json({ error: 'Failed to write data to the database' });
    }
  } else {
    res.status(405).json({ error: 'Method Not Allowed' });
  }
}

const getHighestIdFromDatabase = async (tableName: string): Promise<number> => {
  try {
    const data = await getDataFromDatabase(tableName);
    let highestId = 0;
    for (const row of data) {
      if (row.id > highestId) {
        highestId = row.id;
      }
    }
    return highestId;
  } catch (error) {
    console.error('Error retrieving highest ID from the database:', error);
    throw new Error('Failed to retrieve highest ID from the database');
  }
};

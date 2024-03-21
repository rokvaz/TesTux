import { getDataFromDatabase, query } from '../../utils/sql';
import { ReactNode } from 'react';
import { RowDataPacket } from 'mysql2';

interface MySQLReadTestProps {
  data: any[][];
  headers: string[];
}

export default function MySQLReadTest({ data, headers }: MySQLReadTestProps): ReactNode {
  return (
    <div>
      <h1>MySQL Read Test</h1>
      <table>
        <thead>
          <tr>
            {headers.map((header, index) => (
              <th key={index}>{header}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.map((row, rowIndex) => (
            <tr key={rowIndex}>
              {row.map((cell, cellIndex) => (
                <td key={cellIndex}>{cell}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export async function getServerSideProps() {
  const tableName = 'Rezultatai';
  try {
    const data = await getDataFromDatabase(tableName) as RowDataPacket[];
    const columns = await query(`SHOW COLUMNS FROM ${tableName}`, []);
    const headers = (columns as RowDataPacket[]).map(column => column.Field);
    const formattedData = data.map(row => Object.values(row));
    
    return {
      props: {
        data: formattedData,
        headers,
      },
    };
  } catch (error) {
    console.error('Error fetching data:', error);
    return {
      props: {
        data: [],
        headers: [],
      },
    };
  }
}
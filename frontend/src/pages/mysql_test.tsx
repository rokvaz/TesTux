import { connectToMySQL, RowDataPacket } from '../utils/sql';
import { GetServerSideProps } from 'next';

interface MySQLData {
  
}

interface MysqlTestProps {
  data: MySQLData[]; 
}

export default function MysqlTest({ data }: MysqlTestProps) {
  const connectionStatus = data.length > 0 ? "Connection successful" : "Connection failed";
  
  return (
    <div>
      <h1>MySQL Test Page</h1>
      <p>{connectionStatus}</p>
    </div>
  );
}

export const getServerSideProps: GetServerSideProps<MysqlTestProps> = async () => {
  const connection = await connectToMySQL();
  const [rows] = await connection.execute<RowDataPacket[]>('SELECT * FROM Testai');
  await connection.end();

  
  const transformedData: MySQLData[] = rows.map(row => ({
    
  }));

  return {
    props: {
      data: transformedData,
    },
  };
};
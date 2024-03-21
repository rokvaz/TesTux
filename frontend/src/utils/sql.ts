import { createPool, Pool, RowDataPacket } from 'mysql2/promise';

let pool: Pool;

function initializePool() {
  if (!pool) {
    pool = createPool({
      host: process.env.MYSQL_HOST,
      user: process.env.MYSQL_USER,
      password: process.env.MYSQL_PASSWORD,
      database: process.env.MYSQL_DATABASE,
    });
  }
}

export async function query<T extends RowDataPacket[]>(
  sql: string,
  values?: any[]
): Promise<T> {
  initializePool();
  const connection = await pool.getConnection();
  try {
    const [rows] = await connection.query<T>(sql, values);
    return rows;
  } finally {
    connection.release();
  }
}

export async function getDataFromDatabase(tableName: string): Promise<RowDataPacket[]> {
  try {
    const sql = `SELECT * FROM ${tableName}`;
    const data = await query<RowDataPacket[]>(sql);
    return data;
  } catch (error) {
    console.error('Error executing query:', error);
    throw new Error('Error executing query');
  }
}

interface DataObject {
  [key: string]: any;
}

export async function writeDataToDatabaseSpecial(tableName: string, data: Record<string, any>): Promise<void> {
  initializePool();
  const connection = await pool.getConnection();
  try {
    // Adjust the column order and naming convention
    const parts = JSON.stringify(data).split(',')[2].split(':')[1].split('"');
    //console.log('Received data from the database:', JSON.stringify(data).split(',')[2]); // Log received data
    //console.log('Received data from the database:', JSON.stringify(data).split(',')[2].split(':')[1]); // Log received data
    //console.log('Received data from the database:', parts[1]); // Log received data
    //console.log('Received data from the database:', JSON.stringify(data)); // Log received data
    const test = parts[1];
    const sql = `INSERT INTO \`${tableName}\` (\`tekstas\`, \`id\`, \`klausimo_id\`, \`teisingas\`) VALUES (?, ?, ?, ?)`;
    const values = [data.tekstas, data.id, data.klausimo_id, parseInt(test)];
    
    // Execute the INSERT query
    await connection.query(sql, values);

    // Log success message
    console.log('Data successfully written to the database');
  } catch (error) {
    // Log error and throw exception
    console.error('Error writing data to the database:', error);
    throw new Error('Failed to write data to the database');
  } finally {
    connection.release();
  }
}



export async function writeDataToDatabase(tableName: string, data: Record<string, any>): Promise<void> {
  initializePool();
  const connection = await pool.getConnection();
  try {
    const columns = Object.keys(data).map(key => `\`${key}\``);
    const placeholders = Object.keys(data).map(() => '?').join(', ');
    const sql = `INSERT INTO \`${tableName}\` (${columns.join(', ')}) VALUES (${placeholders})`;
    const values = Object.values(data);
    
    // Execute the INSERT query
    await connection.query(sql, values);

    // Log success message
    console.log('Data successfully written to the database');
  } catch (error) {
    // Log error and throw exception
    console.error('Error writing data to the database:', error);
    throw new Error('Failed to write data to the database');
  } finally {
    connection.release();
  }
}
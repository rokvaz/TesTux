import mysql, { Connection, RowDataPacket } from 'mysql2/promise';

// Raw MySQL connection parameters
const MYSQL_HOST = 'your_mysql_host';
const MYSQL_USER = 'your_mysql_user';
const MYSQL_PASSWORD = 'your_mysql_password';
const MYSQL_DATABASE = 'your_mysql_database';

export async function connectToMySQL(): Promise<Connection> {
  try {
    const connection = await mysql.createConnection({
      host: MYSQL_HOST,
      user: MYSQL_USER,
      password: MYSQL_PASSWORD,
      database: MYSQL_DATABASE,
    });
    console.log('Connected to MySQL database successfully.');
    return connection;
  } catch (error) {
    console.error('Error connecting to MySQL:', error);
    throw error;
  }
}

export { RowDataPacket };
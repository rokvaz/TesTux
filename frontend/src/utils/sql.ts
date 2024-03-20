import mysql, { Connection } from 'mysql2/promise';
import { RowDataPacket as MySQLRowDataPacket } from 'mysql2';
import dotenv from 'dotenv';
import path from 'path';

dotenv.config({ path: path.resolve(__dirname, 'config.env') });

export async function connectToMySQL(): Promise<Connection> {
  try {
    const connection = await mysql.createConnection({
      host: process.env.MYSQL_HOST,
      user: process.env.MYSQL_USER,
      password: process.env.MYSQL_PASSWORD,
      database: process.env.MYSQL_DATABASE,
    });
    console.log('Connected to MySQL database successfully.');
    return connection;
  } catch (error) {
    console.error('Error connecting to MySQL:', error);
    throw error;
  }
}

export type RowDataPacket = MySQLRowDataPacket;
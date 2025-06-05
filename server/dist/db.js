import { config } from "dotenv";
import { Pool } from "pg";
config();
const pool = new Pool({
    user: process.env.DB_USER,
    host: process.env.DB_HOST,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME,
    port: Number(process.env.DB_PORT),
});
export const initDB = async () => {
    const createCommentsTable = async () => {
        await pool.query(`
        CREATE TABLE IF NOT EXISTS Comments (
          id SERIAL PRIMARY KEY,
          comment TEXT NOT NULL,
          username TEXT NOT NULL,
          movieId INT NOT NULL,
          createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        )`);
        console.log("Comments table created successfully");
    };
    const createUsersTable = async () => {
        await pool.query(`
        CREATE TABLE IF NOT EXISTS Users (
          id SERIAL PRIMARY KEY,
          email VARCHAR(255) NOT NULL UNIQUE,
          name VARCHAR(255),
          createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        )`);
        console.log("Users table created successfully");
    };
    try {
        await createCommentsTable();
        await createUsersTable();
    }
    catch (err) {
        console.log("Error creating table : ", err);
    }
};
export default pool;

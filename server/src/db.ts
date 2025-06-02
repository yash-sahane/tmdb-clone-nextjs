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
  console.log(process.env.PORT);

  try {
    await pool.query(`
        CREATE TABLE IF NOT EXISTS Comments (
          id SERIAL PRIMARY KEY,
          comment TEXT NOT NULL,
          user_name TEXT NOT NULL,
          created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        )`);

    console.log("Comments table created successfully");
  } catch (err) {
    console.log("Error creating table : ", err);
  }
};

export default pool;

import pkg from "pg";
import dotenv from "dotenv";

dotenv.config();

const { Pool } = pkg;

const pool = new Pool({
  user: "postgres",
  host: "localhost",
  database: "exam",
  password: "root",
  port: 5432,
});

pool
  .connect()
  .then(() => console.log(" PostgreSQL database connected successfully!"))
  .catch((err) => console.error(" Database connection failed:", err.message));

export default pool;

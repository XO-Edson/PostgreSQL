import pkg from "pg";
import dotenv from "dotenv";

const { Pool } = pkg;

dotenv.config();

const pool = new Pool({
  user: "postgres",
  host: "localhost",
  database: "postgres",
  password: process.env.PASSWORD,
  port: process.env.PORT,
});

pool.on("connect", () => {
  console.log("Connected to database");
});

pool.on("error", (err) => {
  console.error("Unexpected db error", err);
  process.exit(-1);
});

export default pool;

const { Pool } = require("pg");
require("dotenv").config();

let pool;

if (process.env.DATABASE_URL) {
  console.log("Using DATABASE_URL"); // 👈 add this
  pool = new Pool({
    connectionString: process.env.DATABASE_URL,
    ssl: { rejectUnauthorized: false },
  });

} else {

  pool = new Pool({
    user: process.env.DB_USER,
    host: process.env.DB_HOST || "localhost",
    database: process.env.DB_NAME,
    password: process.env.DB_PASSWORD,
    port: process.env.DB_PORT || 543,
  });
}

pool.connect()
  .then(() => console.log("DB Connected"))
  .catch(err => console.error("DB Connection Error:", err.message));

module.exports = pool;
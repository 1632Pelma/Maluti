const express = require("express");
const cors = require("cors");
const pool = require("./config/db"); // 👈 import db

const app = express();

app.use(cors());
app.use(express.json());

/* =========================
   AUTO CREATE TABLE + SEED
========================= */

// Create table if it doesn't exist
pool.query(`
  CREATE TABLE IF NOT EXISTS campuses (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100),
    location VARCHAR(150),
    contact_email VARCHAR(100),
    contact_phone VARCHAR(20),
    image VARCHAR(255)
  );
`)
.then(() => console.log("Campuses table ready"))
.catch(err => console.error("Table error:", err));

// Insert default data ONLY if table is empty
pool.query(`
  INSERT INTO campuses (name, location, contact_email, contact_phone, image)
  SELECT 'Main Campus', 'Bloemfontein', 'main@college.co.za', '0511234567', '/images/hero.png'
  WHERE NOT EXISTS (SELECT 1 FROM campuses);

  INSERT INTO campuses (name, location, contact_email, contact_phone, image)
  SELECT 'Harrismith Campus', 'Harrismith', 'harrismith@college.co.za', '0589876543', '/images/Hari.png'
  WHERE NOT EXISTS (SELECT 1 FROM campuses WHERE name='Harrismith Campus');
`)
.then(() => console.log("Default data inserted"))
.catch(err => console.error("Insert error:", err));

/* =========================
   TEST ROUTE
========================= */
app.get("/", (req, res) => {
  res.send("Backend is running");
});

/* =========================
   API ROUTES
========================= */
app.use("/api/campuses", require("./routes/campuses"));

/* =========================
   START SERVER
========================= */
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
const pool = require("../config/db");

exports.getCampuses = async (req, res) => {
  try {
    const result = await pool.query("SELECT * FROM campuses");
    res.json(result.rows);
  } catch (err) {
    console.error("DB ERROR:", err);
    res.status(500).json({ error: err.message });
  }
};
const pool = require("../config/db");

exports.getCampuses = async (req, res) => {
  try {
    const result = await pool.query("SELECT * FROM campuses ORDER BY id ASC");
    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
};
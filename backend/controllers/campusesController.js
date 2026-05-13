const pool = require("../config/db");

exports.getCampuses = async (req, res) => {
  try {
    const result = await pool.query("SELECT * FROM campuses ORDER BY id ASC");
    res.json(result.rows);
  } catch (err) {
    console.error("ERROR:", err);
    res.status(500).json({ error: err.message });
  }
};

exports.addCampus = async (req, res) => {
  const { name, location, contact_email, contact_phone, image } = req.body;
  if (!name || !location) {
    return res.status(400).json({
      error: "Name and location are required",
    });
  }

  try {
    const result = await pool.query(
      `INSERT INTO campuses (name, location, contact_email, contact_phone, image)
       VALUES ($1, $2, $3, $4, $5)
       RETURNING *`,
      [name, location, contact_email || null, contact_phone || null, image || null]
    );

    res.status(201).json(result.rows[0]);
  } catch (err) {
    console.error("ADD CAMPUS ERROR:", err);
    res.status(500).json({ error: "Failed to add campus" });
  }
};




exports.deleteCampus = async (req, res) => {
  const { id } = req.params;

  try {
    const result = await pool.query(
      "DELETE FROM campuses WHERE id = $1 RETURNING *",
      [id]
    );

    if (result.rowCount === 0) {
      return res.status(404).json({ error: "Campus not found" });
    }

    res.json({ message: "Campus deleted", campus: result.rows[0] });
  } catch (err) {
    console.error("DELETE ERROR:", err);
    res.status(500).json({ error: "Failed to delete campus" });
  }
};

exports.updateCampus = async (req, res) => {
  const { id } = req.params;
  const { name, location, contact_email, contact_phone, image } = req.body;

  try {
    const result = await pool.query(
      `UPDATE campuses 
       SET name=$1, location=$2, contact_email=$3, contact_phone=$4, image=$5
       WHERE id=$6
       RETURNING *`,
      [name, location, contact_email, contact_phone, image, id]
    );

    if (result.rowCount === 0) {
      return res.status(404).json({ error: "Campus not found" });
    }

    res.json(result.rows[0]);
  } catch (err) {
    console.error("UPDATE ERROR:", err);
    res.status(500).json({ error: "Failed to update campus" });
  }
};


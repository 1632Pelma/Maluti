const express = require("express");
const router = express.Router();

const {
  getCampuses,
  addCampus,
  deleteCampus,
  updateCampus
} = require("../controllers/campusesController");

// GET all campuses
router.get("/", getCampuses);

// ADD campus
router.post("/", addCampus);

// DELETE campus (optional but recommended)
router.delete("/:id", deleteCampus);

// UPDATE campus (optional but recommended)
router.put("/:id", updateCampus);

module.exports = router;
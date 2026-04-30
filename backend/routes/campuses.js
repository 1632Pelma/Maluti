const express = require("express");
const router = express.Router();

const { getCampuses } = require("../controllers/campusesController");

router.get("/", getCampuses);

module.exports = router;
const express = require("express");
const router = express.Router();
const departure = require("../data/departuresTable.json");

router.get("/", (req, res) => {
  res.json(departure);
});

module.exports = router;

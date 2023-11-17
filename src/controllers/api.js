const express = require("express");
const router = express.Router();
const { createApiRecordInCatalog } = require("./apiController");

router.post("/create-record", createApiRecordInCatalog);

module.exports = router;

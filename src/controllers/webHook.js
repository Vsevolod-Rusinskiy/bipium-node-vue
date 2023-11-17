const express = require("express");
const router = express.Router();
const { updateOrder, createOrder } = require("./webHookController");

router.post("/update-order", updateOrder);
router.post("/create-order", createOrder);

module.exports = router;

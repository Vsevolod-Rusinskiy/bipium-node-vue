const express = require('express');
const router = express.Router();
const bpService = require('../bpiumService');

// Пример маршрута
router.post('/update-order', async (req, res) => {
    const { recordId, catalogId } = req.body.payload;
    console.log(recordId, catalogId)
    // логика для обновления комментария
    res.status(200).send('Webhook received');
});

module.exports = router;
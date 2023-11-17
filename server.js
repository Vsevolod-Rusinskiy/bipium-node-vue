require('dotenv').config();
const express = require('express');
const webhookRoutes = require('./src/controllers/webHook');
const apiRoutes = require('./src/controllers/api');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
    res.send('A-rent Backend is Running');
});

app.use('/webhook', webhookRoutes);
app.use('/api', apiRoutes);

const PORT = process.env.PORT || 3000;

app.listen(PORT, async () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});

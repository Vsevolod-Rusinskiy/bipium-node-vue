require('dotenv').config();
const express = require('express');
const webhookRoutes = require('./src/routes/webHook');
const someApiCall = require('./src/apiCalls');

const app = express();

app.use(express.json());



app.get('/', (req, res) => {
    res.send('A-rent Backend is Running');
});

app.use('/webhook', webhookRoutes);




const PORT = process.env.PORT || 3000;
// app.listen(PORT, () => {
//     console.log(`Server is running on http://localhost:${PORT}`);
// });
app.listen(PORT, async () => {
    console.log(`Server is running on http://localhost:${PORT}`);
    try {
        const response = await someApiCall();
        console.log('API Call Response:', response);
    } catch (error) {
        console.error('API Call Failed:', error);
    }
});

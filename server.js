
import express from 'express';
import fetch, { Headers } from 'node-fetch';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.static('public'));

app.get('/api/uv', async (req, res) => {
    try {
        const lat = req.query.lat;
        const lng = req.query.lng;
        const alt = 100;  // Default altitude
        const dt = '';  // Current date and time

        const myHeaders = new Headers();
        myHeaders.append("x-access-token", process.env.OPENUV_API_KEY);
        myHeaders.append("Content-Type", "application/json");

        const requestOptions = {
            method: 'GET',
            headers: myHeaders,
            redirect: 'follow'
        };

        const response = await fetch(`https://api.openuv.io/api/v1/uv?lat=${lat}&lng=${lng}&alt=${alt}&dt=${dt}`, requestOptions);
        const result = await response.json();

        res.json(result);
    } catch (error) {
        console.error('Error fetching UV data:', error);
        res.status(500).json({ error: error.message });
    }
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});


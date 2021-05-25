const express = require('express');
const router = express.Router();
const axios = require('axios').default;
const dotenv = require('dotenv').config(); 
const rapid_api_key = process.env.RAPID_API_KEY;
const rapid_api_host = process.env.RAPID_API_HOST;

const get5Day3Hour = async () => {
    try {
        const options = {
            method: 'GET',
            url: 'https://community-open-weather-map.p.rapidapi.com/forecast',
            params: {
                q: 'Indianapolis'
            },
            headers: {
                'x-rapidapi-key': rapid_api_key,
                'x-rapidapi-host': rapid_api_host
            }
        };
    
        const res = await axios.request(options);
        return res.data;
    } catch (error) {
        return error;
    };
};

// @router GET /api/get5Day3Hour
// @Desc Get the 5 day / 3 hour forecast data by city
router.use('/', (req, res) => {
    get5Day3Hour().then(data => {
        res.send({ response: data });
    });
});

module.exports = router;
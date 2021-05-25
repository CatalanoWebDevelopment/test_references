const express = require('express');
const router = express.Router();
const axios = require('axios').default;
const dotenv = require('dotenv').config();
const rapid_api_key = process.env.RAPID_API_KEY;
const rapid_api_host = process.env.RAPID_API_HOST;

const getCurrentWeather = async () => {
    try {
        const options = {
            method: 'GET',
            url: 'https://community-open-weather-map.p.rapidapi.com/weather',
            params: {
                q: 'Indianapolis',
                lat: '',
                lon: '',
                callback: '',
                id: '',
                lang: 'null',
                units: 'imperial',
                mode: ''
            },
            headers: {
                'x-rapidapi-key': rapid_api_key,
                'x-rapidapi-host': rapid_api_host,
                'useQueryString': true
            }
        };

        const res = await axios.request(options);
        return res.data;
    } catch (error) {
        return error;
    };
}; 

// @route GET /api/getCurrentWeather
// @desc Get current weather based on multiple arguments: { q: City, State, lat: latitude, lon: longitude, callback: potential transfer callback function, id: if you know the city ID, lang: [en, ru, it, sp, ua, de, pt, ro, pl, fi, nl, fr, bg, se, zhtw, zhcn, tr], units: 'metric or imperial', mode: leave blank for JSON or 'xml' / 'html'
router.get('/', (req, res) => {
    getCurrentWeather().then(data => {
        res.send({ response: data });
    });
});

module.exports = router;
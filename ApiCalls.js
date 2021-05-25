// AXIOS
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

getCurrentWeather().then(data => {
    console.log("Current Weather: ", data);
});

async function get5Day3Hour() {
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

get5Day3Hour().then(data => {
    console.log("This is the 5 Day, 3 Hour Forecast: ", data);
});

const checkBreaches = async (email) => {
	try {
		const res = await axios.get(`https://hackcheck.woventeams.com/api/v4/breachedaccount/${email}`);
			console.log("RES", res)
		return res.data;
	} catch(error) {
			console.log("error", error)
		return error;
	};
};

const breaches = checkBreaches("catalano.work@gmail.com").then(data => {
    console.log(data);
})
const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const app = express();

// Routes
const getCurrentWeather = require('./routes/api/getCurrentWeather');
const get5Day3Hour = require('./routes/api/get5Day3Hour');

// Server Config 
const port = process.env.PORT || 5000;

// Middleware 
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Routes
app.use('/api/getCurrentWeather', getCurrentWeather);
app.use('/api/get5Day3Hour', get5Day3Hour);

if (process.env.NODE_ENV === "production") {
    // Do Something
};

// Listen
app.listen(port, () => console.info(`Currently listening on Port:${port}`));
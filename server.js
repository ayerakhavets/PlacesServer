const bodyParser = require('body-parser');
const express = require('express');
const places = require('./routes/places');

global.timeLog = () => `[${new Date().toLocaleString()}]`;

// Create the express app
const app = express();

// Configure the body-parser to accept urlencoded bodies and json data
app.use(bodyParser.json())
    .use(bodyParser.urlencoded({ extended: true }))
    .use(bodyParser.raw({
        type: function() {
            return true;
        },
        limit: '5mb'
    }));


// To handle "no'Access-Control-Allow-Origin' header is present on the requested resource"
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
    res.header("Access-Control-Allow-Headers",
        "Origin, X-Requested-With, Content-Type, Accept");
    next()
});

app.use(function(req, res, next) {
    console.log(`${timeLog()} connection accepted from ${req.ip} { url: "${req.url}", type: "${req.method}"}`);
    next()
});

// Register routes
// this routes are prefixed with /places
app.use('/places', places);


module.exports = app;
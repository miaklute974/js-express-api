require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const { log, ExpressAPILogMiddleware } = require('@rama41222/node-logger');
const axios = require('axios');


const config = {
    name: 'js-express-api',
    port: 3000,
    host: '0.0.0.0',
};

const API_URL = 'https://api.app.shortcut.com/api/v3';
const HEADERS = {
    "Content-Type": "Application/json",
    "Shortcut-Token": process.env.SHORTCUT_API_TOKEN
};

const app = express();
const logger = log({ console: true, file: false, label: config.name });

app.use(bodyParser.json());
app.use(ExpressAPILogMiddleware(logger, { request: true }));

// Routes
app.get('/', (req, res) => {
    //res.status(200).send('Docker');
    res.json({ "foo": "bar" });
});


app.post('/webhook', (req, res) => {
    //TODO: Parse data, grab what we need from shortcut, send it to google sheets API.
    var body = req.body;
    res.send(body);

    // Need to check for : "story_type", as well as if the story is still completed after a certain amount of time. Background request after x seconds/minutes?
    axios.post('https://webhook.site/fab5af00-2101-4a55-92e6-d73b79b3d1a5', JSON.stringify(body.actions[0].id)) // this seems stupid but axios bitched
        .then((res) => {
            console.log(`Status: ${res.status}`);
            console.log('Body: ', res.data);
        }).catch((err) => {
            console.error(err);
        });

});



app.listen(config.port, config.host, (e) => {
    if (e) {
        throw new Error('Internal Server Error');
    }

    logger.info(`${config.name} running on ${config.host}:${config.port}`);
});

//https://webhook.site/ to test live webhook
//Insomnia to test locally



require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const { log, ExpressAPILogMiddleware } = require('@rama41222/node-logger');
const {sendToSheets, writeGoogleSheet} = require("./google/googlesheets") ;
const webhook = require('./routes/webhook');

const config = {
    name: 'js-express-api',
    port: 3000,
    host: '0.0.0.0',
};


const app = express();
const logger = log({ console: true, file: false, label: config.name });

// Middleware
app.use(bodyParser.json());
app.use(ExpressAPILogMiddleware(logger, { request: true }));
app.use('/webhook', webhook);

app.listen(config.port, config.host, (e) => {
    if (e) {
        throw new Error('Internal Server Error');
    }

    logger.info(`${config.name} running on ${config.host}:${config.port}`);
});

//https://webhook.site/ to test live webhook
//Insomnia to test locally



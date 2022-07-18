require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const { log, ExpressAPILogMiddleware } = require('@rama41222/node-logger');
const {sendToSheets, writeGoogleSheet} = require("./google/googlesheets") //sendToSheets is only called when debugging


const config = {
    name: 'js-express-api',
    port: 3000,
    host: '0.0.0.0',
};


const app = express();
const logger = log({ console: true, file: false, label: config.name });

app.use(bodyParser.json());
app.use(ExpressAPILogMiddleware(logger, { request: true }));

// Routes
app.get('/', (req, res) => {
    res.json({ "sanity": "check" });
});

//https://shortcut.com/api/webhook/v1#Clubhouse-Outgoing-Webhooks
//handle webhook from shortcut, call function to send to sheets
app.post('/webhook', async (req, res) => {
    var body = req.body;
    await writeGoogleSheet(body.actions[0].id);
    res.send(body);
});



app.listen(config.port, config.host, (e) => {
    if (e) {
        throw new Error('Internal Server Error');
    }

    logger.info(`${config.name} running on ${config.host}:${config.port}`);
});

//https://webhook.site/ to test live webhook
//Insomnia to test locally



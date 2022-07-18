require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const { log, ExpressAPILogMiddleware } = require('@rama41222/node-logger');
const axios = require('axios');
const { google } = require("googleapis");
const {sendToSheets, writeGoogleSheet, getEpic, getOwner, getStory} = require("./funcs/shortcut")


const config = {
    name: 'js-express-api',
    port: 3000,
    host: '0.0.0.0',
};

const WEBHOOK_SITE_URL = 'https://webhook.site/55975038-ffb3-4ee9-80b8-e4ad79c1a0e8'
const API_URL = 'https://api.app.shortcut.com/api/v3';
const HEADERS = {
    "Content-Type": "Application/json",
    "Shortcut-Token": process.env.SHORTCUT_API_TOKEN
};


/******************************Google Sheets*************************************/

// https://console.developers.google.com/iam-admin/iam/ create a service account, 
// share with the service accounts email.
// ny-googlesheets-bot@swift-climate-317917.iam.gserviceaccount.com

const auth = new google.auth.GoogleAuth({
    keyFile: "creds.json", //the key file
    //url to spreadsheets API
    scopes: "https://www.googleapis.com/auth/spreadsheets",
});

//Auth client Object
const authClientObject = auth.getClient();

//Google sheets instance
const googleSheetsInstance = google.sheets({ version: "v4", auth: authClientObject });
const spreadsheetId = "1tZH-jH4pXOu13nU1m9WA_FuxranFRd-rBGkEdVptfrQ";

/********************************************************************************/


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



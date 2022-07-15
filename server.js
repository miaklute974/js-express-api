require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const { log, ExpressAPILogMiddleware } = require('@rama41222/node-logger');
const axios = require('axios');
const { google } = require("googleapis");


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


//simulating sending to sheets to webhook.site
async function sendToSheets(id) {
    await getStory(id).then((res) => {
        sheets = axios.post(WEBHOOK_SITE_URL, JSON.stringify(res))
            .then((res) => {
                console.log(`Status: ${res.status}`);
            }).catch((err) => {
                console.error(err);
            });
    });

};


async function writeGoogleSheet(id) {
    //write data into the google sheets
    await getStory(id).then((res) => {
        console.log(res)
        if (res[2] == "chore" || res[5] == 'false') {
            console.log(`{story_type: ${res[2]}, is_complete: ${res[5]}}`)
            return false
        }

        googleSheetsInstance.spreadsheets.values.append({
            auth,
            spreadsheetId,
            range: "Sheet1!A:Z", //sheet name and range of cells
            valueInputOption: "USER_ENTERED", // The information will be passed according to what the user passes in as date, number or text
            resource: {
                values: [res],
            }
        }).then((res) => {
            console.log(`Status: ${res.status}`);
        }).catch((err) => {
            console.error(err);
        });

    });



};

//grabs story ID (from shortcut webhook) and generates a payload to be sent to googlesheets api
async function getStory(id) {

    const config = {
        method: 'get',
        url: `https://api.app.shortcut.com/api/v3/stories/${id}`,
        headers: HEADERS
    }

    let res = await axios(config)

    owner = await getOwner(res.data.owner_ids[0])
    requester = await getOwner(res.data.requested_by_id)
    epic = await getEpic(res.data.epic_id)

    let story = [
        res.data.id,
        res.data.name,
        res.data.story_type,
        requester.name,
        owner.name,
        res.data.completed.toString(),
        res.data.external_links.toString(),
        res.data.epic_id,
        epic.name
    ]

    return story

};


// TODO: make this filter on a specific ID. I believe this returns a list of owners. Defaulting to the first index of the JSON within getStory() currently.
async function getOwner() {

    const config = {
        method: 'get',
        url: `https://api.app.shortcut.com/api/v3/member`,
        headers: HEADERS
    }

    let res = await axios(config)

    return { 'name': res.data.name }
};


async function getEpic(id) {

    const config = {
        method: 'get',
        url: `https://api.app.shortcut.com/api/v3/epics/${id}`,
        headers: HEADERS
    }

    let res = await axios(config)

    return { 'name': res.data.name }
};


app.listen(config.port, config.host, (e) => {
    if (e) {
        throw new Error('Internal Server Error');
    }

    logger.info(`${config.name} running on ${config.host}:${config.port}`);
});

//https://webhook.site/ to test live webhook
//Insomnia to test locally



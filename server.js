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
    res.json({ "sanity": "check" });
});

//handle webhook from shortcut, call function to send to sheets
app.post('/webhook',  async (req, res) => {
    var body = req.body;
    await sendToSheets(body.actions[0].id)
    res.send(body);
});


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

    let story = {
        'story_id': res.data.id,
        'story_name': res.data.name,
        'story_type': res.data.story_type,
        'requester_id': requester.name,
        'owners': owner.name,
        'is_completed': res.data.completed,
        'external_tickets': res.data.external_links,
        'epic_id': res.data.epic_id,
        'epic_name': epic.name
    }

    //console.log(story);
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

//simulating sending to sheets
async function sendToSheets(id) {
    await getStory(id).then((res) => {
        sheets = axios.post('https://webhook.site/9f6005cd-4464-4140-a1a9-aa3c391d173b', JSON.stringify(res)) // this seems stupid but axios bitched
            .then((res) => {
                console.log(`Status: ${res.status}`);
            }).catch((err) => {
                console.error(err);
            });
    });
    

    // console.log(story);
};





// story =  getStory(13)
// console.log(story)
// getEpic(12)


//https://api.app.shortcut.com/api/v3/stories/{story-public-id}

app.listen(config.port, config.host, (e) => {
    if (e) {
        throw new Error('Internal Server Error');
    }

    logger.info(`${config.name} running on ${config.host}:${config.port}`);
});

//https://webhook.site/ to test live webhook
//Insomnia to test locally



const axios = require('axios');


const WEBHOOK_SITE_URL = 'https://webhook.site/55975038-ffb3-4ee9-80b8-e4ad79c1a0e8'
const API_URL = 'https://api.app.shortcut.com/api/v3';
const HEADERS = {
    "Content-Type": "Application/json",
    "Shortcut-Token": process.env.SHORTCUT_API_TOKEN
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

module.exports = { getEpic, getOwner, getStory }
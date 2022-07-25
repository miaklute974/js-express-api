const axios = require('axios');

const HEADERS = {
    "Content-Type": "Application/json",
    "Shortcut-Token": process.env.SHORTCUT_API_TOKEN
};


//grabs story ID (from shortcut webhook) and generates a payload to be sent to /webhook route
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

    story = {
        story_id: res.data.id,
        name: res.data.name,
        story_type: res.data.story_type,
        requester_name: requester.name,
        owner_name: owner.name,
        is_completed: res.data.completed.toString(),
        external_links: res.data.external_links.toString(),
        epic_id: res.data.epic_id,
        epic_name: epic.name,
    }
    console.log(`Returning story from getStory(). Story = ${JSON.stringify(story, null, 4)}`)

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
const axios = require('axios');
require('dotenv').config();


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
    console.log(`res is ${res.data}`)

    owner = await getOwner(res.data.owner_ids[0])
    requester = await getOwner(res.data.requested_by_id)
    epic = await getEpic(res.data.epic_id)

    try{
        story = {
            story_id: res.data.id,
            name: res.data.name,
            story_type: res.data.story_type,
            requester_name: requester.data.name,
            owner_name: owner.data.name,
            is_completed: res.data.completed.toString(),
            external_links: res.data.external_links.toString(),
            epic_id: epic.data.id, 
            epic_name: epic.data.name 
        }
        console.log(`Returning story from getStory(). Story = ${JSON.stringify(story, null, 4)}`)
        return story

    } catch{
        console.log('Error forming story object.')
        return false
    }

};


// TODO: make this filter on a specific ID. I believe this returns a list of owners. Defaulting to the first index of the JSON within getStory() currently.
async function getOwner() {

    const config = {
        method: 'get',
        url: `https://api.app.shortcut.com/api/v3/member`,
        headers: HEADERS
    }

    try {
        let res = await axios(config)
        return res

    } catch {
        epic = { "name": "N/A" }
        return epic
    }

}


async function getEpic(id) {

    const config = {
        method: 'get',
        url: `https://api.app.shortcut.com/api/v3/epics/${id}`,
        headers: HEADERS
    }

    try {
        let res = await axios(config)
        return res

    } catch {
        epic = { "name": "N/A", "id": "N/A" }
        return epic

    }







    //return { 'name': res.data.name }

};

module.exports = { getEpic, getOwner, getStory }



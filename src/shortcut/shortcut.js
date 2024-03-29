const axios = require('axios');
const _ = require('lodash')
require('dotenv').config();

const HEADERS = {
    "Content-Type": "Application/json",
    "Shortcut-Token": process.env.SHORTCUT_API_TOKEN
};


/* returns current iteration */
async function getCurrentIteration() {

    const config = {
        method: 'get',
        url: `https://api.app.shortcut.com/api/v3/iterations`,
        headers: HEADERS
    }

    //this fails without the callbacks, and the outer return... ?:(
    let iteration = await axios(config)
        .then((res) => {
            // console.log(JSON.stringify(res.data, null, 4))
            return JSON.stringify(res.data[0].id)
        }).catch((error) => {
            console.log(error);
        });

    return await iteration
};


/* Returns an iteration's story id's in an array given an iteration ID */
async function getIterationStoryIDs(id) {

    const config = {
        method: 'get',
        url: `https://api.app.shortcut.com/api/v3/iterations/${id}/stories`,
        headers: HEADERS
    }

    storyIDArray = []

    let stories = await axios(config)

    return await stories
};

// TODO : check for complete: true and story_type: chore
async function getIterationStories() {

    let storyArray = []

    const id = await getCurrentIteration()
    const storiesObj = await getIterationStoryIDs(id)

    const storiesArray = storiesObj.data

    storiesArray.forEach(element => {
        storyArray.push([
            element.id,
            element.name,
            element.story_type,
            element.requested_by_id.toString(),
            element.owner_ids.toString(),
            element.completed,
            element.external_links.toString(),
            element.epic_id,
            'Epic Name'
        ])

    });

    console.log(storyArray)
    return storyArray
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

    try {
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
        return story

    } catch {
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
};


module.exports = { getEpic, getOwner, getStory, getIterationStories }



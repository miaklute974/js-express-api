
const express = require("express");
const axios = require('axios');
const { getStory } = require("../shortcut/shortcut");
const router = express.Router()
require('./../shortcut/shortcut')

//https://shortcut.com/api/webhook/v1#Clubhouse-Outgoing-Webhooks
//handle webhook from shortcut, call function to end to DB
router.post('/webhook', async (req, res) => {
    const storyID = req.body.primary_id
    console.log(storyID)

    story = await getStory(req.body.primary_id)
    //console.log(`Received ${story}`)
    try{
        await axios.put('http://localhost:3000/stories', story)
    }catch{
        console.log(`Failed to add story to DB from /webhook`)
    }
    
    res.send(story);
});


module.exports = router;

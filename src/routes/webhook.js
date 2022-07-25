
const express = require("express");
const { getStory } = require("./../shortcut/shortcut");
const router = express.Router()
const axios = require('axios');

//https://shortcut.com/api/webhook/v1#Clubhouse-Outgoing-Webhooks
//handle webhook from shortcut, call function to end to DB
router.post('/webhook', async (req, res) => {
    body = req.body
    console.log(body.primary_id)

    story = await getStory(body.primary_id)

    // this needs way more testing, it will usually fail on promises if the object isn't fully constructed due to lack of epic information
    await axios.put('http://localhost:3000/stories', story)

    res.send(story);
});


module.exports = router;

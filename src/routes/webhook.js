
const express = require("express");
const axios = require('axios');
const router = express.Router()



//https://shortcut.com/api/webhook/v1#Clubhouse-Outgoing-Webhooks
//handle webhook from shortcut, call function to end to DB
router.post('/webhook', async (req, res) => {

    story = {
        story_id: req.body.story_id,
        name: req.body.name,
        story_type: req.body.story_type,
        requester_name: req.body.requester_name,
        owner_name: req.body.owner_name,
        is_completed: req.body.is_completed,
        external_links: req.body.external_links,
        epic_id: req.body.epic_id,
        epic_name: req.body.epic_name,
    }

    await axios.put('http://localhost:3000/stories', story)
    
    res.send(story);
});


module.exports = router;

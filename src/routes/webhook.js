
const express = require("express");
const {writeGoogleSheet} = require('../google/google-sheet')
// const {sendToSheets, writeGoogleSheet} = require("./google/googlesheets") 
const router = express.Router()

//https://shortcut.com/api/webhook/v1#Clubhouse-Outgoing-Webhooks
//handle webhook from shortcut, call function to send to sheets
router.post('/', async (req, res) => {
    var body = req.body;
    await writeGoogleSheet(body.actions[0].id);
    res.send(body);
});


module.exports = router;

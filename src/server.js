require('dotenv').config();
const fs = require('fs');
var cors = require('cors')
const express = require('express');
const bodyParser = require('body-parser');
const { log, ExpressAPILogMiddleware } = require('@rama41222/node-logger');
const webhook = require('./routes/webhook');
const storiesRouter = require('./routes/stories');
const url = require("./google/google-oauth-generate-url")
const token = require("./google/google-oauth-get-tokens")
const sheet = require("./google/google-sheet")



const config = {
    name: 'js-express-api',
    port: 3000,
    host: '0.0.0.0',
};


const app = express();
const logger = log({ console: true, file: false, label: config.name });

// Middleware
app.use(bodyParser.json());
app.use(ExpressAPILogMiddleware(logger, { request: true }));
app.use(cors())
app.use('/stories', storiesRouter)

//grab code from sign in to oauth link
app.get('/auth', async (req, res) => {
    auth_url = await url.generateUrl()
    res.redirect(auth_url)

});


// I should probably create a route to generate a token, otherwise we are generating the token over and over...
app.get('/', async (req, res) => {
    var code = req.query.code;
    console.log(code)

    // oauth_token = await token.getToken(code)
    try {
        await sheet.writeGoogleSheet()
    } catch (error) {
        console.log(error);
        await token.getToken(code)

        console.log('Trying again...')
        await sheet.writeGoogleSheet()
    }

    res.redirect("/success")

});


//test if we were successful
app.get('/success', async (req, res) => {
    res.json({ "Auth": "Success" });
});


app.listen(config.port, config.host, (e) => {
    if (e) {
        throw new Error('Internal Server Error');
    }
    logger.info(`${config.name} running on ${config.host}:${config.port}`);
});
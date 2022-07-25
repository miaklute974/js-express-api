require('dotenv').config();
const fs = require('fs');
var cors = require('cors')
const express = require('express');
const bodyParser = require('body-parser');
const { log, ExpressAPILogMiddleware } = require('@rama41222/node-logger');
const webhookRouter = require('./routes/webhook');
const storiesRouter = require('./routes/stories');
const googleRouter = require('./routes/google');
const oAuthTokensRouter = require('./routes/oauth_tokens');


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
app.use('/oauth_tokens', oAuthTokensRouter)
app.use('/', googleRouter)
app.use('/', webhookRouter)


app.listen(config.port, config.host, (e) => {
    if (e) {
        throw new Error('Internal Server Error');
    }
    logger.info(`${config.name} running on ${config.host}:${config.port}`);
});
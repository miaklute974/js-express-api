require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const { log, ExpressAPILogMiddleware } = require('@rama41222/node-logger');

const config = {
    name: 'js-express-api',
    port: 3000,
    host: '0.0.0.0',
};

const app = express();
const logger = log({ console: true, file: false, label: config.name });

app.use(bodyParser.json());
app.use(cors());
app.use(ExpressAPILogMiddleware(logger, { request: true }));

// Routes
app.get('/', (req, res) => {
    //res.status(200).send('Docker');
    res.json({ "foo": "bar" });
});


app.post('/webhook',  (req, res) => {
    //TODO: Parse data, grab what we need from shortcut, send it to google sheets API.
    var body = req.body;
    res.send(body.id);
    console.log(body.id)
    
});



app.listen(config.port, config.host, (e) => {
    if (e) {
        throw new Error('Internal Server Error');
    }

    logger.info(`${config.name} running on ${config.host}:${config.port}`);
});

//https://webhook.site/ to test live webhook
//Insomnia to test locally
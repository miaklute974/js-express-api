const fs = require('fs');
require('dotenv').config();
const { google } = require('googleapis');



const getToken = async (code) => {
    const redirectUris = ['http://localhost:3000', 'http://localhost:3000/success']
    const oAuth2Client = new google.auth.OAuth2(
        process.env.GOOGLE_CLIENT_ID, process.env.GOOGLE_CLIENT_SECRET, redirectUris[0],
    );

    const { tokens } = await oAuth2Client.getToken(code);
    console.info(tokens);
    fs.writeFileSync(`${__dirname}\\google-oauth-token.json`, JSON.stringify(tokens), { encoding: 'utf8', flag: 'w' });
};


module.exports = { getToken }
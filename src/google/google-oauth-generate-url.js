require('dotenv').config();
const { google } = require('googleapis');


async function generateUrl() {

    const redirectUris = ['http://localhost:3000', 'http://localhost:3000/success']
    const oAuth2Client = new google.auth.OAuth2(
        process.env.GOOGLE_CLIENT_ID, process.env.GOOGLE_CLIENT_SECRET, redirectUris[0],
    );

    const SCOPES = [
        'https://www.googleapis.com/auth/spreadsheets',
    ];

    const url = oAuth2Client.generateAuthUrl({
        access_type: 'offline',
        scope: SCOPES,
    });

    console.info(`authUrl: ${url}`);

    return url
}

module.exports = { generateUrl }
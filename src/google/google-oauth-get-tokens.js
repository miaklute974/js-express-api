const fs = require('fs');
const { google } = require('googleapis');

// Replace with the code you've got from the previous step
const code = '4/0AdQt8qjR4uXIvUxWtoMyrS3rjuB9C0e9dWhG1xFh5T2G0nascoPkwMMjyxHs60xzt6DQoQ';

const credentials = JSON.parse(fs.readFileSync('google-client-secret.json', 'utf-8'));

const {
    client_secret: clientSecret,
    client_id: clientId,
    redirect_uris: redirectUris,
} = credentials.installed;

const oAuth2Client = new google.auth.OAuth2(
    clientId, clientSecret, redirectUris[0],
);

const getToken = async () => {
    const { tokens } = await oAuth2Client.getToken(code);
    console.info(tokens);
    fs.writeFileSync('google-oauth-token.json', JSON.stringify(tokens));
};

getToken();
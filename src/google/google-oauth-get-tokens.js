const fs = require('fs');
const { google } = require('googleapis');

// Replace with the code you've got from the previous step
// const code = '4/0AdQt8qgCr9uBebihgrzwvyG2i1tcKyFq4w7cgTwivtmrlmxkWgD1ahxg4z29b_voxC2Vcw';

//abs path
const credentials = JSON.parse(fs.readFileSync('C:\\Users\\NetYield Support\\js\\js-express-api\\src\\google\\google-client-secret.json', 'utf-8'));

const {
    client_secret: clientSecret,
    client_id: clientId,
    redirect_uris: redirectUris,
} = credentials.installed;

const oAuth2Client = new google.auth.OAuth2(
    clientId, clientSecret, redirectUris[0],
);

const getToken = async (code) => {
    const { tokens } = await oAuth2Client.getToken(code);
    console.info(tokens);
    fs.writeFileSync('google-oauth-token.json', JSON.stringify(tokens));
};

// getToken();

module.exports = { getToken }
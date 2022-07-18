const { google } = require("googleapis");
const { getStory } = require("../shortcut/shortcut")

/******************************Google Sheets*************************************/

// https://console.developers.google.com/iam-admin/iam/ create a service account, 
// share with the service accounts email.

const auth = new google.auth.GoogleAuth({
    // keyFile: "creds.json", //the key file
    //url to spreadsheets API
    scopes: "https://www.googleapis.com/auth/spreadsheets",
});

//Auth client Object
const authClientObject = auth.getClient();

//Google sheets instance
const googleSheetsInstance = google.sheets({ version: "v4", auth: authClientObject });
const spreadsheetId = process.env.GOOGLE_SPREADSHEET_ID

/********************************************************************************/


//Used with Shortcut webhook URL to capture data for local debugging.
async function sendToSheets(id) {
    await getStory(id).then((res) => {
        sheets = axios.post(WEBHOOK_SITE_URL, JSON.stringify(res))
            .then((res) => {
                console.log(`Status: ${res.status}`);
            }).catch((err) => {
                console.error(err);
            });
    });

};


async function writeGoogleSheet(id) {
    //write data into the google sheets
    await getStory(id).then((res) => {
        console.log(res)
        if (res[2] == "chore" || res[5] == 'false') {
            console.log(`{story_type: ${res[2]}, is_complete: ${res[5]}}`)
            return false
        }

        googleSheetsInstance.spreadsheets.values.append({
            auth,
            spreadsheetId,
            range: "Sheet2!A:Z", //sheet name and range of cells. Sheetname should be a variable, naming the sheets should be standardized
            valueInputOption: "USER_ENTERED", // The information will be passed according to what the user passes in as date, number or text
            resource: {
                values: [res], //this is actually an array of arrays
            }
        }).then((res) => {
            console.log(`Status: ${res.status}`);
            return true
        }).catch((err) => {
            console.error(err);
        });

    });



};


module.exports = { auth, authClientObject, googleSheetsInstance, spreadsheetId, writeGoogleSheet, sendToSheets }
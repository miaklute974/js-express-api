const { google } = require("googleapis");
const { getStory } = require("./../funcs/shortcut")
/******************************Google Sheets*************************************/

// https://console.developers.google.com/iam-admin/iam/ create a service account, 
// share with the service accounts email.
// ny-googlesheets-bot@swift-climate-317917.iam.gserviceaccount.com

const auth = new google.auth.GoogleAuth({
    keyFile: "creds.json", //the key file
    //url to spreadsheets API
    scopes: "https://www.googleapis.com/auth/spreadsheets",
});

//Auth client Object
const authClientObject = auth.getClient();

//Google sheets instance
const googleSheetsInstance = google.sheets({ version: "v4", auth: authClientObject });
const spreadsheetId = "1tZH-jH4pXOu13nU1m9WA_FuxranFRd-rBGkEdVptfrQ";

/********************************************************************************/

//simulating sending to sheets google via  webhook.site
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
            range: "Sheet1!A:Z", //sheet name and range of cells
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


module.exports = { auth, authClientObject, googleSheetsInstance, spreadsheetId, writeGoogleSheet, sendToSheets}
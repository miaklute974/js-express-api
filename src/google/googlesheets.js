const { google } = require("googleapis");

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


module.exports = {auth, authClientObject, googleSheetsInstance, spreadsheetId}
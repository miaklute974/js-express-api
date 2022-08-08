
##
```
TODO: 
    Update routes/webhook.js to update with all stories from an iteration by itself. 
```

##### Links
# https://developers.google.com/sheets/api/samples/writing
# https://shortcut.com/api/rest/v3
# https://shortcut.com/api/webhook/v1#Introduction

##### Usage
Read and writes to Googlesheets with data received from Shortcut API, utilizing Google oAuth.

##### Tests
```
npm run test
```
##### Run
```
Obtain a shortcut API Token
Obtain google-client-secret.json from google dev console

.env should have:
SHORTCUT_API_TOKEN 
GOOGLE_SPREADSHEET_ID 
GOOGLE_CLIENT_ID
GOOGLE_CLIENT_SECRET

docker-compose build
docker-compose up 

Or run the services separately as needed.(Temporarily switched to SQlite for testing)
```


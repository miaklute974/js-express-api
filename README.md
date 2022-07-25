
##
```
TODO: 
    Link shortcut webhooks data to db endpoints (This is complete, just need to change shortcut webhook URL once hosted)
    Add iteration model to /db/database.js 
    Update /google/google-sheet.js to receive necessary story information and 
    logic to append to googlesheets instead of [1,2,3,4,5]
```

#####
https://developers.google.com/sheets/api/samples/writing
#####
https://shortcut.com/api/rest/v3
#####
https://shortcut.com/api/webhook/v1#Introduction

##### Usage
Listens for webhooks from app.shortcut.com for story changes, handles the requests, and appends information to a googlesheet based on completion status and story type.

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


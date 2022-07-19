
##
TODO: Drop google.auth.GoogleAuth in favor of OAuth2 to rid hosting machine of sensitive env vars.

#####
https://developers.google.com/sheets/api/samples/writing
#####
https://shortcut.com/api/rest/v3
#####
https://shortcut.com/api/webhook/v1#Introduction

##### Usage
Listens for webhooks from app.shortcut.com for story changes, handles the requests, and appends information to a googlesheet based on completion status and story type.
##### Run
```
Obtain a shortcut API Token -> env var SHORTCUT_API_TOKEN
Create a google service account and obtain env vars below
Obtain creds.json from the service account and place in the parent directory

.env should have:
SHORTCUT_API_TOKEN = ''
GOOGLE_SERVICE_ACCOUNT_EMAIL = ''
GOOGLE_PRIVATE_KEY = ''
GOOGLE_SPREADSHEET_ID = ''
GOOGLE_APPLICATION_CREDENTIALS=creds.json

docker-compose build
docker-compose up 
```


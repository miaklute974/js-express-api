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
Create a google service account and obtain (GOOGLE_SERVICE_ACCOUNT_EMAIL, GOOGLE_PRIVATE_KEY, GOOGLE_SPREADSHEET_ID) as env vars
Obtain creds.json from the service account once it is made and create creds.json in the parent directory

docker-compose build
docker-compose up 
```


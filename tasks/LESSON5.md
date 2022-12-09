# Optional tasks to Lesson5
- Await/Async explanation is hosted [here](https://sostp-my.sharepoint.com/:v:/g/personal/hlavka_sostp_cz/EVh7S6yChFZEkGx2Q2AFfAsBIyQ2DKMHZPsDHj-e3tIX3w?e=emgqvZ)
- Following "Library API" is hosted on AWS, maybe if you are interested I made short series about AWS [here](https://sostp-my.sharepoint.com/:f:/g/personal/hlavka_sostp_cz/ErdwWfc9lQ5HlaCbbokAlmkB1CeTbG36YrAmrBgxX8m0pQ?e=Z1HeA3)

# Mandatory task to Lesson5
Under following [URL](https://ac7minh6n7s3rw4qfchrofbwai0amiko.lambda-url.eu-north-1.on.aws/) you can find simple "Library API" with few REST API endpoints:
- Method: GET, Path: / - returns whole library
- Method: POST, Path: /, Body: { "author": "xyz" } - serach library for specific author (returns 200 if found, if not 404)
- Method: POST, Path: /, Body: { "name": "xyz" } - search library for specific book based on name (returns 200 if found, if not 404)
API doesn't use diacritics (f.e. ěščř). If you are interest code for API you can find in this repo in `src/backend/index.js. If you are interested feel free to use different API, some [examples](https://github.com/public-apis/public-apis).

Example call:
``curl https://xyz.lambda-url.eu-north-1.on.aws/ -d '{"author":"Otta"}' -v
curl https://xyz.lambda-url.eu-north-1.on.aws/ -XGET -v``

Your task will be to create application, where you will use async call (specificaly fetch/AJAX) and form with:
- two inputs for search by author and book name
- if none of those inputs will be filled out, call GET to receive all library
- validate inputs to not be longer than 30 characters
- display received books in DOM as a new list

Your code host on JSFiddle, CodePen or ... It can happen that none of previously mentioned tools won't work correctly, then please send source code via email.

Deadline:
- midnight Su 18.12. 2022

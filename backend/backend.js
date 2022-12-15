// Server Dependencies
const express = require('express');
const app = express();
const cors = require('cors');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const fetch = require('node-fetch-commonjs')


// Specify port for server to run on
const port = 4000;

const path = require('path');
app.use(express.static(path.join(__dirname, '../build')));
app.use('/static', express.static(path.join(__dirname, 'build//static')));

app.use(bodyParser.urlencoded({ extended: false })) // parse application/x-www-form-urlencoded
app.use(bodyParser.json()) // parse application/json

// Specifies what the server can parse
app.use(bodyParser.urlencoded({ extended: false })) 
app.use(bodyParser.json())

// Allows for requests and responses to be made over different domains
app.use(cors());

// Specifies the HTTP methods in which can be used from different domains and from where
app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
    res.header("Access-Control-Allow-Headers",
        "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

// Used to connect to our MongoDB database
const connectionString = "mongodb+srv://admin:admin@cluster0.cehtzag.mongodb.net/?retryWrites=true&w=majority"

// Spotify credentials (https://developer.spotify.com/documentation/web-api/quick-start/)
const CLIENT_ID = "8c250eca34024595ada9aa262e1cf257";
const CLIENT_SECRET = "92afd8890b4645aeb4c683bb5bdc0815";
var accessToken = "";

// Used to retrieve retrieve a Spotify API access token
var authenticationParams = {
    method: 'POST',
    headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
    },
    body: 'grant_type=client_credentials&client_id=' + CLIENT_ID + '&client_secret=' + CLIENT_SECRET
}

// // Asynchronous function
async function main() {
    // Connect to the database
   // mongoose.connect(connectionString, { useNewUrlParser: true });

   // Retrieve Spotify API Access Token (Promise)
//    fetch('https://accounts.spotify.com/api/token', authenticationParams)
//    .then(result => result.json())
//    .then(data => accessToken = data.access_token )
}

// Log an error if one occurs when connecting to the database or from the Spotify API
main().catch(err => console.log(err));

// Server begins listening through port 4000, handles requests from port 3000 (our music application)
app.listen(port, (req, res) => {
    console.log(`Listening at http://localhost:${port}`);
});

// Listens for a GET request to '/search/:artistName'
app.get('/search/:artist', (req, res) => {
    console.log("Artist Name: " + req.params.artist);
})

// Server Dependencies
const express = require('express');
const app = express();
const cors = require('cors');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

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

// // Asynchronous function
// async function main() {
//     // Connect to the database
//     mongoose.connect(connectionString, { useNewUrlParser: true });
// }

// Log an error if one occurs when connecting to the database
//main().catch(err => console.log(err));

// Server begins listening through port 4000, handles requests from port 3000 (our music application)
app.listen(port, (req, res) => {
    console.log(`Listening at http://localhost:${port}`);
});

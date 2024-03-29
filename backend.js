// Server Dependencies
const express = require('express');
const app = express();
const cors = require('cors');
const bodyParser = require('body-parser');
const path = require('path');
const mongoose = require('mongoose');
const GenreImage = require('./models/genreimage.model')
const fetch = (...args) => import('node-fetch').then(({ default: fetch }) => fetch(...args));
require('dotenv').config();

// Specify port for server to run on
const port = process.env.PORT || 4000;

app.use(express.static(path.join(__dirname, "rubato", "build")))
app.use(bodyParser.urlencoded({ extended: false , limit: '10mb'})) // parse application/x-www-form-urlencoded
app.use(bodyParser.json({ limit: '10mb' })) // parse application/json

// Allows for requests and responses to be made over different domains
app.use(cors());

mongoose.set('strictQuery', false);

const userRoute = require('./routes/User');
const listRoute = require('./routes/List');
const reviewRoute = require('./routes/Review');
const diaryRoute = require('./routes/Diary');

app.use("/user",userRoute);
app.use("/list",listRoute);
app.use("/review",reviewRoute);
app.use("/diary",diaryRoute);

// Specifies the HTTP methods in which can be used from different domains and from where
app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
    res.header("Access-Control-Allow-Headers",
        "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

// Used to connect to our MongoDB database
const CONNECTION_STRING = process.env.CONNECTION_STRING;

// Spotify credentials (https://developer.spotify.com/documentation/web-api/quick-start/)
const CLIENT_ID = process.env.CLIENT_ID;
const CLIENT_SECRET = process.env.CLIENT_SECRET;
var accessToken = "";

// Asynchronous function
async function main() {
    // Connect to the database
    mongoose.connect(CONNECTION_STRING, { useNewUrlParser: true });

    async function getAccessToken() {
        var authenticationParams = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            body: 'grant_type=client_credentials&client_id=' + CLIENT_ID + '&client_secret=' + CLIENT_SECRET
        }
    
        let retries = 0;
        while (true) {
            try {
                // Make a request to the Spotify API to get an access token
                const response = await fetch('https://accounts.spotify.com/api/token', authenticationParams);
                const data = await response.json();
    
                // Set the access token
                accessToken = data.access_token;
    
                // Schedule a refresh to get a new access token just before the current one expires
                const expiresIn = data.expires_in * 1000; // Convert seconds to milliseconds
                setTimeout(getAccessToken, expiresIn - 60000); // Refresh token 1 minute before it expires
    
                // Break out of the loop and return the token
                break;
            } catch (error) {
                // If an error is thrown, retry the request up to 3 times
                if (retries < 3) {
                    retries++;
                    console.log('Error getting access token, retrying...', error);
                } else {
                    console.log('Error getting access token after 3 retries', error);
                    break;
                }
            }
        }
    }
    
    // Retrieve initial access token and schedule refresh
    await getAccessToken();

}

// Log an error if one occurs when connecting to the database or from the Spotify API
main().catch(err => console.log(err));

// If the application is in production
if(process.env.NODE_ENV === "production")
{
    app.use(express.static("rubato/build"));

    app.get("*", (req, res) => {
        res.sendFile(path.resolve(__dirname, "rubato", "build", "index.html"));
    });
}

// Server begins listening through port 4000, handles requests from port 3000 (our music application)
app.listen(port, (req, res) => {
    console.log(`Listening on port ${port}`);
});

// Listens for a GET request to '/accessToken'
app.get('/accessToken', async (req, res) => {
    res.status(200).json(accessToken);
})


// Listens for a GET request to '/search/:artistName'
app.get('/search/:artist', async (req, res) => {

    var artistParams = {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + accessToken
        },
    }

    // Retrieve the first artist id related to the what was searched (https://developer.spotify.com/console/get-search-item/)
    var artistId = await fetch(`https://api.spotify.com/v1/search?q=${req.params.artist}&type=artist`, artistParams)
        .then(response => response.json())
        .then(data => { return data.artists.items[0].id })

    // Retrieve album metadata based on artist id (https://developer.spotify.com/console/get-artist-albums/)
    var albumData = await fetch(`https://api.spotify.com/v1/artists/${artistId}/albums?include_groups=album&market=US&limit=50`, artistParams)
        .then(response => response.json())
        .then(data => {
            const albums = data.items.filter(album => album.album_type === 'album');
            res.status(200).json(data.items);
        })
})

// Listens for a GET request to '/home'
app.get('/home', async (req, res) => {

    // Get all genre images from MongoDB
    const genreImages = await GenreImage.find({});

    var genreParams = {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + accessToken
        },
    }

    // BUG: SOMETIMES CRASHES? CHECK LATER
    var genres = await fetch(`https://api.spotify.com/v1/recommendations/available-genre-seeds`, genreParams)
        .then(response => response.json())
        .then(data => {
            const matchedGenres = data.genres.map(genre => {
                // Find the genre image that matches the current genre seed
                const genreImage = genreImages.find(image => image.name === genre);
                // Return an object with the genre seed and image URL
                return { genre: genre, url: genreImage ? genreImage.url : "https://via.placeholder.com/230x230.png?text=Genre+Image" };
            });
            console.log(data);
            res.status(200).json(matchedGenres);
        })
        .catch(error => {
            console.error(error);
            res.status(500).json({ message: 'Internal Server Error' });
        });
})

// Listens for a GET request to '/genre/:genreName'
app.get('/genre/:genreName', async (req, res) => {

    var genreParams = {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + accessToken
        },
    }

    var artists = await fetch(`https://api.spotify.com/v1/search?q=${req.params.genreName}&type=artist&limit=50`, genreParams)
        .then(response => response.json())
        .then(data => {

            const artists = data.artists.items;

            // Sort the artists based on their popularity
            artists.sort((a, b) => b.popularity - a.popularity);

            // Get the top 20 most popular artists
            const topArtists = artists.slice(0, 20);

            console.log(topArtists);
            return res.status(200).json(topArtists)
        })
        .catch(error => {
            console.error(error);
            res.status(500).json({ message: 'Internal Server Error' });
        });
})

// Listens for a GET request to '/album/:albumId'
app.get('/album/:albumId', async (req, res) => {

    var albumParams = {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + accessToken
        },
    }

    // Get a list of categories (https://developer.spotify.com/documentation/web-api/reference/#/operations/get-categories)
    var album = await fetch(`https://api.spotify.com/v1/albums/${req.params.albumId}`, albumParams)
        .then(response => response.json())
        .then(data => { res.status(200).json(data) })
        .catch(error => {
            console.error(error);
            res.status(500).json({ message: 'Internal Server Error' });
        });
})

// Listens for a GET request to '/categories/albums'
app.get('/album/:albumId/tracks', async (req, res) => {

    var albumParams = {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + accessToken
        },
    }

    var album = await fetch(`https://api.spotify.com/v1/albums/${req.params.albumId}/tracks`, albumParams)
        .then(response => response.json())
        .then(data => { res.status(200).json(data) })
        .catch(error => {
            console.error(error);
            res.status(500).json({ message: 'Internal Server Error' });
        });
})

// Listens for a GET request to '/topAlbums'
app.get('/topAlbums', async (req, res) => {

    var albumParams = {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + accessToken
        }
    }

    // Get a list of top albums
    var albums = await fetch(`https://api.spotify.com/v1/browse/new-releases?limit=20`, albumParams)
        .then(response => response.json())
        .then(data => { res.status(200).json(data.albums) })
        .catch(error => {
            console.error(error);
            res.status(500).json({ message: 'Error retrieving top albums' });
        });
})

// Listens for a GET request to '/topAlbums'
app.get('/topArtists', async (req, res) => {

    let currentYear = new Date().getFullYear();
   
    var artistParams = {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + accessToken
        }
    }

    // Get a list of top artists
    var artists = await fetch(`https://api.spotify.com/v1/search?query=year:${currentYear}&type=artist&market=US&offset=0&limit=20`, artistParams)
        .then(response => response.json())
        .then(data => { res.status(200).json(data.artists.items)})
        .catch(error => {
            console.error(error);
            res.status(500).json({ message: 'Error retrieving top artists' });
        });
})

// Listens for a GET request to '/categories/albums'
app.get('/playlists', async (req, res) => {

    var playlistParams = {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + accessToken
        },
    }

    // Get a list of categories (https://developer.spotify.com/documentation/web-api/reference/#/operations/get-categories)
    var playlists = await fetch(`https://api.spotify.com/v1/browse/featured-playlists`, playlistParams)
        .then(response => response.json())
        .then(data => { res.status(200).json(data) })
        .catch(error => {
            console.error(error);
            res.status(500).json({ message: 'Internal Server Error' });
        });
})
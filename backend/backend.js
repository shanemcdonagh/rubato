// Server Dependencies
const express = require('express');
const app = express();
const cors = require('cors');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const User = require('./models/user.model')
const List = require('./models/list.model')
const Review = require('./models/review.model')
const GenreImage = require('./models/genreimage.model')
const fetch = (...args) => import('node-fetch').then(({ default: fetch }) => fetch(...args));
const jwt = require('jsonwebtoken')
require('dotenv').config();


// Specify port for server to run on
const port = 4000;

const path = require('path');
const { response } = require('express');
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

app.use(express.static(path.join(__dirname, 'build')));

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

    // Retrieve Spotify API Access Token (Promise)
    // Used to retrieve retrieve a Spotify API access token
    var authenticationParams = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        },
        body: 'grant_type=client_credentials&client_id=' + CLIENT_ID + '&client_secret=' + CLIENT_SECRET
    }

    fetch('https://accounts.spotify.com/api/token', authenticationParams)
        .then(result => result.json())
        .then(data => accessToken = data.access_token)

}

// Log an error if one occurs when connecting to the database or from the Spotify API
main().catch(err => console.log(err));

// Server begins listening through port 4000, handles requests from port 3000 (our music application)
app.listen(port, (req, res) => {
    console.log(`Listening at http://localhost:${port}`);
});

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
                return { genre: genre, url: genreImage ? genreImage.url : "https://via.placeholder.com/230x230.png?text=Genre+Image"};
            });
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
        },
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

// Listens for a POST request to '/register'
app.post('/register', async (req, res) => {
    try {
        const user = await User.create({
            name: req.body.name,
            email: req.body.email,
            password: req.body.password
        })
        res.json("Ok");
    } catch (error) {
        res.json("Duplicate email" + error);
    }
})

// Listens for a POST request to '/register'
app.post('/login', async (req, res) => {

    const user = await User.findOne({
        email: req.body.email,
        password: req.body.password
    })

    if (user) {

        // Retrieve the object id of the user (used to link documents later)
        userID = user._id.toString();

        const token = jwt.sign({
            name: user.name,
            email: user.email
        }, '[secretToken]-99870019')
        return res.json({ status: 'ok', user: token, userID: user._id.toString() })
    }
    else {
        // Make sure the userID is empty
        userID = user._id.toString();

        return res.json("Error logging in")
    }

})

// Listens for a POST request to '/createList'
app.post('/createList', async (req, res) => {
    // Create a list which links to the user (by their object id)
    console.log(req.body.name)
    const list = await List.create({
        name: req.body.name,
        albums: [],
        userID: req.body.userID
    }, (err, result) => {
        if (err) {
            res.status(500).json(err);
        } else {
            res.json(result);
        }
    })
})

// Listens for a POST request to '/retrieveLists'
app.post('/retrieveLists', async (req, res) => {
    try {
        const list = await List.find({
            userID: req.body.userID
        }).exec();
        res.json(list);
    } catch (err) {
        res.status(500).json(err);
    }
})

// Listens for a POST request to '/retrieveLists'
app.get('/retrieveListAlbums/:listID', async (req, res) => {
    try {
        const list = await List.findOne({
            _id: req.params.listID
        }).exec();

        res.json(list.albums);
    } catch (err) {
        res.status(500).json(err);
    }
})

// Listens for a PATCH request to '/updateList'
app.patch('/updateList', async (req, res) => {
    try {
      const list = await List.findOneAndUpdate(
        { _id: req.body.listID, userID: req.body.userID },
        { $push: { albums: req.body.album } },
        { new: true }
      ).exec();
  
      res.json(list);
    } catch (err) {
      res.status(500).json(err);
    }
  })

// Listens for a patch request to '/deleteList'
app.patch('/deleteList', async (req, res) => {

    try {
        const list = await List.findOneAndDelete({
            name: req.body.name,
            userID: req.body.userID
        }).exec();
        res.json("Succesfully deleted list");
    } catch (err) {
        res.status(500).json(err);
    }
})


// Listens for a POST request to '/review'
app.post('/review', async (req, res) => {

    // First check if the review already exists
    const oldReview = await Review.findOne({
        albumID: req.body.albumID,
        userID: req.body.userID
    })

    if (oldReview) {
        const { rating } = req.body.rating;

        Review.updateOne({ _id: oldReview._id }, { rating }, (err, result) => {
            if (err) {
                res.status(500).json(err);
            } else {
                res.json(result);
            }
        });
    }
    else {
        const review = await Review.create({
            albumID: req.body.albumID,
            artistName: req.body.artistName,
            albumName: req.body.albumName,
            image: req.body.image,
            rating: req.body.rating,
            userID: req.body.userID
        }, (err, result) => {
            if (err) {
                res.status(500).json(err);
            } else {
                res.json(result);
            }
        })
    }
})

// Listens for a get request to '/getReview'
app.post('/review/getReview', async (req, res) => {
    
    // First check if the review already exists
    const review = await Review.findOne({
        albumID: req.body.albumID,
        userID: req.body.userID
    })

    if (review) {
        // Respond with the album rating
        res.json(review.rating);
    }
    else {
        // Respond with the default rating 
        res.json(0);
    }
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






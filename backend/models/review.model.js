// https://youtu.be/Ejg7es3ba2k
const mongoose = require('mongoose');

const Review = new mongoose.Schema({
    albumID: {type: String, required: true, unique: true},
    artistName: {type: String, required: true},
    albumName: {type: String, required: true},
    year: {type: String, required: true},
    image: {type: String, required: true},
    rating: {type: Number, required: true},
    userID: { type: String, ref: 'user-data', required: true } // Reference to the user-data collection
},
{collection: 'reviews'}
)

const model = mongoose.model('Review', Review);

module.exports = model;
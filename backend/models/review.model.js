// https://youtu.be/Ejg7es3ba2k
const mongoose = require('mongoose');

const Review = new mongoose.Schema({
    albumID: {type: String, required: true, unique: true},
    rating: {type: String, required: true},
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'user-data', required: true } // Reference to the user-data collection
},
{collection: 'reviews'}
)

const model = mongoose.model('Review', Review);

module.exports = model;
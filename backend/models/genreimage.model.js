// https://youtu.be/Ejg7es3ba2k
const mongoose = require('mongoose');

const GenreImage = new mongoose.Schema({
    url: {type: String, required: true, unique: true},
    name: {type: String, required: true},
},
{collection: 'genre-images'}
)

const model = mongoose.model('GenreImage', GenreImage);

module.exports = model;
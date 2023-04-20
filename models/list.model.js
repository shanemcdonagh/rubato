// https://youtu.be/Ejg7es3ba2k
const mongoose = require('mongoose');

const List = new mongoose.Schema({
    name: {type: String, required: true, unique: true},
    albums: {type: Array, required: true},
    userID: { type: String, ref: 'user-data', required: true } // Reference to the user-data collection
},
{collection: 'listening-lists'}
)

const model = mongoose.model('UserList', List);

module.exports = model;
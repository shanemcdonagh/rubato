// https://youtu.be/Ejg7es3ba2k
const mongoose = require('mongoose');

const List = new mongoose.Schema({
    name: {type: String, required: true},
    items: {type: Object, required: true,},
    userID: { type: mongoose.Schema.Types.ObjectId, ref: 'user-data', required: true } // Reference to the user-data collection
},
{collection: 'lists'}
)

const model = mongoose.model('UserList', List);

module.exports = model;
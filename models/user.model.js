// https://youtu.be/Ejg7es3ba2k
const mongoose = require('mongoose');

const User = new mongoose.Schema({
    name: {type: String, required: true},
    image: { type: String, default: "http://groovesharks.org/assets/images/default_avatar.jpg" },
    email: {type: String, required: true, unique: true},
    password: {type: String, required: true}
},
{collection: 'user-data'}
)

const model = mongoose.model('UserData', User);

module.exports = model;
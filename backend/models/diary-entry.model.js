// https://youtu.be/Ejg7es3ba2k
const mongoose = require('mongoose');

const DiaryEntry = new mongoose.Schema({
    entry: {type: String, required: true},
    userID: { type: String, ref: 'user-data', required: true } // Reference to the user-data collection
},
{collection: 'diary-entries'}
)

const model = mongoose.model('DiaryEntry', DiaryEntry);

module.exports = model;
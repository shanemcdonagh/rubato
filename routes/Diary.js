const express = require('express');
const router = express.Router();
const cors = require('cors');
router.use(cors())
const DiaryEntry = require('../models/diary-entry.model')

// Listens for a POST request to '/createDiaryEntry'
router.post('/createDiaryEntry', async (req, res) => {
    
    try 
    {
        const diaryEntry = await DiaryEntry.create
        ({
            entry: req.body.diaryEntry,
            userID: req.body.userID
        })

        res.json("Diary entry added");
    } 
    catch (error) 
    {
        res.json(`Diary Error: ${error}`);
    }
})

// Listens for a POST request to '/retrieveDiaryEntries'
router.post('/retrieveDiaryEntries', async (req, res) => {

    // Attempt to retrieve diary entries from the database
    try 
    {
        const diaryentries = await DiaryEntry.find
        ({
            userID: req.body.userID
        }).sort({ timestamp: -1 }).exec();

        res.status(200).json(diaryentries);
    } 
    catch (err) 
    {
        res.status(500).json(err);
    }
})

module.exports = router;
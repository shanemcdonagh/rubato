const express = require('express');
const router = express.Router();
const List = require('../models/list.model')
const cors = require('cors');
router.use(cors())

// Listens for a POST request to '/createList'
router.post('/createList', async (req, res) => {
    
    const list = await List.create
    ({
        name: req.body.name,
        albums: [],
        userID: req.body.userID
    }, (err, result) => 
    {
        if (err) 
        {
            res.status(500).json(err);
        } 
        else 
        {
            res.json(result);
        }
    })
})

// Listens for a POST request to '/retrieveLists'
router.post('/retrieveLists', async (req, res) => {
    try 
    {
        const list = await List.find
        ({
            userID: req.body.userID
        }).exec();
        
        res.json(list);
    } 
    catch (err) 
    {
        res.status(500).json(err);
    }
})

// Listens for a POST request to '/retrieveListAlbums:listID'
router.get('/retrieveListAlbums/:listID', async (req, res) => {
    try 
    {
        const list = await List.findOne
        ({
            _id: req.params.listID
        }).exec();

        res.json(list.albums);
    } 
    catch (err) 
    {
        res.status(500).json(err);
    }
})

// Listens for a PATCH request to '/updateList'
router.patch('/updateList', async (req, res) => {
    
    try 
    {
        const list = await List.findOneAndUpdate
        (
            { _id: req.body.listID, userID: req.body.userID },
            { $push: { albums: req.body.album } },
            { new: true }
        ).exec();

        res.json(list);
    } 
    catch (err) 
    {
        res.status(500).json(err);
    }
})

// Listens for a patch request to '/deleteList'
router.patch('/deleteList', async (req, res) => {

    try 
    {
        const list = await List.findOneAndDelete
        ({
            name: req.body.name,
            userID: req.body.userID
        }).exec();

        res.json("Succesfully deleted list");
    } 
    catch (err) 
    {
        res.status(500).json(err);
    }
})

module.exports = router;
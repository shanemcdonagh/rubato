const express = require('express');
const router = express.Router();
const cors = require('cors');
router.use(cors())
const User = require('../models/user.model')
const jwt = require('jsonwebtoken')


// Listens for a POST request to '/login'
router.post('/login', async (req, res) => {

    const user = await User.findOne
    ({
        email: req.body.email,
        password: req.body.password
    })

    if (user) 
    {
        // Retrieve the object id of the user (used to link documents later)
        userID = user._id.toString();

        const token = jwt.sign
        ({
            name: user.name,
            email: user.email
        }, '[secretToken]-99870019')

        return res.json({ status: 'ok', user: token, userID: user._id.toString() })
    }
    else 
    {
        // Make sure the userID is empty
        userID = user._id.toString();

        return res.json("Error logging in")
    }
})

// Listens for a POST request to '/register'
router.post('/register', async (req, res) => {
    try 
    {
        const user = await User.create
        ({
            name: req.body.name,
            email: req.body.email,
            password: req.body.password
        })

        res.json("Ok");
    } 
    catch (error) 
    {
        res.json("Duplicate email" + error);
    }
})

// Listens for a POST request to '/userDetails'
router.post('/userDetails', async (req, res) => {
    try 
    {
        const user = await User.findOne
        ({
            _id: req.body.userID
        }).exec();
        
        res.json(user);
    } 
    catch (err) 
    {
        res.status(500).json(err);
    }
})

// Listens for a PATCH request to '/register'
router.patch('/updateProfilePicture', async (req, res) => {

    // Retrieve the image url and update the users profile picture
    const { image } = req.body;

    User.updateOne({ _id: req.body.userID }, { image })
    .then(result => {
      res.json(result);
    })
    .catch(err => {
      res.status(500).json(err);
    });
})

module.exports = router;
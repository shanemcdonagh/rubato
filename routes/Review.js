const express = require('express');
const router = express.Router();
const Review = require('../models/review.model')
const cors = require('cors');
router.use(cors())

// Listens for a POST request to '/getReview'
router.post('/getReview', async (req, res) => {

    // First check if the review already exists
    const review = await Review.findOne
    ({
        albumID: req.body.albumID,
        userID: req.body.userID
    })

    if (review) 
    {
        // Respond with the album rating
        res.json(review.rating);
    }
    else 
    {
        // Respond with the default rating 
        res.json(0);
    }
})

// Listens for a GET request to '/allReviews'
router.post('/allReviews', async (req, res) => {
    try 
    {
        const reviews = await Review.find
        ({
            userID: req.body.userID
        }).exec();

        res.status(200).json(reviews);
    } 
    catch (err) 
    {
        res.status(500).json(err);
    }
})

// Listens for a POST request to '/review'
router.post('/', async (req, res) => {

    // First check if the review already exists
    const oldReview = await Review.findOne
    ({
        albumID: req.body.albumID,
        userID: req.body.userID
    })

    console.log(oldReview._id)

    if (oldReview) 
    {
        const { rating } = req.body;
        Review.updateOne({ _id: oldReview._id }, { rating })
          .then(result => {
            res.json(result);
          })
          .catch(err => {
            res.status(500).json(err);
          });
      } 
      else 
      {
        const review = await Review.create({
          albumID: req.body.albumID,
          artistName: req.body.artistName,
          albumName: req.body.albumName,
          image: req.body.image,
          rating: req.body.rating,
          userID: req.body.userID
        });
        res.json(review);
      }
})

module.exports = router;
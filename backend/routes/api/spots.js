const express = require('express')
const { setTokenCookie, requireAuth } = require('../../utils/auth');
const { Spot, Image, User, Review, sequelize} = require('../../db/models');
const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');
const { Op } = require("sequelize");

const router = express.Router();

const validateSpot = [
    check('address')
      .exists({ checkFalsy: true })
      .withMessage('Street address is required'),
    check('city')
      .exists({checkFalsy:true})
      .withMessage('City is required'),
    check('state')
      .exists({checkFalsy:true})
      .withMessage('State is required'),
    check('country')
      .exists({checkFalsy:true})
      .withMessage('Country is required'),
    check('lat')
      .exists({checkFalsy:true})
      .withMessage("Latitude is not valid"),
    check('lng')
      .exists({checkFalsy:true})
      .withMessage("Longitude is not valid"),
    check('name')
      .exists({checkFalsy:true})
      .isLength({max:50})
      .withMessage("Name must be less than 50 characters"),
    check('description')
      .exists({checkFalsy:true})
      .withMessage("Description is required"),
    check('price')
      .exists({checkFalsy:true})
      .withMessage("Price per day is required"),
    handleValidationErrors
];

// Get all spots:
router.get('/', async (req, res) => {
    let spots = await Spot.findAll({});
    res.json(spots);
})

//Get Spots owned by Current User:
router.get('/current', requireAuth, async (req, res) => {
    const mySpot = await Spot.findAll(
      {
        where: {
          ownerId: req.user.id
        }
      })
    res.json(mySpot);
})

//Get details of Spot by its Id:
router.get('/:spotId', async (req, res) => {
    const spotDeets = await Spot.findByPk(req.params.spotId, {
        include: [
            {
                model: Image,
                attributes: ["url"],
            },
            { model: User, attributes: ["id", "firstName", "lastName"] }
        ],
    });
    if (!spotDeets) {
        res.status(404);
        return res.json({
            message: "Spot could not be found.", statusCode: 404,
        })
    }
    const revDeets = await Spot.findByPk(req.params.spotId, {
        include: {
            model: Review,
            attributes: [],
        },
        attributes: [
            [sequelize.fn("COUNT", sequelize.col("*")), "numReviews"],
            [sequelize.fn("AVG", sequelize.col("stars")), "avgStarRating"],
        ],
        raw: true,
    })

    const allDeets = spotDeets.toJSON();
    allDeets.numReviews = revDeets.numReviews;
    allDeets.avgStarRating = revDeets.avgStarRating;

    res.json(allDeets);
})

// Get all Reviews by a Spot id:
router.get('/:spotId/reviews', async (req, res) => {
    const id = req.params.spotId
    let isReviewed = await Spot.findByPk(id)

    if (!isReviewed) {
        res.status(404).json({
            message: "Spot does not exist.",
            statusCode: 404,
        })
    }
    const spotReview = await Review.findAll({
        where: {
            spotId: id
        }
    })
    res.json(spotReview)
})

// Create a spot:
router.post('/', requireAuth, validateSpot, async (req, res) => {
    newSpot = req.body;
    newSpot.ownerId = req.user.id;

    let spot = await Spot.create(newSpot);
    spot = await Spot.findByPk(newSpot.id)

    res.status(201);
    return res.json(newSpot);
})

//Edit a spot:
router.put('/:spotId', requireAuth, validateSpot, async (req, res) => {
    let { address, city, state, country, lat, lng, name, description, price } = req.body;
    const edittedSpot = await Spot.findByPk(req.params.spotId)
    if (!edittedSpot) {
        res.status(404).json({
            message: "Spot could not be found.", statusCode: 404,
        })
    }
    if (req.user.id !== edittedSpot.ownerId) {
        res.status(403).json({
            message: "You must own this spot to edit", statusCode: 403,
        })
    }
    edittedSpot.address = address
    edittedSpot.city = city
    edittedSpot.state = state
    edittedSpot.country = country
    edittedSpot.lat = lat
    edittedSpot.lng = lng
    edittedSpot.name = name
    edittedSpot.description = description
    edittedSpot.price = price

    await edittedSpot.save()

    return res.json(edittedSpot);
})

// Create a review for a spot:
router.post('/:spotId/reviews', requireAuth, async (req, res) => {
    const { userId, spotId, review, stars } = req.body;
    const toReview = await Spot.findByPk(req.params.spotId);

    const errorObj = {
        message: "Validation Error",
        statusCode: 400,
        error: {},
    }
    if (!toReview) {
        return res.status(404).json({
            message: "This spot cannot be found.", statusCode: 404,
        });
    }
    const reviewed = await Review.findAll({
        where: {
            [Op.and]: [
                {spotId: req.params.spotId },
                {userId: req.user.id},
            ],
        },
    })
    // if the review or star logic is violated:
    if (!review) errorObj.error.review = "Review text is necessary."
    if (stars < 1 || stars > 5) {
        errorObj.error.stars = "Stars must be number between 1 and 5."
    }

    if (!review || !stars) {
        return res.status(400).json(errorObj)
    }

    if (reviewed.length >= 1) {
        return res.status(403).json({
            message: "User already has a review for this spot.",
            statusCode: 403,
        })
    }

    const newReview = await Review.create({
        userId: req.user.id,
        spotId: req.params.spotId,
        review,
        stars
    })

    res.status(201);
    return res.json(newReview);
})

// Add an image to Spot based on spot Id:
router.post('/:spotId/images', requireAuth, async (req, res) => {
    let img = await Spot.findByPk(req.params.spotId)

    if (!img) {
        return res.status(404).json({
            "message": "Spot could not be found",
            "statusCode": 404
        })
    }
    const newImg = await Image.create({
        url: req.body.url,
        spotId: req.params.spotId,
        userId: req.user.id,

    })
    res.json(newImg)
})

module.exports = router;

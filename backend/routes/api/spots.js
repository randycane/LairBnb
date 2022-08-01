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

// Create a spot:
router.post('/', requireAuth, validateSpot, async (req, res) => {
    newSpot = req.body;
    newSpot.ownerId = req.user.id;

    let spot = await Spot.create(newSpot);
    spot = await Spot.findByPk(newSpot.id)

    res.status(201);
    return res.json(newSpot);
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

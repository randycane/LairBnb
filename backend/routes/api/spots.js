const express = require('express')
const { setTokenCookie, requireAuth } = require('../../utils/auth');
const { Spot, Image, User, Review, Booking, sequelize} = require('../../db/models');
const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');
const { Op, where } = require("sequelize");

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
      .isLength({max:60})
      .withMessage("Name must be less than 60 characters"),
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

// Create a spot:
router.post('/', requireAuth, validateSpot, async (req, res) => {
    newSpot = req.body;
    newSpot.ownerId = req.user.id;

    let spot = await Spot.create(newSpot);
    spot = await Spot.findByPk(newSpot.id)

    res.status(201);
    return res.json({ newSpot });
})

//Get Spots owned by Current User:
router.get('/current', requireAuth, async (req, res, next) => {
    const mySpot = await Spot.findAll(
      {
        where: {
          ownerId: req.user.id
        }
      })
    res.json({ "Spots": mySpot });
})

//Get details of Spot by its Id:
// router.get('/:spotId', async (req, res) => {
//     const spotDeets = await Spot.findByPk(req.params.spotId, {
//         include: [
//             {
//                 model: Image,
//                 attributes: ["id", "spotId", "url"],
//             },
//             {
//                 model: Review,
//                 attributes: [[sequelize.fn("COUNT", sequelize.col("*")), "numReviews"],
//                     [sequelize.fn("AVG", sequelize.col("stars")), "avgStarRating"]],
//             },
//             {
//                 model: User,
//                 as: "Owner",
//                 attributes: ["id", "firstName", "lastName"],
//             },
//         ],
//     });
//     // This does not work right now:
//     if (!spotDeets) {
//         const err = new Error("Spot could not be found")
//         err.status = 404
//         err.errors = ["Spot with that id does not exist!"]
//         return next(err);
//     }


//     res.json(spotDeets);
// })

// Get details of spot Id:
router.get('/:spotId', async (req, res, next) => {
    const id = req.params.spotId
    let spotDeets = await Spot.findByPk(id, {
        include: [
            {
                model: Image,
                attributes: ["id", ["spotId", "imageableId"],  "url"],
            },
            {
                model: User,
                as: "Owner",
                attributes: ['id', 'firstName', 'lastName']
            },
        ]
    })
    if(!spotDeets){
        const err = new Error("Spot couldn't be found")
        err.status = 404
        return next(err)
    }

    const numDeets = await Spot.findByPk(id, {
                include:
                    {
                        model: Review,
                        attributes: []
                    },
                    attributes: [
                    [sequelize.fn("COUNT", sequelize.col("review")), "numReviews"],
                    [sequelize.fn("AVG", sequelize.col("stars")), "avgStarRating"],
                    ],
                    raw:true,
    })

    let detailout = spotDeets.toJSON()
    detailout.numReviews = numDeets.numReviews
    detailout.avgStarRating = numDeets.avgStarRating
    res.json(detailout);
})

//Get all bookings for a spot by id:
router.get('/:spotId/bookings', requireAuth, async (req, res, next) => {
    // two cases: one for if you are owner:
    // one for if you are not the owner:
    const isOwnerBooks = await Booking.findAll({
        where: {
            spotId: req.params.spotId
        },
        include: {
            model: User,
            attributes: ['id', 'firstName', 'lastName']
        }
    });
    const notAnOwnerBooks = await Booking.findAll({
        where: { spotId: req.params.spotId },
        attributes: ['spotId', 'startDate', 'endDate']
    });

    const aspot = await Spot.findByPk(req.params.spotId);
    if (!aspot) {
        let err = new Error("This spot could not be found")
        err.status = 404
        return next(err);
    }
    else if (aspot.ownerId === req.user.id) {
        return res.json({ 'Bookings': isOwnerBooks})
    } else {
        return res.json({'Bookings': notAnOwnerBooks})
    }
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
});

// Create a booking based on Spot Id:
router.post('/:spotId/bookings', requireAuth, async (req, res, next) => {
    const spotId = req.params.spotId;
    let {startDate, endDate} = req.body;

    const tryBook = await Spot.findByPk(spotId);
    if (!tryBook) {
        const error = new Error("Spot could not be found")
        error.status = 404
        error.errors = ["Spot with this id does not exist"]
        return next(error);
    }
    // Body validation error, ex: end date coming before start:
    if (endDate <= startDate) {
        return res.status(400).json({
            message: "Your end date cannot be booked before the start date",
            statusCode: 400,
        })
    }
    // Booking conflicts:
    let bookConflict = await Booking.findAll({
        where: {
            [Op.and]: [{
                startDate: {
                    [Op.lte]: endDate,
                },
                }, {
                endDate: {
                    [Op.gte]: startDate,
                }
                }],
            }
        });
    // if this conflict array ever exists, throw the error:
    if (bookConflict.length) {
            const error = new Error("Sorry, this spot is booked for these specified dates")
            error.status = 403
            error.errors = ["Start date conflicts with an existing booking",
                "End date conflicts with an exisiting booking"]
            return next(error)
    }

    let newBook = await Booking.create({
        spotId,
        startDate,
        endDate,
        userId: req.user.id,
    })
    return res.json(newBook);
});


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

// Create an image to Spot based on spot Id:
router.post('/:spotId/images', requireAuth, async (req, res, next) => {
    let img = await Spot.findByPk(req.params.spotId)

    if (!img) {
        let err = new Error("Spot could not be found")
        err.status = 404
        return next(err);
    }
    const newImg = await Image.create({
        url: req.body.url,
        spotId: req.params.spotId,
        userId: req.user.id,
    })
    res.json({ id: newImg.id, imageableId: req.params.spotId, url: newImg.url })
})

// Delete a spot:
router.delete('/:spotId', requireAuth, async (req, res, next) => {
    let spotDel = await Spot.findByPk(req.params.spotId);
    if (!spotDel) {
        res.status(404).json({
            message: "This spot could not be found.",
            statusCode: 404,
        })
    }

    await spotDel.destroy();

    res.json({
        message: "Spot successfully deleted",
        statusCode: 200,
    })
})

module.exports = router;

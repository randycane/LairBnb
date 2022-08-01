const express = require('express')
const { setTokenCookie, requireAuth } = require('../../utils/auth');
const { Spot, Image, User, Review } = require('../../db/models');
const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');
const { Op } = require("sequelize");

const router = express.Router();

const validateReview = [
    check('review')
        .exists({ checkFalsy: true })
        .withMessage('Review text is required'),
    check('stars')
        .exists({ checkFalsy: true })
        .custom(value => {
            if (value < 1 || value > 5 || typeof Number(value) !== "number") {
                throw new Error('Stars must be an integer from 1 to 5')
            }
            return true
        }),
    handleValidationErrors
];

//Get all Reviews of Current User:
router.get('/current', requireAuth, async (req, res) => {
    const id = req.user.id
    const myReview = await Review.findAll({
        where: {
            userId: req.user.id
        }
    })
    res.json(myReview)
})

//Edit a review:
router.put('/:reviewId', requireAuth, validateReview, async (req, res) => {
    const stars = req.body;
    let reviewId = req.params.reviewId;
    let reviewBody = req.body;
    let id = req.user.id;

    if (stars > 5 || stars < 1) {
        return res.status(400).json({
            message: "Stars must be a number from 1 to 5.",
            statusCode: 400,
        })
    }

    let thisReview = await Review.findByPk(reviewId);
    if (!thisReview) {
        return res.status(404).json({
            message: "This review does not exist.",
            statusCode: 404,
        })
    }
    if (thisReview.userId !== id) {
        return res.status(403).json({
            message: "You are not authorized to edit this.",
            statusCode: 403,
        })
    }
    thisReview = await Review.update(reviewBody, {
        where: {
            id: reviewId
        }
    });
    thisReview = await Review.findByPk(reviewId);
    return res.json(thisReview);
})

// Add an image to a review based on review Id:
router.post('/:reviewId/images', requireAuth, async (req, res) => {
    const { url } = req.body;
    const rvw = await Review.findByPk(req.params.reviewId)

    if (!rvw) {
        return res.status(404).json({
            message: "Review could not be found!", statusCode: 404,
        })
    }
    // Logic for max number of images
    const maxImg = await Image.findAll({
        where: {
            spotId: rvw.spotId
        }
    })
    if (maxImg.length >= 10) {
        res.status(403).json({
            message: "Maximum number of images are on this review",
            statusCode: 403,
        })
    }
    // end logic to create image:
    const newImg = await Image.create({
        url,
        spotId: rvw.spotId,
        userId: req.user.id
    });
    res.json(newImg);
})

module.exports = router;

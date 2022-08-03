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
router.put('/:reviewId', requireAuth, validateReview, async (req, res, next) => {
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
        const err = new Error("Review couldn't be found")
        err.status = 404
        return next(err)
    }
    if (thisReview.userId !== id) {
        const err = new Error("You are not authorized to edit this.")
        err.status = 403
        return next(err)
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
    let id = req.params.reviewId;
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
        const err = new Error("Maximum number of images have been reached.")
        err.status = 403
        return next(err)
    }
    // end logic to create image:
    const newImg = await Image.create({
        url: req.body.url,
        spotId: rvw.spotId,
        userId: req.user.id,
        reviewId: id
    });
    // return only what they want to see:
    res.json({
        id: newImg.id,
        imageableId: newImg.spotId,
        url: newImg.url
    });
})

// Delete a review:
router.delete('/:reviewId', requireAuth, async (req, res, next) => {
    const reviewDel = await Review.findByPk(req.params.reviewId);
    if (!reviewDel) {
        const err = new Error("Review couldn't be found")
        err.status = 404
        return next(err)
    }
    await reviewDel.destroy();
    res.json({
        message: "Review successfully deleted",
        statusCode: 200,
    })
})

module.exports = router;

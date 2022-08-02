const express = require('express')
const { setTokenCookie, requireAuth } = require('../../utils/auth');
const { Spot, Image, User, Review, Booking } = require('../../db/models');
const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');
const { Op } = require("sequelize");

const router = express.Router();

// Delete an image:
router.delete('/:imageId', requireAuth, async (req, res, next) => {
    let img = await Image.findByPk(req.params.imageId)

    if (!img) {
        const error = new Error("Image could not be found")
        error.status = 404
        return next(error);
    }

    img.destroy();
    img.save();

    res.json({
        message: "Successfully deleted.",
        statuscode: 200,
    })
})





module.exports = router

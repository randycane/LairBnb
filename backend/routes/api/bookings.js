const express = require('express')
const { setTokenCookie, requireAuth } = require('../../utils/auth');
const { Spot, Image, User, Review, Booking } = require('../../db/models');
const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');
const { Op } = require("sequelize");

const router = express.Router();

//Get all the current user bookings:
router.get('/current', requireAuth, async (req, res, next) => {
    const myOwnBook = await Booking.findAll({
        include: [
            {
                model: Spot,
            },
        ],
        where: { userId: req.user.id },
    });
    res.json(myOwnBook);
})







module.exports = router;

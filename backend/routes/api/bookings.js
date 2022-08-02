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

// Edit a Booking:
router.put('/:bookingId', requireAuth, async (req, res, next) => {
    const { startDate, endDate } = req.body;

    let abook = await Booking.findOne({
        where: {
            id: req.params.bookingId
        }
    });
    if (!abook) {
        const error = new Error("Booking could not be found!")
        error.status = 404
        return next(error);
    }
    const bookConflict = await Booking.findAll({
        where: {
            id: req.params.bookingId,
            [Op.and]: [
                { startDate: startDate },
                { endDate: endDate },
            ]
        }
    })
    if (bookConflict.length) {
        const error = new Error("This spot is already booked for these dates")
        error.status = 403
        error.errors = ["Start date conflicts with an existing booking",
            "End date conflicts with an existing booking"]
        return next(error)
    }

    if (endDate < Date.now()) {
        const error = new Error("You cannot edit a past booking")
        error.status = 403
        return next(error)
    }

    abook = await Booking.update(req.body, {
      where: {
        id: req.params.bookingId,
      },
    });
    abook = await Booking.findByPk(req.params.bookingId);
    res.json(abook);
})






module.exports = router;

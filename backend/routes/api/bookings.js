const express = require('express')
const { setTokenCookie, requireAuth } = require('../../utils/auth');
const { Spot, Image, User, Review, Booking } = require('../../db/models');
const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');
const { Op } = require("sequelize");

const router = express.Router();

//Get all the current user bookings --
router.get('/current', requireAuth, async (req, res, next) => {
    const myOwnBook = await Booking.findAll({
        where: { userId: req.user.id },
        include: [
            {
                model: Spot,
                attributes: ["id", "ownerId", "address", "city", "state", "country", "lat", "lng", "name", "price"],
                include: [{ model: Image, where: {"previewImage": true} } ]
            },
        ],
    });
    // manipulate response array to include with previewImage
    const array = [];
    myOwnBook.forEach(async book => {
        let bookWithImg = book.toJSON()
        bookWithImg.Spot["previewImage"] = bookWithImg.Spot.Images[0].url
        delete bookWithImg.Spot.Images
        array.push(bookWithImg)
    })
    //console.log(array)
    res.json({ "Bookings": array })
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

// Delete a booking:
router.delete('/:bookingId', requireAuth, async (req, res, next) => {
    let bookDel = await Booking.findByPk(req.params.bookingId)

    if (!bookDel) {
        const error = new Error("Booking could not be found")
        error.status = 404
        return next(error);
    }

    const { startDate } = bookDel.toJSON();
    if (new Date(startDate) < new Date()) {
        const error = new Error("Booking that has been started cannot be deleted")
        error.status = 403
        return next(error);
    }

    await bookDel.destroy()

    res.json({
        message: "Successfully deleted booking",
        statusCode: 200,
    })
})



module.exports = router;

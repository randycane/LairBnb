const express = require("express");
const { setTokenCookie, requireAuth } = require("../../utils/auth");
const { Spot, Image, User, Review, Booking } = require("../../db/models");
const { check } = require("express-validator");
const { handleValidationErrors } = require("../../utils/validation");
const { Op } = require("sequelize");

const router = express.Router();

//create a booking from a spot based on the spot's id

router.post("/:spotId", requireAuth, async (req, res, next) => {
  const spot = await Spot.findByPk(req.params.spotId);

  if (!spot) {
    return res.status(404).json({
      message: "Spot couldn't be found",
      statusCode: 404,
    });
  }
  const err = {
    message: "Validation error",
    statusCode: 400,
    errors: {},
  };
  const { startDate, endDate } = req.body;
  if (!startDate) err.errors.startDate = "Start date is required";
  if (!endDate) err.errors.endDate = "End date is required";
  if (startDate > endDate)
    err.errors.endDate = "End date cannot come before Start date";

  if (!startDate || !endDate || startDate > endDate) {
    return res.status(400).json(err);
  }
  const date1 = new Date(endDate).getTime();
  const date2 = new Date().getTime();
  if (date1 < date2) {
    return res.status(400).json({
      message: "Cannot book a spot in the past",
      statusCode: 400,
    });
  }

  const allDates = await Booking.findAll({
    attributes: ["startDate", "endDate"],
    where: {
      spotId: spot.id,
    },
  });

  err.message = "Sorry, this spot is already booked for the specified dates";
  err.errors = {};
  for (let dates of allDates) {
    let start = dates.startDate;
    let end = dates.endDate;
    let formattedStart = new Date(start).getTime();
    let formattedEnd = new Date(end).getTime();
    let formattedStartDate = new Date(startDate).getTime();
    let formattedEndDate = new Date(endDate).getTime();
    if (
      formattedStartDate >= formattedStart &&
      formattedStartDate <= formattedEnd
    ) {
      err.errors.startDate = "Start date conflicts with an existing booking";
    }
    if (
      formattedEndDate >= formattedStart &&
      formattedEndDate <= formattedEnd
    ) {
      err.errors.endDate = "End date conflicts with an existing booking";
    }
  }

  if (err.errors["endDate"] || err.errors["startDate"]) {
    return res.status(400).json({
      message: "Can't book a spot in the past",
      statusCode: 400,
      errors: err.errors,
    });
  }

  const booking = await Booking.create({
    spotId: spot.id,
    userId: req.user.id,
    startDate,
    endDate,
  });
  res.json(booking);
});

//Get all the current user bookings:
router.get("/current", requireAuth, async (req, res, next) => {
  const myOwnBook = await Booking.findAll({
    where: { userId: req.user.id },
    include: [
      {
        model: Spot,
        attributes: [
          "id",
          "ownerId",
          "address",
          "city",
          "state",
          "country",
          "lat",
          "lng",
          "name",
          "price",
          "previewImage",
        ],
        //include: [{ model: Image, where: { previewImage: true } }],
      },
    ],
  });
  res.json(myOwnBook);
});

//get all bookings route using preview image for now:
router.get("/", requireAuth, async (req, res) => {
  const bookings = await Booking.findAll({
    include: [
      {
        model: Spot,
        attributes: [
          "id",
          "ownerId",
          "address",
          "city",
          "state",
          "country",
          "lat",
          "lng",
          "name",
          "price",
          "previewImage",
        ],
        //include: [{ model: Image, where: { previewImage: true } }],
      },
    ],
    // where: { userId: req.user.id },
  });
  res.json(bookings);
});

  // manipulate response array to include with previewImage
//   const array = [];
//   myOwnBook.forEach(async (book) => {
//     let bookWithImg = book.toJSON();
//     bookWithImg.Spot["previewImage"] = bookWithImg.Spot.Images[0].url;
//     delete bookWithImg.Spot.Images;
//     array.push(bookWithImg);
//   });
//   res.json({ Bookings: array });
// });

// Edit a Booking:
router.put("/:bookingId", requireAuth, async (req, res, next) => {
  const { startDate, endDate } = req.body;

  let abook = await Booking.findOne({
    where: {
      id: req.params.bookingId,
    },
  });
  if (!abook) {
    const err = new Error("Booking could not be found!");
    err.status = 404;
    return next(err);
  }
  const bookConflict = await Booking.findAll({
    where: {
      id: req.params.bookingId,
      [Op.and]: [{ startDate: startDate }, { endDate: endDate }],
    },
  });
  if (bookConflict.length) {
    const err = new Error("This spot is already booked for these dates");
    err.status = 403;
    err.errors = [
      "Start date conflicts with an existing booking",
      "End date conflicts with an existing booking",
    ];
    return next(err);
  }

  if (endDate < Date.now()) {
    const err = new Error("You cannot edit a past booking");
    err.status = 403;
    return next(err);
  }

  abook = await Booking.update(req.body, {
    where: {
      id: req.params.bookingId,
    },
  });
  abook = await Booking.findByPk(req.params.bookingId);
  res.json(abook);
});

// Delete a booking:
router.delete("/:bookingId", requireAuth, async (req, res, next) => {
  let bookDel = await Booking.findByPk(req.params.bookingId);

  if (!bookDel) {
    const err = new Error("Booking could not be found");
    err.status = 404;
    return next(err);
  }

  const { startDate } = bookDel.toJSON();
  if (new Date(startDate) < new Date()) {
    const err = new Error("Booking that has been started cannot be deleted");
    err.status = 403;
    return next(err);
  }

  await bookDel.destroy();

  res.json({
    message: "Successfully deleted booking",
    statusCode: 200,
  });
});

module.exports = router;

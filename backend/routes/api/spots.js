const express = require("express");
const { setTokenCookie, requireAuth } = require("../../utils/auth");
const {
  Spot,
  Image,
  User,
  Review,
  Booking,
  sequelize,
} = require("../../db/models");
const { check, query} = require("express-validator");
const { handleValidationErrors } = require("../../utils/validation");
const { Op, operatorsAliases, literal, where } = require("sequelize");

const router = express.Router();

const validateSpot = [
  check("address")
    .exists({ checkFalsy: true })
    .withMessage("Street address is required"),
  check("city").exists({ checkFalsy: true }).withMessage("City is required"),
  check("state").exists({ checkFalsy: true }).withMessage("State is required"),
  check("country")
    .exists({ checkFalsy: true })
    .withMessage("Country is required"),
  check("lat")
    .exists({ checkFalsy: true })
    .withMessage("Latitude is not valid"),
  check("lng")
    .exists({ checkFalsy: true })
    .withMessage("Longitude is not valid"),
  check("name")
    .exists({ checkFalsy: true })
    .isLength({ max: 60 })
    .withMessage("Name must be less than 60 characters"),
  check("description")
    .exists({ checkFalsy: true })
    .withMessage("Description is required"),
  check("price")
    .isFloat({ min: 1 })
    .exists({ checkFalsy: true })
    .withMessage("Price per day is required"),
  handleValidationErrors,
];

// Get all spots:
// router.get('/', async (req, res) => {
//     let spots = await Spot.findAll({});
//     res.json(spots);
// })

// Get all spots with query params and search params:
router.get("/", async (req, res, next) => {
  let pagination = {
    filter: [],
  };
  let {
    page,
    size,
    maxLat,
    minLat,
    minLng,
    maxLng,
    minPrice,
    maxPrice,
    search,
  } = req.query;
  const err = {
    message: "Validation Error",
    statusCode: 400,
    errors: {},
  };

  page = parseInt(page);
  size = parseInt(size);

  if (Number.isNaN(page)) page = 1;
  if (Number.isNaN(size)) size = 20000;

  pagination.limit = size;
  pagination.offset = size * (page - 1);

  if (page > 10) page = 10;
  if (size > 20000) size = 20000;

  if (page < 0) err.errors = "Page must be greater than or equal to 0";
  if (size < 0) err.errors = "Size must be greater than or equal to 0";
  if (Number(maxLat) > 90) {
    err.errors = "Maximum latitude is invalid";
    maxLat = false;
  }
  if (Number(minLat) < -90) {
    err.errors = "Minimum latitude is invalid";
    minLng = false;
  }
  if (Number(maxLng) > 180) {
    err.errors = "Maximum longitude is invalid";
    maxLng = false;
  }
  if (Number(minLng) < -180) {
    err.errors = "Minimum longitude is invalid";
    minLng = false;
  }
  if (Number(minPrice) < 0) {
    err.errors = "Maximum price must be greater than 0";
    minPrice = false;
  }
  if (Number(maxPrice) < 0) {
    err.errors = "Minimum price must be greater than 0";
    maxPrice = false;
  }
  if (
    page < 0 ||
    size < 0 ||
    (!maxLat && maxLat !== undefined) ||
    (!minLat && minLat !== undefined) ||
    (!maxLng && maxLng !== undefined) ||
    (!minLng && minLng !== undefined) ||
    (!minPrice && minPrice !== undefined) ||
    (!maxPrice && maxPrice !== undefined)
  ) {
    res.status(400);
    res.json(err);
  }

  if (maxLat) {
    pagination.filter.push({
      lat: { [Op.lte]: Number(maxLat) },
    });
  }
  if (minLat) {
    pagination.filter.push({
      lat: { [Op.gte]: Number(minLat) },
    });
  }
  if (minLng) {
    pagination.filter.push({
      lng: { [Op.gte]: Number(minLng) },
    });
  }
  if (maxLng) {
    pagination.filter.push({
      lng: { [Op.lte]: Number(maxLng) },
    });
  }
  if (minPrice) {
    pagination.filter.push({
      price: { [Op.gte]: Number(minPrice) },
    });
  }
  if (maxPrice) {
    pagination.filter.push({
      price: { [Op.lte]: Number(maxPrice) },
    });
  }

  let spots;

  if (search) {
    const toLower = search.toLowerCase();
    const namedSpots = await Spot.findAll({
      group: ["Spot.id"],
      where: {
        name: sequelize.where(sequelize.fn('LOWER', sequelize.col('name')), 'LIKE', '%' + toLower+ '%')
      }
    })
  };


  const Spots = await Spot.findAll({
    where: {
      [Op.and]: pagination.filter,
    },
    limit: pagination.limit,
    offset: pagination.offset,
  });
  for (let spot of Spots) {
    const spotReviewArray = await spot.getReviews({
      attributes: [
        [sequelize.fn("AVG", sequelize.col("stars")), "avgStarRating"],
      ],
    });

    const avgRating = spotReviewArray[0].dataValues.avgStarRating;
    spot.dataValues.avgRating = Number(avgRating).toFixed(2);
    const previewImage = await Image.findOne({
      where: {
        [Op.and]: {
          spotId: spot.id,
          previewImage: true,
        },
      },
    });
    if (previewImage) {
      spot.dataValues.previewImage = previewImage.dataValues.url;
    }
  }
  res.json({
    page: page,
    size: size,
    Spots,
  });
});

// Create a spot:
router.post("/", requireAuth, validateSpot, async (req, res, next) => {
  let { address, city, state, country, lat, lng, name, description, price } =
    req.body;
  let newSpotOwner = req.user.id;

  let spot = await Spot.create({
    ownerId: newSpotOwner,
    address,
    city,
    state,
    country,
    lat,
    lng,
    name,
    description,
    price,
  });

  res.status(201);
  return res.json(spot);
});

//Get Spots owned by Current User--
router.get("/current", requireAuth, async (req, res, next) => {
  let id = req.user.id;
  let mySpots = await Spot.findAll({
    where: {
      ownerId: id,
    },
  });
  // try number 1 for lazy loading:

  // let myImg = await Image.findOne({
  //   where: {
  //     userId: req.user.id
  //   },
  // });
  // let arrayOut = []
  // for (let spot of mySpot) {
  //   let reviewOut = await Review.findOne({
  //     where: {
  //       [Op.and]: [
  //         { userId: req.user.id },
  //         { spotId: spot.toJSON().id }
  //       ]
  //     },
  //     attributes: [
  //       [sequelize.fn("AVG", sequelize.col("stars")), "avgStarRating"]
  //     ],
  //     raw: true,
  //   })
  //   let jsonspot = spot.toJSON()
  //   jsonspot.avgRating = Number(reviewOut.avgStarRating).toFixed(2)
  // }
  //   jsonspot.myImg = myImg.dataValues.url
  //   arrayOut.push(jsonspot)

  //   res.json({ "Spots": arrayOut });

  // lazy loading 2nd try attributes working:
  for (let eachSpot of mySpots) {
    let spotsReviews = await eachSpot.getReviews({
      attributes: [
        [sequelize.fn("AVG", sequelize.col("stars")), "avgStarRating"],
      ],
    });
    const avgRating = spotsReviews[0].dataValues.avgStarRating;
    eachSpot.dataValues.avgRating = Number(avgRating).toFixed(2);
    const previewImg = await Image.findOne({
      where: {
        [Op.and]: [{ spotId: eachSpot.id }, { previewImage: true }],
      },
    });
    if (previewImg) {
      eachSpot.dataValues.previewImage = previewImg.dataValues.url;
    }
  }
  res.json({
    Spots: mySpots,
  });
});

// Get details of spot Id:
router.get("/:spotId", async (req, res, next) => {
  const id = req.params.spotId;
  let spotDeets = await Spot.findByPk(id, {
    include: [
      {
        model: Image,
        attributes: ["id", ["spotId", "imageableId"], "url"],
      },
      {
        model: User,
        as: "Owner",
        attributes: ["id", "firstName", "lastName"],
      },
    ],
  });
  if (!spotDeets) {
    const err = new Error("Spot couldn't be found");
    err.status = 404;
    return next(err);
  }

  const numDeets = await Spot.findByPk(id, {
    include: {
      model: Review,
      attributes: [],
    },
    attributes: [
      [sequelize.fn("COUNT", sequelize.col("review")), "numReviews"],
      [sequelize.fn("AVG", sequelize.col("stars")), "avgStarRating"],
    ],
    raw: true,
  });
  let detailout = spotDeets.toJSON();
  detailout.numReviews = numDeets.numReviews;
  detailout.avgStarRating = numDeets.avgStarRating;
  res.json(detailout);
});

//Get all bookings for a spot by id:
router.get("/:spotId/bookings", requireAuth, async (req, res, next) => {
  //find spot first:
  const spotId = req.params.spotId;
  const searcher = req.user.id;
  const aspot = await Spot.findByPk(spotId);
  if (!aspot) {
    let err = new Error("This spot could not be found");
    err.status = 404;
    next(err);
  }
  // two cases:
  //one for if you are owner:
  if (aspot.Owner === searcher) {
    let isOwnerBooks = await Booking.findAll({
      include: {
        model: User,
        //attributes: ['id', 'firstName', 'lastName']
      },
      where: {
        spotId,
      },
    });
    res.json({ Bookings: isOwnerBooks });
  }
  // one for if you are not the owner:
  else {
    let notAnOwnerBooks = await Booking.findAll({
      where: { spotId },
      attributes: ["spotId", "startDate", "endDate"],
    });
    res.json({ Bookings: notAnOwnerBooks });
  }
});

// Get all Reviews by a Spot id:
router.get("/:spotId/reviews", async (req, res, next) => {
  let spotId = req.params.spotId;
  let isReviewed = await Spot.findByPk(spotId);

  if (!isReviewed) {
    let err = new Error("This spot could not be found");
    err.status = 404;
    return next(err);
  }
  const spotReview = await Review.findAll({
    where: {
      spotId: spotId,
    },
    include: [
      { model: User, attributes: ["id", "firstName", "lastName"] },
      { model: Image, attributes: ["id", ["reviewId", "imageableId"], "url"] },
    ],
  });
  res.json({ Reviews: spotReview });
});

// Create a booking based on Spot Id moved to bookings file:
router.post("/:spotId/bookings", requireAuth, async (req, res, next) => {
  const spotId = req.params.spotId;
  let { startDate, endDate } = req.body;

  const tryBook = await Spot.findByPk(spotId);
  if (!tryBook) {
    const err = new Error("Spot could not be found");
    err.status = 404;
    return next(err);
  }
  // Body validation error, ex: end date coming before start:
  if (endDate <= startDate) {
    let err = new Error("Validation Error");
    err.status = 400;
    err.errors = { endDate: "endDate cannot be on or before startDate" };
    return next(err);
  }
  // Booking conflicts:
  let bookConflict = await Booking.findAll({
    where: {
      [Op.and]: [
        {
          startDate: {
            [Op.lte]: endDate,
          },
        },
        {
          endDate: {
            [Op.gte]: startDate,
          },
        },
      ],
    },
  });
  // if this conflict array ever exists, throw the error:
  if (bookConflict.length) {
    const err = new Error(
      "Sorry, this spot is booked for these specified dates"
    );
    err.status = 403;
    err.errors = {
      startDate: "Start date conflicts with an existing booking",
      endDate: "End date conflicts with an exisiting booking",
    };
    return next(err);
  }

  let newBook = await Booking.create({
    spotId,
    startDate,
    endDate,
    userId: req.user.id,
  });
  return res.json(newBook);
});

//Edit a spot:
router.put("/:spotId", requireAuth, validateSpot, async (req, res, next) => {
  let { address, city, state, country, lat, lng, name, description, price } =
    req.body;
  const edittedSpot = await Spot.findByPk(req.params.spotId);
  if (!edittedSpot) {
    let err = new Error("This spot could not be found");
    err.status = 404;
    return next(err);
  }
  if (req.user.id !== edittedSpot.ownerId) {
    let err = new Error("You must own this spot to edit");
    err.status = 403;
    return next(err);
  }
  edittedSpot.address = address;
  edittedSpot.city = city;
  edittedSpot.state = state;
  edittedSpot.country = country;
  edittedSpot.lat = lat;
  edittedSpot.lng = lng;
  edittedSpot.name = name;
  edittedSpot.description = description;
  edittedSpot.price = price;

  await edittedSpot.save();

  return res.json(edittedSpot);
});

// Create a review for a spot:
router.post("/:spotId/reviews", requireAuth, async (req, res, next) => {
  const { userId, spotId, review, stars } = req.body;
  const toReview = await Spot.findByPk(req.params.spotId);

  const errorObj = {
    message: "Validation Error",
    statusCode: 400,
    errors: {},
  };
  if (!toReview) {
    let err = new Error("This spot could not be found");
    err.status = 404;
    return next(err);
  }
  const reviewed = await Review.findAll({
    where: {
      [Op.and]: [{ spotId: req.params.spotId }, { userId: req.user.id }],
    },
  });
  // if the review or star logic is violated:
  if (!review) errorObj.errors = { review: "Review text is required." };
  if (stars < 1 || stars > 5 || !stars) {
    errorObj.errors = { stars: "Stars must be number between 1 and 5." };
  }

  // if (!review || !stars) {
  //     return res.status(400).json(errorObj)
  // }

  if (reviewed.length >= 1) {
    let err = new Error("This spot already has a review.");
    err.status = 403;
    return next(err);
  }

  const newReview = await Review.create({
    userId: req.user.id,
    spotId: req.params.spotId,
    review,
    stars,
  });

  res.status(201);
  return res.json(newReview);
});

// Add an image to Spot based on spot Id:
router.post("/:spotId/images", requireAuth, async (req, res, next) => {
  const id = req.params.spotId;
  let img = await Spot.findByPk(req.params.spotId);

  if (!img) {
    let err = new Error("Spot could not be found");
    err.status = 404;
    return next(err);
  }
  const newImg = await Image.create({
    url: req.body.url,
    spotId: req.params.spotId,
    userId: req.user.id,
  });
  res.json({ id: newImg.id, imageableId: newImg.spotId, url: newImg.url });
});

// Delete a spot:
router.delete("/:spotId", requireAuth, async (req, res, next) => {
  let spotDel = await Spot.findByPk(req.params.spotId);
  if (!spotDel) {
    let err = new Error("This spot could not be found");
    err.status = 404;
    return next(err);
  }

  await spotDel.destroy();

  res.json({
    message: "Spot successfully deleted",
    statusCode: 200,
  });
});

module.exports = router;

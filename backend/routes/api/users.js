
const express = require('express')

const { setTokenCookie, requireAuth } = require('../../utils/auth');
const { User } = require('../../db/models');
const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');
const router = express.Router();

//Sign up
// router.post('/', async (req, res) => {
//       const { firstName, lastName, email, password, username } = req.body;
//       const user = await User.signup({ firstName, lastName, email, username, password });

//       await setTokenCookie(res, user);

//       return res.json({
//         user
//       });
//     }
// );


const validateSignup = [
    check('firstName')
     .exists({ checkFalsy: true })
      .withMessage('First name cannot be empty.'),
    check('lastName')
      . exists({ checkFalsy: true })
      .withMessage('Last name cannot be empty.'),
    check('email')
      .exists({ checkFalsy: true })
      .isEmail()
      .withMessage('Please provide a valid email.'),
    check('username')
      .exists({ checkFalsy: true })
      .isLength({ min: 4 })
      .withMessage('Please provide a username with at least 4 characters.'),
    check('username')
      .not()
      .isEmail()
      .withMessage('Username cannot be an email.'),
    check('password')
      .exists({ checkFalsy: true })
      .isLength({ min: 6 })
      .withMessage('Password must be 6 characters or more.'),
    handleValidationErrors
  ];


// Sign up with auth:
router.post('/',validateSignup, async (req, res) => {
    const { firstName, lastName, email, password, username } = req.body;

  const checkEmail = await User.findOne({
        where: {email}
  })
  if (checkEmail) {
    res.status(403);
    res.json({
      message: "User with that email already exists!"
    })
  }

  try {
    const user = await User.signup({ firstName, lastName, email, username, password });
    const token = await setTokenCookie(res, user);

    const newUser = {
      id: user.id,
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      token: token
    };

    return res.json(newUser);

  } catch (error) {
    res.status(403);
    res.json({
      "message": "User with that email is already in use.",
      "statusCode": 403,
    })
  }
});



module.exports = router;

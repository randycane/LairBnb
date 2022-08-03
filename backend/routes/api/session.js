const express = require('express')
const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');
const { setTokenCookie, restoreUser, requireAuth } = require('../../utils/auth');
const { User } = require('../../db/models');

const router = express.Router();

const validateLogin = [
    check('credential')
      .exists({ checkFalsy: true })
      .notEmpty()
      .withMessage('Email or Username is required.'),
    check('password')
      .exists({ checkFalsy: true })
      .withMessage('Password is required.'),
    handleValidationErrors
  ];

// Log in route:
router.post('/', validateLogin, async (req, res, next) => {
      const { credential, password } = req.body;

      let user = await User.login({ credential, password });

      if (!user) {
        const err = new Error('Invalid Credentials');
        err.status = 401;
        return next(err);
      }

    let token = await setTokenCookie(res, user);
    user = user.toJSON();
    user.token = token
      return res.json({
        id: user.id,
        firstName: user.firstName,
        lastName: user.lastName,
        username: user.username,
        email: user.email,
        token: user.token,
      });
    }
);


// Log out
router.delete('/',
    (_req, res) => {
      res.clearCookie('token');
      return res.json({ message: 'success' });
    }
);


// Restore session user
router.get(
  '/',
  restoreUser,
  (req, res) => {
    const { user } = req;
    if (user) {
      return res.json({
        user: user.toSafeObject()
      });
    } else return res.json({});
  }
);

module.exports = router;

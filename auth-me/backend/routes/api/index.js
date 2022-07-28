const router = require('express').Router();

// GET /api/restore-user
const { restoreUser } = require('../../utils/auth.js');

// remember: // If current user session is not valid, set req.user to null
router.use(restoreUser);
//Test require auth:
// router.get(
//   '/restore-user',
//   (req, res) => {
//     return res.json(req.user);
//   }
// );

//Test the api router:
router.post('/test', function(req, res) {
    res.json({ requestBody: req.body });
  });

//Test user auth middlewares:
// GET /api/set-token-cookie
const { setTokenCookie } = require('../../utils/auth.js');
const { User } = require('../../db/models');
// router.get('/set-token-cookie', async (_req, res) => {
//   const user = await User.findOne({
//       where: {
//         username: 'Demo-lition'
//       }
//     });
//   setTokenCookie(res, user);
//   return res.json({ user });
// });
module.exports = router;

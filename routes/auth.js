const express = require('express');

const router = express.Router();
const { body } = require('express-validator/check');

const authController = require('../controllers/auth');

router.get('/sign-up', authController.getSignUp);
router.post(
  '/signUp',
  [
    body('userName', 'Username must be atleast 3 symbols long')
      .isString()
      .isLength({ min: 3 })
      .trim(),
    body('email', 'Email must be valid email address').isEmail(),
    body('password', 'Password has to be valid.')
      .isLength({ min: 8 })
      .isAlphanumeric(),
    body('matchPassword')
      .trim()
      .isLength({ min: 8 })
      .isAlphanumeric()
      .custom((value, { req }) => {
        if (value !== req.body.password) {
          throw new Error('Passwords have to match!');
        }
        return true;
      })
  ],
  authController.postSignUp
);
router.post(
  '/login',
  [
    body('email', 'Email must be valid email address').isEmail(),
    body('password', 'Password has to be valid.')
      .isLength({ min: 8 })
      .isAlphanumeric()
  ],
  authController.postLogin
);
router.get('/login', authController.getLogin);
router.get('/logout',authController.getLogout)

module.exports = router;

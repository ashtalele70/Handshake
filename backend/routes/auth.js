const express = require('express');

const router = express.Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const config = require('config');
const { check, validationResult } = require('express-validator');
const auth = require('../middleware/auth');

const User = require('../models/Student');

// @route     GET /auth
// @desc      Get logged in user
// @access    Private
router.get('/', auth, async (req, res) => {
  console.log(req.body);
  try {
    const user = await User.findOne({
      where: {
        EMAIL_ID: req.body.EMAIL_ID
      },
    });

    console.log(user);
    res.json(user);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route     POST /auth
// @desc      Auth user & get token
// @access    Public
router.post(
  '/',
  [
    check('EMAIL_ID', 'Please include a valid email').isEmail(),
    check('PASSWORD', 'Password is required').exists(),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { EMAIL_ID, PASSWORD } = req.body;

    try {
      const user = await User.findOne({
        where: {
          EMAIL_ID,
        },
      });
      // console.log('asdsads', user);
      if (!user) {
        return res.status(400).json({ msg: 'User does not exists' });
      }

      const isMatch = await bcrypt.compare(PASSWORD.toString(), user.PASSWORD);
      if (!isMatch) {
        return res.status(400).json({ msg: 'Invalid Credentials' });
      }

      const payload = {
        user: {
          id: user.id,
        },
      };

      jwt.sign(
        payload,
        config.get('jwtSecret'),
        {
          expiresIn: 360000,
        },
        (err, token) => {
          if (err) throw err;
          res.json({ token });
        },
      );
    } catch (err) {
      console.error(err);
      res.status(500).send('Server Error');
    }
  },
);

module.exports = router;

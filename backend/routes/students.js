/* eslint-disable no-console */
const express = require('express');
const gravatar = require('gravatar');

const router = express.Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const config = require('config');
const { check, validationResult } = require('express-validator');
// const auth = require('../middleware/auth');

const { STUDENT, STUDENT_PROFILE } = require('../config/dbConnection');

// @route     POST /students
// @desc      Regiter a user
// @access    Public
router.post(
  '/',
  [
    check('FIRST_NAME').isString(),
    check('LAST_NAME').isString(),
    check('EMAIL_ID', 'Please include a valid email').isEmail(),
    check(
      'PASSWORD',
      'Please enter a password with 4 or more characters',
    ).isLength({ min: 3 }),
    check('COLLEGE_NAME').isString(),
  ],

  // eslint-disable-next-line consistent-return
  async (req, res) => {
    console.log(res.body);
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const {
      FIRST_NAME, LAST_NAME, EMAIL_ID, PASSWORD, COLLEGE_NAME,
	} = req.body;
	
    try {
      console.log(EMAIL_ID);
      let user = await STUDENT.findOne({
        where: {
          EMAIL_ID,
        },
      });
      if (user) {
        return res.status(400).json({ errors: [{ msg: 'User already exists' }] });
      }

      const avator = gravatar.url(EMAIL_ID, {
        s: '200',
        r: 'pg',
        d: 'mm',
      });

      // console.log("gravator", avator);
      user = new STUDENT({
        FIRST_NAME,
        LAST_NAME,
        EMAIL_ID,
        PASSWORD,
        COLLEGE_NAME,
	  });

      const salt = await bcrypt.genSalt(10);

      user.PASSWORD = await bcrypt.hash(PASSWORD, salt);

      await user.save();

	  userP = new STUDENT_PROFILE({
        STUDENTId : user.id,
	  });
	  await userP.save();

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
      console.error(err.message);
      res.status(500).send('Server Error');
    }
  },
);


module.exports = router;

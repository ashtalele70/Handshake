const express = require('express');
const gravatar = require('gravatar');

const router = express.Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const config = require('config');
const { check, validationResult } = require('express-validator');
const auth = require('../middleware/auth');

const Student = require('../models/Student');

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
      'Please enter a password with 6 or more characters',
    ).isLength({ min: 6 }),
  ],

  // eslint-disable-next-line consistent-return
  async (req, res) => {

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const {
      FIRST_NAME, LAST_NAME, EMAIL_ID, PASSWORD,
    } = req.body;


    try {
      console.log(EMAIL_ID);
      let user = await Student.findOne({
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

      //console.log("gravator", avator);
      user = new Student({
        FIRST_NAME,
        LAST_NAME,
        EMAIL_ID,
        PASSWORD,
        PROFILE_PICTURE: avator,
      });

      const salt = await bcrypt.genSalt(10);

      user.PASSWORD = await bcrypt.hash(PASSWORD, salt);

      await user.save();

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


// @route     PUT /students/:id
// @desc      Update contact
// @access    Private
router.put('/:id', auth, async (req, res) => {
  const { name, email, phone, type } = req.body;

  // Build contact object
  const studentFields = {};
  if (name) contactFields.name = name;
  if (email) contactFields.email = email;
  if (phone) contactFields.phone = phone;
  if (type) contactFields.type = type;

  try {
    let contact = await Contact.findById(req.params.id);

    if (!contact) return res.status(404).json({ msg: 'Contact not found' });

    // Make sure user owns contact
    if (contact.user.toString() !== req.user.id) {
      return res.status(401).json({ msg: 'Not authorized' });
    }

    contact = await Contact.findByIdAndUpdate(
      req.params.id,
      { $set: contactFields },
      { new: true }
    );

    res.json(contact);
  } catch (err) {
    console.error(er.message);
    res.status(500).send('Server Error');
  }
});

module.exports = router;

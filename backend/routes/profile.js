/* eslint-disable consistent-return */
/* eslint-disable no-console */

const express = require('express');

// const request = require('request');
// const config = require('config');

const router = express.Router();
const { check, validationResult } = require('express-validator');
// bring in normalize to give us a proper url, regardless of what user entered
const normalize = require('normalize-url');
const auth = require('../middleware/auth');

const { STUDENT, STUDENT_PROFILE } = require('../config/dbConnection');

// @route    GET /studentProfile/current
// @desc     Get current users profile
// @access   Private
router.get('/current', auth, async (req, res) => {
  try {
    const studentProfile = await STUDENT_PROFILE.findOne({
      // where: {
      // STUDENTId: req.user.id
      // },
      include: [{
        model: STUDENT,
        where: { id: req.user.id },
      },
      ],

    });
    // ).populate('user', ['name', 'avatar']);
    // console.log(studentProfile);
    // let { FIRST_NAME, LAST_NAME, PROFILE_PICTURE } = studentProfile;
    // console.log(FIRST_NAME);

    if (!studentProfile) {
      return res.status(400).json({ msg: 'There is no profile for this student' });
    }

    res.json(studentProfile);
    // if (!studentProfile) {
    // return res.status(400).json({ msg: 'There is no profile for this user' });
    // }

    // res.json(studentProfile);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});


// @route    POST /studentProfile/current
// @desc     Create or update user profile
// @access   Private

router.post(
  '/current',
  [
    auth,
    [
      check('STATUS', 'Status is required')
        .not()
        .isEmpty(),
      check('SKILLS', 'Skills is required')
        .not()
        .isEmpty(),
    ],
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const {
      COMPANY,
      LOCATION,
      WEBSITE,
      BIO,
      SKILLS,
      STATUS,
    } = req.body;

    const profileFields = {
      STUDENTId: req.user.id,
      COMPANY,
      LOCATION,
      WEBSITE: WEBSITE === '' ? '' : normalize(WEBSITE, { forceHttps: true }),
      BIO,
      SKILLS,
      // skills: Array.isArray(skills)
      // ? skills
      // : skills.split(',').map(skill => ' ' + skill.trim()),
      STATUS,
    };

    // Build social object and add to profileFields
    // const socialfields = { youtube, twitter, instagram, linkedin, facebook };

    // for (const [key, value] of Object.entries(socialfields)) {
    // if (value.length > 0)
    // socialfields[key] = normalize(value, { forceHttps: true });
    // }
    // profileFields.social = socialfields;

    try {
      // Using upsert option (creates new doc if no match is found):
      // let profile = await STUDENT_PROFILE.findOneAndUpdate(
      // { STUDENTId: req.user.id },
      // { $set: profileFields },
      // { new: true, upsert: true }
      // );

      // const studentProfile = new STUDENT_PROFILE.create({
      // ...profileFields
      // })
      const studentProfile = new STUDENT_PROFILE({
        ...profileFields,
      });

      await studentProfile.save();

      res.json(studentProfile);
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error');
    }
  },
);

module.exports = router;

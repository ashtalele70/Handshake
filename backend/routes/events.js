/* eslint-disable no-console */
const express = require('express');
// const gravatar = require('gravatar');

const router = express.Router();
// const { check, validationResult } = require('express-validator');
const auth = require('../middleware/auth');

const { EVENT, COMPANY } = require('../config/dbConnection');

// @route     GET /jobs
// @desc      Get all the jobs for a student
// @access    Public
router.get(
  '/', auth,

  // eslint-disable-next-line consistent-return
  async (req, res) => {
    console.log(res.body);
    // const errors = validationResult(req);
    // if (!errors.isEmpty()) {
    //   return res.status(400).json({ errors: errors.array() });
    // }

    // const {
    //   FIRST_NAME, LAST_NAME, EMAIL_ID, PASSWORD, COLLEGE_NAME,
    // } = req.body;
    console.log(req.user);
    try {
      const eventList = await EVENT.findAll({
        include: [{
          model: COMPANY,
        }],
      });

      //console.log(eventList);
      res.json(eventList);
	  } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error');
	  }
  },
);

module.exports = router;

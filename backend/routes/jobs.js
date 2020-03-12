/* eslint-disable no-console */
const express = require('express');
// const gravatar = require('gravatar');

const router = express.Router();
// const { check, validationResult } = require('express-validator');
const auth = require('../middleware/auth');

const { JOB, COMPANY, APPLICATION } = require('../config/dbConnection');

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
      const jobList = await JOB.findAll({
        include: [{
          model: COMPANY,
        }],
      });

      console.log(jobList);
      res.json(jobList);
	  } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error');
	  }
  },
);

// @route     POST /jobs
// @desc      Get all the jobs for a company
// @access    Public

router.post(
  '/', auth,
  // eslint-disable-next-line consistent-return
  async (req, res) => {
    console.log(req.body);
    const {
      TITLE, JOB_TYPE, APP_DEADLINE, POST_DATE, LOCATION, SALARY, DESCRIPTION,
		  } = req.body;

	  try {
      const job = new JOB({
        TITLE,
        JOB_TYPE,
        APP_DEADLINE,
        POST_DATE,
        LOCATION,
        SALARY,
        DESCRIPTION,
        COMPANYId: req.user.id,
		  });
      await job.save();
      res.json(job);
	  } catch (err) {
      console.error(err);
      res.status(500).send('Server Error');
	  }
  },
);


// @route     GET /jobs/filters
// @desc      Get all the jobs for a company
// @access    Public

router.get(
  '/filters', auth,
  // eslint-disable-next-line consistent-return
  async (req, res) => {
	  console.log('body', req.body);
	  try {
		  console.log(req.body.JobType, req.body.Location);
      let jobList = await JOB.findAll();

      if (req.body.JobType) {
        jobList = jobList.filter((job) => req.body.JobType.includes(job.JOB_TYPE));
      }
      if (req.body.Location) {
        jobList = jobList.filter((job) => req.body.Location.includes(job.LOCATION));
      }
      res.json(jobList);
			  } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error');
			  }
  },
);


// @route     GET /jobs/employerjobs
// @desc      Get all the jobs for a company
// @access    Public

router.get(
  '/employerjobs', auth,
  // eslint-disable-next-line consistent-return
  async (req, res) => {
    console.log('user', req.user);
    const COMPANYId = req.user.id;
    console.log('COMPANYId', COMPANYId);
    try {
      const jobList = await JOB.findAll({
        where: {
          COMPANYId,
        },
      });
      console.log(jobList);
      res.json(jobList);
    } catch (err) {
			  console.error(err.message);
			  res.status(500).send('Server Error');
    }
		  },
);

// @route     GET /jobs/appliedjobs
// @desc      Get all the jobs for a company
// @access    Public

router.get(
  '/appliedjobs', auth,
  // eslint-disable-next-line consistent-return
  async (req, res) => {
	  const STUDENTId = req.user.id;
	  console.log('STUDENTId', STUDENTId);
	  try {
      const jobList = await APPLICATION.findAll({
		  where: {
          STUDENTId,
		  },
		  include: [{
          model: JOB,
		  }],
      });
      res.json(jobList);
	  } catch (err) {
      console.error(err);
      res.status(500).send('Server Error');
	  }
  },
);

module.exports = router;

const express = require('express');

const router = express.Router();
const auth = require('../middleware/auth');

const { REGISTRATION, EVENT, STUDENT } = require('../config/dbConnection');

router.post('/', auth, async (req, res) => {
  try {
	console.log("in body ", req.body);
    const regEntry = await REGISTRATION.findOne({
      where: {
        STUDENTId: req.user.id,
        EVENTId: req.body.id,
      },
	});
	console.log("regEntry", regEntry);
    if (regEntry) {
      await regEntry.update({
        STATUS: 'REGISTERED',
      });
      res.status(200).json(req.file);
    } else {
		console.log("in STUDENTId ", req.body);
      const newEntry = new REGISTRATION({
        STUDENTId: req.user.id,
        EVENTId: req.body.id,
        STATUS: 'REGISTERED',
      });
      await newEntry.save();
    }
    res.status(200).json('Successful');
  } catch (e) {
	  console.log(e);
    return res.status(500).json('Unable to save data.');
  }
});

// @route     POST /registrations/updateStatus
// @desc      Get all the jobs for a company
// @access    Public

router.post('/updateStatus', auth, async (req, res) => {
	try {
	  const appEntry = await REGISTRATION.findOne({
		where: {
		  id: req.body.applicationId,
		},
	  });
	  console.log("appEntry", appEntry);
	 if (appEntry && req.body.applicationId) {
		await appEntry.update({
		  STATUS: req.body.status,
			});
	  } 
	  res.status(200).json('Successful');
	} catch (e) {
	  return res.status(500).json('Unable to save data.');
	}
  });

// @route     GET /registrations/students
// @desc      Get all the jobs for a company
// @access    Public

router.get(
  '/students', auth,
  // eslint-disable-next-line consistent-return
  async (req, res) => {
    try {
      const jobList = await REGISTRATION.findAll({
        where: {
          EVENTId: req.query.id,
        },
        include: [{
		  model: EVENT,
        },
        {
          model: STUDENT,
        },
        ],
      });
      res.json(jobList);
    } catch (err) {
      console.error(err);
      res.status(500).send('Server Error');
    }
  },
);

module.exports = router;

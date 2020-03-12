const express = require('express');

const router = express.Router();

const multer = require('multer');

const storage = multer.diskStorage({
  destination(req, file, cb) {
    cb(null, './uploads');
  },
  filename(req, file, cb) {
    cb(null, file.originalname);
  },
});

const upload = multer({ storage });

const auth = require('../middleware/auth');

const { APPLICATION, JOB, STUDENT } = require('../config/dbConnection');

router.post('/', upload.single('resume'), auth, async (req, res) => {
  try {
    const appEntry = await APPLICATION.findOne({
      where: {
        STUDENTId: req.user.id,
        JOBId: req.body.id,
      },
    });
    if (appEntry) {
      await appEntry.update({
        RESUME: req.file.filename,
      });
      res.status(200).json(req.file);
    } else {
      const newEntry = new APPLICATION({
        STUDENTId: req.user.id,
        JOBId: req.body.id,
        RESUME: req.file.filename,
        STATUS: 'PENDING',
      });
      await newEntry.save();
    }
    res.status(200).json('Successful');
  } catch (e) {
    return res.status(500).json('Unable to save data.');
  }
});

// @route     GET /applications/students
// @desc      Get all the jobs for a company
// @access    Public

router.get(
  '/students', auth,
  // eslint-disable-next-line consistent-return
  async (req, res) => {
    const STUDENTId = req.body.id;
    console.log('STUDENTId', STUDENTId);
    try {
      const jobList = await APPLICATION.findAll({
        where: {
          JOBId: req.body.id,
        },
        include: [{
		  model: JOB,
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

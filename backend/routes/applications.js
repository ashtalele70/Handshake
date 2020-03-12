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

const { APPLICATION } = require('../config/dbConnection');

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
		STATUS: 'APPLIED'
      });
      await newEntry.save();
    }
    res.status(200).json('Successful');
  } catch (e) {
    return res.status(500).json('Unable to save data.');
  }
});


module.exports = router;

const express = require('express');

const router = express.Router();
const auth = require('../middleware/auth');

const { REGISTRATION } = require('../config/dbConnection');

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


module.exports = router;

/* eslint-disable consistent-return */
/* eslint-disable no-console */

const express = require('express');

const router = express.Router();
const { check, validationResult } = require('express-validator');
// bring in normalize to give us a proper url, regardless of what user entered
const normalize = require('normalize-url');
const auth = require('../middleware/auth');
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

const dateformat = require('dateformat');

const fs = require('fs');
const {
  STUDENT, STUDENT_PROFILE, STUDENT_EDUCATION, STUDENT_EXPERIENCE,
} = require('../config/dbConnection');


// @route    GET /studentProfile/current
// @desc     Get current users profile
// @access   Private
router.get('/current', auth, async (req, res) => {
  try {
    const studentProfile = await STUDENT_PROFILE.findOne({
      include: [{
        model: STUDENT,
        where: { id: req.user.id },
      },
      ],

    });
    if (!studentProfile) {
      return res.status(400).json({ msg: 'There is no profile for this student' });
    }
    res.json(studentProfile);
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
      STATUS,
    };

    try {
      let studentProfile = await STUDENT_PROFILE.findOne({
        include: [{
          model: STUDENT,
          where: { id: req.user.id },
        },
        ],

      });

      if (studentProfile) {
        const updatedProfile = await studentProfile.update({
          ...profileFields,
        });
        studentProfile = await STUDENT_PROFILE.findOne({
          where: {
            id: updatedProfile.id,
          },
        });
      } else {
        studentProfile = new STUDENT_PROFILE({
          ...profileFields,
        });

        await studentProfile.save();
      }


      res.status(200).json(studentProfile);
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error');
    }
  },
);

// @route    GET /studentProfile/education
// @desc     Create or update user profile education
// @access   Private

router.get('/education', auth, async (req, res) => {
  try {
	  console.log("called");
    const studentProfile = await STUDENT_PROFILE.findOne({
      include: [{
			  model: STUDENT,
			  where: { id: req.user.id },
      },
      ],

		  });

    console.log('req.user.id', req.user.id);
    const studentEducation = await STUDENT_EDUCATION.findAll({
      include: [{
        model: STUDENT_PROFILE,
        where: { id: studentProfile.id },
			  },
			  ],
    });
    if (studentEducation) {
      return res.status(200).json(studentEducation);
    }
  } catch (e) {
    return res.status(500).json('Unable to fetch data.');
  }
});

// @route    POST /studentProfile/education
// @desc     Create or update user profile education
// @access   Private

router.post(
  '/education', auth,
  async (req, res) => {
    const {
      COLLEGE_NAME,
      DEGREE,
      LOCATION,
      FROM,
      TO,
      CURRENT,
      DESCRIPTION,
    } = req.body;

    console.log('req.user.id', req.user.id);

    const studentProfile = await STUDENT_PROFILE.findOne({
      include: [{
        model: STUDENT,
        where: { id: req.user.id },
      },
      ],

	  });

	  console.log('Student Profile', studentProfile);

    const educationFields = {
      STUDENTPROFILEId: studentProfile.id,
      COLLEGE_NAME,
      DEGREE,
      LOCATION,
      FROM,
      TO,
      CURRENT,
      DESCRIPTION,
    };

    try {
      const studentEducation = new STUDENT_EDUCATION({
        ...educationFields,
      });

      await studentEducation.save();

      res.json(studentEducation);
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error');
    }
  },
);

// @route    GET /studentProfile/experience
// @desc     Create or update user profile experience
// @access   Private

router.get('/experience', auth, async (req, res) => {
  try {
    const studentProfile = await STUDENT_PROFILE.findOne({
		  include: [{
				  model: STUDENT,
				  where: { id: req.user.id },
		  },
		  ],

			  });

    console.log('req.user.id', req.user.id);
    const studentExperience = await STUDENT_EXPERIENCE.findAll({
		  include: [{
        model: STUDENT_PROFILE,
        where: { id: studentProfile.id },
				  },
				  ],
    });
    if (studentExperience) {
		  return res.status(200).json(studentExperience);
    }
	  } catch (e) {
    return res.status(500).json('Unable to fetch data.');
	  }
});

// @route    POST /studentProfile/experience
// @desc     Create or update user profile experience
// @access   Private

router.post('/experience', auth, async (req, res) => {
  const {
    COMPANY_NAME,
    POSTION,
    LOCATION,
    FROM,
    TO,
    CURRENT,
    DESCRIPTION,
	  } = req.body;

	  console.log('req.user.id', req.user.id);

	  const studentProfile = await STUDENT_PROFILE.findOne({
    include: [{
		  model: STUDENT,
		  where: { id: req.user.id },
    },
    ],

  });

  console.log('Student Profile', studentProfile);

	  const experienceFields = {
    STUDENTPROFILEId: studentProfile.id,
    COMPANY_NAME,
    POSTION,
    LOCATION,
    FROM,
    TO,
    CURRENT,
    DESCRIPTION,
	  };

	  try {
    const studentExperience = new STUDENT_EXPERIENCE({
		  ...experienceFields,
    });

    await studentExperience.save();

    res.json(studentExperience);
	  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
	  }
});

// router.get('/skillset', auth, async (req, res) => {
//     try {
//         const skillset = await SkillSet.findAll({
//             where: {
//                 student_id: req.user.id,
//             },
//         });
//         if (skillset) {
//             const skills = [];
//             skillset.forEach((skillObj) => {
//                 skills.push(skillObj.skill);
//             })
//             return res.status(200).json(skills);
//         }
//     } catch (e) {
//         return res.status(500).json('Unable to fetch data.');
//     }
// });

// router.post('/skillset', auth, async (req, res) => {
//     try {
//         const skillEntry = new SkillSet({
//             skill: req.body.skill,
//             student_id: req.user.id,
//         });
//         await skillEntry.save();
//         res.status(200).json('Successful');
//     } catch (e) {
//         return res.status(500).json('Unable to save data.');
//     }
// });

// router.get('/profilepic', auth, async (req, res) => {
//     try {
//         const profilepic = await Student.findOne({
//             where: {
//                 student_id: req.student_id,
//             },
//         });
//         if (profilepic) {
//             return res.status(200).json(profilepic);
//         }
//     } catch (e) {
//         return res.status(500).json('Unable to fetch data.');
//     }
// });

// @route    POST /studentProfile/profilepic
// @desc     Create or update user profile profile picture
// @access   Private

router.post('/profilepic', upload.single('profile_pic'), auth, async (req, res) => {
  try {
    const studentDetails = await STUDENT.findOne({
      where: {
        id: req.body.id,
      },
    });
    if (studentDetails) {
      await studentDetails.update({
        profile_pic: req.file,
      });
      res.status(200).json(req.file);
    }
    // '../../../uploads/img2.jpg'
  } catch (e) {
    return res.status(400).json('Unable to fetch data.');
  }
});

module.exports = router;

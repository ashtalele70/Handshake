const { Sequelize } = require('sequelize');
const config = require('config');

const db = config.get('DB_URL');
const opts = {
	define: {
		// prevent sequelize from pluralizing table names
		freezeTableName: true,
		timestamps: false,
	},
};


const connectDB = new Sequelize(db, opts);

const STUDENT = require('../models/Student')(connectDB, Sequelize);
const STUDENT_PROFILE = require('../models/StudentProfile')(connectDB, Sequelize);
const STUDENT_EDUCATION = require('../models/Education')(connectDB, Sequelize);
const STUDENT_EXPERIENCE = require('../models/Experience')(connectDB, Sequelize);
const COMPANY = require('../models/Company')(connectDB, Sequelize);
const JOB = require('../models/Job')(connectDB, Sequelize);
const APPLICATION = require('../models/Application')(connectDB, Sequelize);
const SKILLSET = require('../models/Skillset')(connectDB, Sequelize);

connectDB.sync({ alter: false });

STUDENT_PROFILE.belongsTo(STUDENT);
SKILLSET.belongsTo(STUDENT_PROFILE);
STUDENT_EDUCATION.belongsTo(STUDENT_PROFILE);
STUDENT_EXPERIENCE.belongsTo(STUDENT_PROFILE);
JOB.belongsTo(COMPANY);
APPLICATION.belongsTo(JOB);
APPLICATION.belongsTo(STUDENT);


module.exports = { STUDENT, STUDENT_PROFILE, STUDENT_EDUCATION, STUDENT_EXPERIENCE, COMPANY, JOB, APPLICATION, SKILLSET };

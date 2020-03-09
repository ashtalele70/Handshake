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
const COMPANY = require('../models/Company')(connectDB, Sequelize);
const JOB = require('../models/Job')(connectDB, Sequelize);
const APPLICATION = require('../models/Application')(connectDB, Sequelize);

//connectDB.sync({ alter: true });
connectDB.sync({ alter: false });

STUDENT_PROFILE.belongsTo(STUDENT);
STUDENT_EDUCATION.belongsTo(STUDENT_PROFILE);
JOB.belongsTo(COMPANY);
APPLICATION.belongsTo(JOB);
APPLICATION.belongsTo(STUDENT);


module.exports = { STUDENT, STUDENT_PROFILE, STUDENT_EDUCATION, COMPANY, JOB, APPLICATION };

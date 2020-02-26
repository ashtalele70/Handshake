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

//connectDB.sync({ alter: true });
connectDB.sync({ alter: false });

module.exports = { STUDENT, STUDENT_PROFILE, STUDENT_EDUCATION };

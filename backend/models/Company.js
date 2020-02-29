// const { Sequelize } = require('sequelize');
// const config = require('config');
// const STUDENT_PROFILE = require('./StudentProfile');

// const opts = {
//   define: {
//     // prevent sequelize from pluralizing table names
//     freezeTableName: true,
//     timestamps: false,
//   },
// };

// const sequelize = new Sequelize(config.get('DB_URL'), opts);

// const STUDENT = sequelize.define('STUDENT', {
//   STUDENT_ID: { type: Sequelize.INTEGER, primaryKey: true },
//   FIRST_NAME: { type: Sequelize.STRING },
//   LAST_NAME: { type: Sequelize.STRING },
//   DOB: { type: Sequelize.DATE },
//   PASSWORD: { type: Sequelize.STRING },
//   CITY: { type: Sequelize.STRING },
//   STATE: { type: Sequelize.STRING },
//   COUNTRY: { type: Sequelize.STRING },
//   CAREER_OBJECTIVE: { type: Sequelize.STRING },
//   EMAIL_ID: { type: Sequelize.STRING, unique: true },
//   PHONE_NUMBER: { type: Sequelize.STRING, unique: true },
//   SKILLSET: { type: Sequelize.JSON },
//   PROFILE_PICTURE: { type: Sequelize.BLOB },
//   RESUME: { type: Sequelize.STRING },
// });
//const STUDENT_PROFILE = require('./StudentProfile');
//const { STUDENT_PROFILE } = require('../config/dbConnection');

module.exports = (sequelize, DataTypes) => {
	const COMPANY = sequelize.define('COMPANY', {
		COMPANY_NAME: { type: DataTypes.STRING },
		DESCRIPTION: { type: DataTypes.DATE },
		PASSWORD: { type: DataTypes.STRING },
		CITY: { type: DataTypes.STRING },
		STATE: { type: DataTypes.STRING },
		COUNTRY: { type: DataTypes.STRING },
		COMPANY_PRINCIPLE: { type: DataTypes.STRING },
		EMAIL_ID: { type: DataTypes.STRING, unique: true },
		PHONE_NUMBER: { type: DataTypes.STRING, unique: true },
		PROFILE_PICTURE: { type: DataTypes.STRING },
	});
	// STUDENT.associate = function (models) {
	// 	STUDENT.hasOne(models.STUDENT_PROFILE);

	// }
	//STUDENT.hasOne(STUDENT_PROFILE(sequelize, DataTypes));
	//STUDENT_PROFILE.belongsTo(STUDENT);
	// STUDENT.associate = function (models) {
	// 	STUDENT.hasOne(models.STUDENT_PROFILE);

	// }

	return COMPANY;
};

// STUDENT.hasOne(STUDENT_PROFILE);

//STUDENT.associate = function (models) {
// Shop hasMany Coffees

//};


//module.exports = STUDENT;




// const { Sequelize } = require('sequelize');
// const config = require('config');


// const opts = {
//     define: {
//         // prevent sequelize from pluralizing table names
//         freezeTableName: true,
//         timestamps: false,
//     },
// };

// const sequelize = new Sequelize(config.get('DB_URL'), opts);
// const STUDENT_PROFILE = sequelize.define('STUDENT_PROFILE', {
// STUDENT_ID: {
//     type: Sequelize.INTEGER,
//     references: {
//         model: 'STUDENT',
//         key: 'STUDENT_ID',
//     },
// },
// COMPANY: {
//     type: String,
// },
// WEBSITE: {
//     type: String,
// },
// LOCATION: {
//     type: String,
// },
// STATUS: {
//     type: String,
//     required: true,
// },
// SKILLS: {
//     type: [String],
//     required: true,
// },
// BIO: {
//     type: String,
// },
// EXPERIENCE: [
//     {
//         TITLE: {
//             type: String,
//             required: true,
//         },
//         COMPANY: {
//             type: String,
//             required: true,
//         },
//         LOCATION: {
//             type: String,
//         },
//         FROM: {
//             type: Date,
//             required: true,
//         },
//         TO: {
//             type: Date,
//         },
//         CURRENT: {
//             type: Boolean,
//             default: false,
//         },
//         DESCRIPTION: {
//             type: String,
//         },
//     },
// ],
// EDUCATION: [
//     {
//         SCHOOL: {
//             type: String,
//             required: true,
//         },
//         DEGREE: {
//             type: String,
//             required: true,
//         },
//         FIELDOFSTUDY: {
//             type: String,
//             required: true,
//         },
//         FROM: {
//             type: Date,
//             required: true,
//         },
//         TO: {
//             type: Date,
//         },
//         CURRENT: {
//             type: Boolean,
//             default: false,
//         },
//         DESCRIPTION: {
//             type: String,
//         },
//     },
// ]
// });

// STUDENT_PROFILE.associate = function (models) {
//     // Coffee belongsTo Shop
//     STUDENT_PROFILE.belongsTo(models.Shop, { foreignKey: 'STUDENT_ID' });
// };

// module.exports = STUDENT_PROFILE;
// Student.hasMany(StudentProfile);

const STUDENT_EDUCATION = require('./Education');
const STUDENT = require('./Student');
//const { STUDENT, STUDENT_PROFILE } = require('../config/dbConnection');
module.exports = (sequelize, DataTypes) => {
	const STUDENT_PROFILE = sequelize.define('STUDENT_PROFILE', {
		COMPANY: {
			type: DataTypes.STRING,
		},
		WEBSITE: {
			type: DataTypes.STRING,
		},
		LOCATION: {
			type: DataTypes.STRING,
		},
		STATUS: {
			type: DataTypes.STRING,
			required: true,
		},
		SKILLS: {
			type: DataTypes.STRING,
			required: true,
		},
		BIO: {
			type: DataTypes.STRING,
		},
		STUDENTId: {
			type: DataTypes.INTEGER,
			references: {
				model: 'STUDENT',
				key: 'id'
			}
		},
	});
	//STUDENT_PROFILE.belongsTo(STUDENT);
	//STUDENT_PROFILE.associate = function (models) {


	//}

	//STUDENT_PROFILE.hasMany(STUDENT_EDUCATION(sequelize, DataTypes));
	return STUDENT_PROFILE;
};

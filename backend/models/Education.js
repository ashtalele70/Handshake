module.exports = (sequelize, DataTypes) => {
	const STUDENT_EDUCATION = sequelize.define('STUDENT_EDUCATION', {
		TITLE: {
			type: DataTypes.STRING,
			required: true,
		},
		COMPANY: {
			type: DataTypes.STRING,
			required: true,
		},
		LOCATION: {
			type: DataTypes.STRING,
		},
		FROM: {
			type: DataTypes.STRING,
			required: true,
		},
		TO: {
			type: DataTypes.STRING,
		},
		CURRENT: {
			type: DataTypes.BOOLEAN,
			default: false,
		},
		DESCRIPTION: {
			type: DataTypes.STRING,
		},
		STUDENT_PROFILEId: {
			type: DataTypes.INTEGER,
			references: {
				model: 'STUDENT_PROFILE',
				key: 'id'
			}
		},
	});
	return STUDENT_EDUCATION;
};




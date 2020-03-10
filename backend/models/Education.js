module.exports = (sequelize, DataTypes) => {
	const STUDENT_EDUCATION = sequelize.define('STUDENT_EDUCATION', {
	  COLLEGE_NAME: {
		type: DataTypes.STRING,
		required: true,
	  },
	  DEGREE: {
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
	});
	return STUDENT_EDUCATION;
  };
  
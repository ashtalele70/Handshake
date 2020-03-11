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
	  CITY: {
		type: DataTypes.STRING,
	  },
	  STATE: {
		type: DataTypes.STRING,
	  },
	  GPA: {
		type: DataTypes.INTEGER,
	  },
	  MAJOR: {
		type: DataTypes.STRING,
	  },
	  YEAR_OF_PASSING: {
		type: DataTypes.DATE,
	  },
	});
	return STUDENT_EDUCATION;
  };
  
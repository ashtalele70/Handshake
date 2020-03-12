module.exports = (sequelize, DataTypes) => {
	const REGISTRATION = sequelize.define('REGISTRATION', {
	  STATUS: { type: DataTypes.STRING },
	});
  
	return REGISTRATION;
  };
  
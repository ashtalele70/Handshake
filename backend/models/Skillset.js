module.exports = (sequelize, DataTypes) => {
	const SKILLSET = sequelize.define('SKILLSET', {
		SKILL: { type: DataTypes.STRING },
	});
	
	return SKILLSET;
};
const STUDENT_EDUCATION = require('./Education');

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
  });

  STUDENT_PROFILE.hasMany(STUDENT_EDUCATION(sequelize, DataTypes));
  return STUDENT_PROFILE;
};

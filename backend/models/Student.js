const STUDENT_PROFILE = require('./StudentProfile');
const APPLICATION = require('./Application');

module.exports = (sequelize, DataTypes) => {
  const STUDENT = sequelize.define('STUDENT', {
    FIRST_NAME: { type: DataTypes.STRING },
    LAST_NAME: { type: DataTypes.STRING },
    DOB: { type: DataTypes.DATE },
    PASSWORD: { type: DataTypes.STRING },
    CITY: { type: DataTypes.STRING },
    STATE: { type: DataTypes.STRING },
    COUNTRY: { type: DataTypes.STRING },
    CAREER_OBJECTIVE: { type: DataTypes.STRING },
    EMAIL_ID: { type: DataTypes.STRING, unique: true },
    PHONE_NUMBER: { type: DataTypes.STRING, unique: true },
    SKILLSET: { type: DataTypes.JSON },
    PROFILE_PICTURE: { type: DataTypes.STRING },
    RESUME: { type: DataTypes.STRING },
    COLLEGE_NAME: { type: DataTypes.STRING, required: true },
  });
  STUDENT.hasOne(STUDENT_PROFILE(sequelize, DataTypes));
  STUDENT.hasMany(APPLICATION(sequelize, DataTypes));

  return STUDENT;
};

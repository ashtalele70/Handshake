const JOB = require('./Job');
const EVENT = require('./Event');

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
  COMPANY.hasMany(JOB(sequelize, DataTypes));
  COMPANY.hasMany(EVENT(sequelize, DataTypes));
  return COMPANY;
};

const { Sequelize } = require('sequelize');
const config = require('config');

const opts = {
  define: {
    // prevent sequelize from pluralizing table names
    freezeTableName: true,
    timestamps: false,
  },
};

const sequelize = new Sequelize(config.get('DB_URL'), opts);

const User = sequelize.define('STUDENT', {
  STUDENT_ID: { type: Sequelize.INTEGER, primaryKey: true },
  FIRST_NAME: { type: Sequelize.STRING },
  LAST_NAME: { type: Sequelize.STRING },
  DOB: { type: Sequelize.DATE },
  PASSWORD: { type: Sequelize.STRING },
  CITY: { type: Sequelize.STRING },
  STATE: { type: Sequelize.STRING },
  COUNTRY: { type: Sequelize.STRING },
  CAREER_OBJECTIVE: { type: Sequelize.STRING },
  EMAIL_ID: { type: Sequelize.STRING, unique: true },
  PHONE_NUMBER: { type: Sequelize.STRING, unique: true },
  SKILLSET: { type: Sequelize.JSON },
  PROFILE_PICTURE: { type: Sequelize.BLOB },
  RESUME: { type: Sequelize.STRING },
});

module.exports = User;

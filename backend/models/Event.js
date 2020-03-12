const REGISTRATION = require('./Registration');

module.exports = (sequelize, DataTypes) => {
  const EVENT = sequelize.define('EVENT', {
    TITLE: {
      type: DataTypes.STRING,
    },
    POST_DATE: {
      type: DataTypes.DATE,
    },
    LOCATION: {
      type: DataTypes.STRING,
      required: true,
    },
    COST: {
      type: DataTypes.INTEGER,
    },
    DESCRIPTION: {
      type: DataTypes.STRING,
    },
    EVENT_TYPE: {
      type: DataTypes.STRING,
    },
    ELIGIBILITY: {
      type: DataTypes.STRING,
    },
    TIME: {
      type: DataTypes.STRING,
    },
  });
  EVENT.hasMany(REGISTRATION(sequelize, DataTypes));

  return EVENT;
};

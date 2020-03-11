//const APPLICATION = require('./Application');

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
      required: true,
    },
  });
  //EVENT.hasMany(APPLICATION(sequelize, DataTypes));

  return EVENT;
};
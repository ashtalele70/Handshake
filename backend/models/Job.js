const APPLICATION = require('./Application');

module.exports = (sequelize, DataTypes) => {
  const JOB = sequelize.define('JOB', {
    TITLE: {
      type: DataTypes.STRING,
    },
    POST_DATE: {
      type: DataTypes.DATE,
    },
    APP_DEADLINE: {
      type: DataTypes.DATE,
    },
    LOCATION: {
      type: DataTypes.STRING,
      required: true,
    },
    SALARY: {
      type: DataTypes.INTEGER,
    },
    DESCRIPTION: {
      type: DataTypes.STRING,
    },
    JOB_TYPE: {
      type: DataTypes.STRING,
      required: true,
    },
  });
  JOB.hasMany(APPLICATION(sequelize, DataTypes));

  return JOB;
};

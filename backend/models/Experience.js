module.exports = (sequelize, DataTypes) => {
  const STUDENT_EXPERIENCE = sequelize.define('STUDENT_EXPERIENCE', {
    COMPANY_NAME: {
      type: DataTypes.STRING,
      required: true,
    },
    POSITION: {
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
  });
  return STUDENT_EXPERIENCE;
};

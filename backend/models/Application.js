module.exports = (sequelize, DataTypes) => {
  const APPLICATION = sequelize.define('APPLICATION', {
    STATUS: { type: DataTypes.STRING },
    RESUME: { type: DataTypes.STRING },
  });

  return APPLICATION;
};

const { Sequelize } = require('sequelize');
require('dotenv').config();

const db = process.env.DB_URL;
console.log(db);

const opts = {
  define: {
    // prevent sequelize from pluralizing table names
    freezeTableName: true,
    timestamps: false,
  },
};

const sequelize = new Sequelize(db, opts);

const connectDB = () => {
  console.log('connectDB ');
  try {
    sequelize
      .authenticate()
      .then(console.log('Connection has been established successfully.'))
      .catch((err) => {
        console.log('Unable to connect to the database:', err);
      });
  } catch (err) {
    console.error(err.message);
    process.exit(1);
  }
};

module.exports.connectDB = connectDB;
module.exports.sequelize = sequelize;

const { Sequelize } = require('sequelize');
const config = require('config');

const db = config.get('DB_URL');
//console.log(db);

const opts = {
  define: {
    // prevent sequelize from pluralizing table names
    freezeTableName: true,
    timestamps: false,
  },
};

const connectDB = async () => {
  try {
    await new Sequelize(db, opts).authenticate();
    console.log('Connection has been established successfully')
  } catch (err) {
    console.error(err.message);
    process.exit(1);
  }
};

module.exports.connectDB = connectDB;

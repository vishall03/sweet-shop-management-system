const sequelize = require("../config/database");
const User = require("./User");
const Sweet = require("./Sweet");

const syncDB = async () => {
  try {
    await sequelize.authenticate();
    await sequelize.sync();
    console.log("Database connected & synced");
  } catch (err) {
    console.error("DB error:", err);
  }
};

module.exports = syncDB;

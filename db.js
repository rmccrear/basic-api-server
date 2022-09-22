const { Sequelize } = require("sequelize");

let sequelize = null;
if (process.env.NODE_ENV === "test") {
  sequelize = new Sequelize("sqlite::memory:");
} else {
  sequelize = new Sequelize({
    dialect: "sqlite",
    storage: "/database.sqlite",
  });
}

module.exports = sequelize;

const { Sequelize } = require("sequelize");

let sequelize = null;
if (process.env.NODE_ENV === "test") {
  sequelize = new Sequelize({
    dialect: "sqlite",
    storage: ":memory:",
    logging: false,
  });
} else {
  sequelize = new Sequelize({
    dialect: "sqlite",
    storage: "./database.sqlite",
  });
  sequelize.sync();
}

module.exports = sequelize;

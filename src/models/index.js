const sq = require("../../db");

const { DataTypes } = require("sequelize");

const { STRING } = DataTypes;

const Farm = sq.define("Farm", {
  name: { type: STRING },
  address: { type: STRING },
});

const Produce = sq.define("Produce", {
  name: { type: STRING },
});

module.exports = { Farm, Produce };

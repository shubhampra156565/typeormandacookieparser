import { Sequelize, Model, DataTypes } from "sequelize";
import sequelize from "./db/initalization.js";

const User = sequelize.define("user", {
    name: DataTypes.TEXT,
    favoriteColor: {
      type: DataTypes.TEXT,
      defaultValue: 'green'
    },
    age: DataTypes.INTEGER,
    cash: DataTypes.INTEGER
  });
  
  (async () => {
    await sequelize.sync();
    // Code here
  })();
  
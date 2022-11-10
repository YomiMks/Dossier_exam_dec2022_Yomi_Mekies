const sequelize = require("../../config/db");
const { DataTypes } = require("sequelize");
const User = require('./userModel');
const Partners = sequelize.define('Partners', {
    // Model attributes are defined here
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true,
    },
    city: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    enabled: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    userId: {
        type: DataTypes.INTEGER,
        allowNull: true,
    }
}, {
    timestamps: true
});

//Partners.sync()

console.log('Partners', Partners === sequelize.models.Partners); // true
module.exports = Partners;

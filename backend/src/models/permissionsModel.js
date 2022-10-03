const sequelize = require("../../config/db");
const {DataTypes} = require("sequelize");


const Permission = sequelize.define('Permission', {
    // Model attributes are defined here
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true,
    },
    Permission: {
        type: DataTypes.STRING,
        allowNull: true,
    },
}, {
    timestamps: true
});
Permission.sync()

console.log('dd', Permission === sequelize.models.Permission); // true
module.exports = Permission;

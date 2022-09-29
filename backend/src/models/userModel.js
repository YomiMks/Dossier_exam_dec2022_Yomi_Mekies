const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../../config/db')

const User = sequelize.define('User', {
    // Model attributes are defined here
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true,
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    role: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    brand: {
        type: DataTypes.STRING,
        allowNull: true,
    }
}, {
    timestamps: true
});

// syncro table
User.sync()
// User.sync({ force: true })
// `sequelize.define` also returns the model
console.log('dd', User === sequelize.models.User); // true
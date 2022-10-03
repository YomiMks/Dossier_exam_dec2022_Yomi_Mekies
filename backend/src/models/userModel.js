const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../../config/db');
const StructuresModel = require('./structuresModel');
const PartnersModel = require('./PartnersModel');
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
    },
    structureId: {
        type: DataTypes.INTEGER,
        allowNull: true,
        references: {
            model: StructuresModel,
            key: 'id'
        }
    },
    partnersId: {
        type: DataTypes.INTEGER,
        allowNull: true,
        references: {
            model: PartnersModel,
            key: 'id'
        }
    }
}, {
    timestamps: true
});


//ejjejee


// syncro table

User.belongsTo(StructuresModel, {foreignKey: 'structureId', as: 'user_structure'})
StructuresModel.hasOne(User, {foreignKey: 'structureId', as: 'structure_user'})

User.belongsTo(PartnersModel, {foreignKey: 'partnersId', as: 'user_partners'})
PartnersModel.hasOne(User, {foreignKey: 'partnersId', as: 'partners_user'})
// User.sync({ force: true })
// `sequelize.define` also returns the model
console.log('dd', User === sequelize.models.User); // true
User.sync({force: true})

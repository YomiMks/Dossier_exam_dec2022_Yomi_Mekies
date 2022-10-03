const sequelize = require("../../config/db");
const {DataTypes} = require("sequelize");

const PartnersModel = require('./partnersModel');

const Structures = sequelize.define('Structures', {
    // Model attributes are defined here
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true,
    },
    address: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    description: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    enabled: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    partnersId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: PartnersModel,
            key: 'id'
        }
    }
}, {
    timestamps: true
});

Structures.sync()


Structures.belongsTo(PartnersModel, {foreignKey: 'partnersId', as: 'structure_partners'})
PartnersModel.hasMany(Structures, {foreignKey: 'partnersId', as: 'partners_structure'})

console.log('dd', Structures === sequelize.models.Structures); // true
module.exports = Structures;


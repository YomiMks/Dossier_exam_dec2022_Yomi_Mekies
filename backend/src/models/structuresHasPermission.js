const sequelize = require("../../config/db");
const { DataTypes } = require("sequelize");
const Structures = require('./structuresModel')
const Permissions = require('./permissionsModel')


const StructuresHasPermission = sequelize.define('StructuresHasPermission', {
    // Model attributes are defined here
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true,
    },
    fk_structure_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: Structures,
            key: 'id'
        }
    },
    fk_permission_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: Permissions,
            key: 'id'
        }
    },
}, {
    timestamps: true
});
Permissions.belongsToMany(Structures, {
    through: StructuresHasPermission,
    as: "structure",
    foreignKey: 'fk_permission_id'
})
Structures.belongsToMany(Permissions, {
    through: StructuresHasPermission,
    as: "permissions",
    foreignKey: 'fk_structure_id'
})
StructuresHasPermission.sync()

module.exports = StructuresHasPermission

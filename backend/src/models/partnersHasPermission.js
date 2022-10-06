const sequelize = require("../../config/db");
const { DataTypes } = require("sequelize");
const Partners = require('./partnersModel')
const Permissions = require('./permissionsModel')


const PartnersHasPermission = sequelize.define('PartnersHasPermission', {
    // Model attributes are defined here
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true,
    },
    fk_partner_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: Partners,
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
Permissions.belongsToMany(Partners, {
    through: PartnersHasPermission,
    as: "partners_permissions",
    foreignKey: 'fk_permission_id'
})
Partners.belongsToMany(Permissions, {
    through: PartnersHasPermission,
    as: "permissions_partners",
    foreignKey: 'fk_partner_id'
})
PartnersHasPermission.sync()

module.exports = PartnersHasPermission

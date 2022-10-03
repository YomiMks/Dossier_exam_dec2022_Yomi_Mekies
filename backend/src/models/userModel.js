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
    }
}, {
    timestamps: true
});

//ejjejee

const Structures = sequelize.define('Structures', {
    // Model attributes are defined here
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true,
    },
    description: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    enabled: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    enabled: {
        type: DataTypes.STRING,
        allowNull: false,
    }
}, {
    timestamps: true
});

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


// syncro table
User.sync()
// User.sync({ force: true })
// `sequelize.define` also returns the model
console.log('dd', User === sequelize.models.User); // true
console.log('dd', Partners === sequelize.models.Partners); // true
console.log('dd', Structures === sequelize.models.Structures); // true
console.log('dd', Permission === sequelize.models.Permission); // true
console.log(performance)

const express = require('express');
permissionRoutes = express.Router()
permissionController = require('../controllers/permissionController.js');

module.exports = (app) => {
    permissionRoutes.get('/', permissionController.getPermission)
    permissionRoutes.post('/', permissionController.newPermission)

    app.use('/api/permission', permissionRoutes)
}


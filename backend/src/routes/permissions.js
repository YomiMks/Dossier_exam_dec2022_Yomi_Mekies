const express = require('express');
permissionRoutes = express.Router()
permissionController = require('../controllers/permissionController.js');

module.exports = (app) => {
    permissionRoutes.get('/permission', permissionController.getPermission)


    app.use('/api', permissionRoutes)
}

const express = require('express');
userRoutes = express.Router()
userController = require('../controllers/userController.js');

module.exports = (app) => {
    userRoutes.get('/user', userController.getUsers)

    app.use('/api', userRoutes)
}
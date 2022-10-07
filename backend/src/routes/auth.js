const express = require('express');
authRoutes = express.Router()
authController = require('../controllers/authController.js');

module.exports = (app) => {
    authRoutes.post('/login', authController.login)

    app.use('/api/auth', authRoutes)
}

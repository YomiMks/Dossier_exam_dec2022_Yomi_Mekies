const express = require('express');
userRoutes = express.Router()
userController = require('../controllers/userController.js');




module.exports = (app) => {
    userRoutes.get('/', userController.getUsers)
    userRoutes.post('/', userController.newUser)

    app.use('/api/user', userRoutes)
}

const express = require('express');
partnerRoutes = express.Router()
partnerController = require('../controllers/partnerController.js');

module.exports = (app) => {
    partnerRoutes.get('/partner', partnerController.getPartner)


    app.use('/api', partnerRoutes)
}

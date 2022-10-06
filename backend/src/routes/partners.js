const express = require('express');
partnerRoutes = express.Router()
partnerController = require('../controllers/partnerController.js');

module.exports = (app) => {
    partnerRoutes.get('/', partnerController.getPartner)
    partnerRoutes.post('/', partnerController.newPartner)

    app.use('/api/partners', partnerRoutes)
}

const express = require('express');
partnerRoutes = express.Router()
partnerController = require('../controllers/partnerController.js');

module.exports = (app) => {
    partnerRoutes.get('/', partnerController.getPartner)
    partnerRoutes.get('/permissions', partnerController.getPartnerPermission)
    partnerRoutes.post('/', partnerController.newPartner)
    partnerRoutes.delete('/:id', partnerController.deletePartner)
    partnerRoutes.put('/:id', partnerController.updatePartner)

    app.use('/api/partners', partnerRoutes)
}

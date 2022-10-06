const express = require('express');
structureRoutes = express.Router()
structuresController = require('../controllers/structureController.js');

module.exports = (app) => {
    structureRoutes.get('/structure', structureController.getStructure)


    app.use('/api', structureRoutes)
}

const express = require('express');
structureRoutes = express.Router()
structuresController = require('../controllers/structureController.js');

module.exports = (app) => {
    structureRoutes.get('/', structuresController.getStructure)

    app.use('/api/structure', structureRoutes)
}

const express = require('express');
structureRoutes = express.Router()
structuresController = require('../controllers/structureController.js');

module.exports = (app) => {
    structureRoutes.get('/', structuresController.getStructure)
    structureRoutes.post('/', structuresController.newStructure)
    structureRoutes.put('/:id', structuresController.updateStructure)
    structureRoutes.delete('/:id', structuresController.deleteStructure)
    structureRoutes.get('/permissions', structuresController.getStructurePermission)

    app.use('/api/structure', structureRoutes)
}

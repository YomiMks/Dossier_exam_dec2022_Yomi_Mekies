const express = require('express');
const sequelize = require('./config/db.js');
const userModel = require('./src/models/userModel.js')
const partnersModel = require('./src/models/partnersModel.js')
const permissionsModel = require('./src/models/permissionsModel.js')
const structuresModel = require('./src/models/structuresModel.js')
const d = require('./src/models/partnersHasPermission.js')
const f = require('./src/models/structuresHasPermission.js')
const cors = require('cors')

const app = express();

//app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json())
app.use(cors())
require('./src/routes/index')(app)

app.get('/', (req, res) => {
    res.send('hello world')
})

app.use((req, res) => {
    res.status(404)
    res.send('Page introuvable')
})

app.listen(8343, () => {
    console.log('Serveur enabled on 8343')
})

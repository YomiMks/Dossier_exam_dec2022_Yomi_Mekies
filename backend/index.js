const express = require('express');
const sequelize = require('./config/db.js');

const app = express();

//app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json())

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

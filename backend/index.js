const express = require('express');

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json())

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

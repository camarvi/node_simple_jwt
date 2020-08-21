// Creo una variable para express

const express = require('express');
const app = express();


// Para poder enviar y recibir json
// que el servidor pueda trabajar con archivos json
app.use(express.json());

//Para que el servidor entienda los datos que se le mandan desde un formulario
app.use(express.urlencoded({ extended: false }));

app.use(require('./controllers/authController'));

module.exports = app;
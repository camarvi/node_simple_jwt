const moongoose = require('mongoose');

// simplejwt es el nombre de la bd

moongoose.connect('mongodb://localhost/simplejwt', {
        useNewUrlParser: true,
        useUnifiedTopology: true
    })
    .then(db => console.log("Conectado a la BD"));
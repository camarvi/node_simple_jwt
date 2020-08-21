const { Schema, model } = require('mongoose');

const bcrypt = require('bcryptjs');

// Schema es para definir los datos que vamos a guardar

const userSchema = new Schema({
    username: String,
    email: String,
    password: String
});

//Creo una funcion para encriptar la contraseña para guardar en la BD
userSchema.methods.encryptPassword = async(password) => {
    const salt = await bcrypt.genSalt(10);
    return bcrypt.hash(password, salt);
};


userSchema.methods.validatePassword = function(password) {
    return bcrypt.compare(password, this.password);
}



//Para guardar en la BD tenemos que crear un modelo

module.exports = model('User', userSchema);


// USUARIO DE PRUEBA

/*{
    "username": "Maluma",
    "email": "maluma@gmail.com",
    "password": "maluma_baby"
} 

{
    "username": "john",
    "email": "jonny@gmail.com",
    "password": "123456"
}


*/
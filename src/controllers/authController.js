const { Router } = require('express');

const router = Router();

// Token que utiliza la aplicacion
const jwt = require('jsonwebtoken');

const config = require('../config');
const verifyToken = require('./verifyToken');

const User = require('../models/User');


router.post('/signin', async(req, res, next) => {
    const { email, password } = req.body;
    //console.log(email, password);
    const user = await User.findOne({ email: email });
    if (!user) {
        console.log("Error no exise el usuario");
        return res.status(404).send("No existe el email");
    }

    const validPassword = await user.validatePassword(password) //Le paso el password del req.body
    console.log(validPassword);

    // Si todo esta bien devuelvo un token al usuario
    if (!validPassword) {
        return res.status(401).json({ auth: false, token: null });
    }
    //El usuario es correcto devuelvo el token

    const token = jwt.sign({ id: user._id, }, config.secret, {
        expiresIn: 60 * 60 * 24 //Periodo de vida del token
    });

    res.json({ auth: true, message: 'Sigin Ok', token });


});


router.post('/signup', async(req, res, next) => {
    //res.json('Signup');
    const { username, email, password } = req.body;
    //console.log(username, email, password);
    const user = new User({
        username: username,
        email: email,
        password: password
    });
    user.password = await user.encryptPassword(user.password);
    // Guardar el registro en la BD
    await user.save();

    //Generar el Token

    const token = jwt.sign({ id: user._id }, config.secret, {
        expiresIn: 60 * 60 * 24 //Expira en 1 dia
    });

    console.log(user);
    res.json({ auth: true, token });
});

router.get('/me', verifyToken, async(req, res, next) => {

    //Primero hay que comprobar que el usuario
    //tiene un token, es decir que esta autenticado

    /*  const token = req.headers['x-access-token'];

      if (!token) {
          return res.status(401).json({
              auth: false,
              message: 'No token provided'
          })
      }

      //Se recibe el token, tengo que verificarlo

      const decoded = jwt.verify(token, config.secret); 
      //console.log(decoded);
      const user = await User.findById(decoded.id, { password: 0 }); //para que no devuelva la contraseña
      */
    const user = await User.findById(req.userId, { password: 0 }); //para que no devuelva la contraseña
    if (!user) {
        return res.status(404).send("No user found")
    }
    res.json(user);
});

router.get('/cmandos', verifyToken, async(req, res) => {
    return res.json({ message: 'Dentro de Cmandos' });
});

module.exports = router;
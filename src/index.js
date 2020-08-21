const app = require('./app');

require('./database');

// Funcion para iniciar la aplicacion
async function init() {
    await app.listen(3000);
    console.log("Server Ok in port 3000");
}

init();
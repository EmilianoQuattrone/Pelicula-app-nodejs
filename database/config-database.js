const mongoose = require('mongoose');

//Esto de de la libreria npm mongoose.
const dbConnection = () => {

    const urlDB = process.env.CADENA_CONEXION;

    try {

        mongoose.connect(urlDB);

        console.log('DB conectada.');

    } catch (error) {

        console.log(error);
    }
}

module.exports = {

    dbConnection
}
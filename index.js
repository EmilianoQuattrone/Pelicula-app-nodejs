const express = require('express');
const { dbConnection } = require('./database/config-database');
const dotenv = require('dotenv').config();
const cors = require('cors');
const app = express();

const port = process.env.PORT;

app.use(cors());

//Base de datos
dbConnection();

//Directorio publico
app.use(express.static('public'));

//Lectura y parseo del req.body (por el tipo de formato JSON).
app.use(express.json());

//Rutas
app.use('/api/auth', require('./routes/auth'));
app.use('/api/peliculas', require('./routes/peliculas'));

app.listen(port, () => {

    console.log(`Servidor corriendo en puerto:  ${port}`);
});
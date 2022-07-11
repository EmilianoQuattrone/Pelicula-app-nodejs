const { request, response } = require("express");

const getPeliculas = (rep = request, res = response) => {

    res.json({

        mensaje: 'obtener'
    });
}

const crearPelicula = (rep = request, res = response) => {

    res.json({

        mensaje: 'crear'
    });
}

const modificarPelicula = (rep = request, res = response) => {

    res.json({

        mensaje: 'modificar'
    });
}

module.exports = {

    getPeliculas,
    crearPelicula,
    modificarPelicula
}
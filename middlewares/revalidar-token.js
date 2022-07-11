const { request, response } = require("express");
const jwt = require('jsonwebtoken');

const revalidarToken = (req = request, res = response, next) => {

    const token = req.header('x-token');

    if (!token) {

        return res.status(401).json({

            mensaje: 'No hay token en la peticio.'
        });
    }

    try {

        const { id, nombre } = jwt.verify(

            token,
            process.env.PALABRA_SECRETA_JWT
        );

        // console.log(payload);

        req.id = id;
        req.nombre = nombre;

    } catch (error) {

        console.log(error);
        return res.status(401).json({

            mensaje: 'Token no valido.'
        });
    }

    next();
}

module.exports = {

    revalidarToken
}
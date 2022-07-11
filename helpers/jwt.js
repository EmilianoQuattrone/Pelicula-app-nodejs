const jwt = require('jsonwebtoken');

const generarJWT = (id, name) => {

    return new Promise((resolve, reject) => {

        const payload = { id, name };

        jwt.sign(payload, process.env.PALABRA_SECRETA_JWT, {

            expiresIn: '4h'
        }, (error, token) => {

            if (error) {

                console.log(error);
                reject('Ocurrio un error, no se puedo generar el token, verificar los datos.')
            }

            resolve(token)
        });
    })
}

module.exports = {

    generarJWT
}
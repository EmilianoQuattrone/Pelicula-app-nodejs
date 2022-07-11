const { request, response } = require("express");
const bcryptjs = require('bcryptjs');
const Usuario = require('../models/Usuario');
const { generarJWT } = require("../helpers/jwt");

const createAuth = async (req = request, res = response) => {

    const { nombre, email, password } = req.body;
    try {

        let usuario = await Usuario.findOne({ email });

        if (usuario) {

            return res.status(400).json({

                mensaje: `Ya existe el usuario ${email} .`
            });
        }

        //Como declare una variable con let aqui puedo reutilizarla y asigno sus valores.
        usuario = new Usuario(req.body);

        //Encriptar la contraseña antes de guardar
        const salt = bcryptjs.genSaltSync();
        usuario.password = bcryptjs.hashSync(password, salt);

        const nuevoUsuario = await usuario.save();

        //Generar JWT
        const token = await generarJWT(usuario.id, usuario.email);

        res.status(201).json({

            id: usuario.id,
            nombre,
            email: usuario.email,
            token,
            mensaje: 'Usuario registrado'
        });

    } catch (error) {

        console.log(error);
        res.status(500).json({

            mensaje: 'El usuario ya existe.'
        });
    }
}

const loginUsuario = async (req = request, res = response) => {

    const { email, password } = req.body;

    try {

        const usuario = await Usuario.findOne({ email });

        if (!usuario) {

            return res.status(400).json({

                mensaje: `No existe usuario con este email: ${email} .`
            });
        }

        //Confirmar contraseña
        const passwordValida = bcryptjs.compareSync(password, usuario.password);
        if (!passwordValida) {

            return res.status(400).json({

                mensaje: 'Contraseña incorrecta.'
            });
        }

        //Genererar JWT
        const token = await generarJWT(usuario.id, usuario.email);

        res.json({

            id: usuario.id,
            email,
            token,
            mensaje: 'Usuario logeado'
        });

    } catch (error) {

        console.log(error);
        res.status(500).json({

            mensaje: 'El usuario ya existe.'
        });
    }
}

const renewToken = async (req = request, res = response) => {

    const id = req.id;
    const nombre = req.nombre;

    //Generar JWT
    const token = await generarJWT(id, nombre);

    res.json({

        id,
        nombre,
        token,
        mensaje: 'Renew'
    });
}

module.exports = {

    renewToken,
    createAuth,
    loginUsuario
}
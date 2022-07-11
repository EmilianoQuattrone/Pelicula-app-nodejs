const { request, response } = require("express");
const { validationResult } = require('express-validator');

const validarCampos = (req = request, res = response, next) => {

    const error = validationResult(req);
    if (!error.isEmpty()) {

        return res.status(400).json({

            errores: error.mapped()
        });
    }
    next();
}

module.exports = {

    validarCampos
}
const { Router } = require('express');
const { check } = require('express-validator');
const { createAuth, loginUsuario, renewToken } = require('../controllers/auth-controllers');
const { validarCampos } = require('../middlewares/errores');
const { revalidarToken } = require('../middlewares/revalidar-token');
const router = Router();

router.post(
    '/new',
    [
        check('email', 'El email es obligatorio').isEmail(),
        check('password', 'La contraseña es obligatoria y debe de ser mayor a 6 caracteres')
            .isLength({ min: 6 }),
        validarCampos
    ], createAuth);

router.post(
    '/',
    [
        check('email', 'El email es obligatorio').isEmail(),
        check('password', 'La contraseña es obligatoria y debe de ser mayor a 6 caracteres')
            .isLength({ min: 6 }),
        validarCampos
    ], loginUsuario);

router.get('/renew', revalidarToken, renewToken);

module.exports = router;
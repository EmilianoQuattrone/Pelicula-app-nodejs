const { Router } = require('express');
const { getPeliculas, crearPelicula, modificarPelicula } = require('../controllers/peliculas-conttrollers');
const { revalidarToken } = require('../middlewares/revalidar-token');
const router = Router();

router.get('/', revalidarToken, getPeliculas);
router.post('/new', revalidarToken, crearPelicula);
router.put('/:id', revalidarToken, modificarPelicula);

module.exports = router;
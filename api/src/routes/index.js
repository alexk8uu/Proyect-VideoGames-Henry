const { Router } = require('express');
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');
const VideogamesRoute = require('./Videogames.js');
const GenreRoute = require('./Genre.js');
const VideogameRoute = require('./Videogame.js')
const DBvideogamesRoute = require('./DBvideogames.js')

const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);
router.use('/videogames', VideogamesRoute);
router.use('/db/videogames', DBvideogamesRoute);
router.use('/genre', GenreRoute);
router.use('/videogame', VideogameRoute)


module.exports = router;

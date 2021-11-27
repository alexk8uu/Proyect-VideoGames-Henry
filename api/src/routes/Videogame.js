require("dotenv").config();
const { Router } = require('express');
const router = Router();
const {
    getbyId,
    addVideogame
} = require('./Controllers.js');



router.get('/:id', getbyId )

router.post('/', addVideogame);



module.exports = router;
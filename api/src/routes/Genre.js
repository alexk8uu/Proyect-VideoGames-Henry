require("dotenv").config();
const { Router } = require('express');
const router = Router();
const {API_KEY} = process.env;
const { getGenres } = require('./Controllers.js');

router.get('/', getGenres);


module.exports = router;
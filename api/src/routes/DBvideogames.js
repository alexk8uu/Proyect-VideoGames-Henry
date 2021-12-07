require("dotenv").config();
const { Router } = require('express');
const router = Router();
const { getDbGames } = require('./Controllers.js');

router.get('/',getDbGames);


module.exports = router;
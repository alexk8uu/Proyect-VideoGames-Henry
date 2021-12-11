require("dotenv").config();
const { Router } = require('express');
const router = Router();
const axios  = require("axios");
const {API_KEY} = process.env;
const {Op} = require('sequelize')
const { Videogame, Genre} = require('../db.js')
const {
    mapGames,
    allGames,
} = require('./Controllers.js');

router.get('/', async (req,res) => {
    const { name } = req.query;
    if(name) {
        const searchRequest = await axios.get(`https://api.rawg.io/api/games?search=${name}&key=${API_KEY}`);
        let gamesDb = await Videogame.findAll({
            where: {
                name: {[Op.iLike]: `%${name}%`},
            },
            include: Genre 
        });
        let gamesFilter = mapGames(searchRequest.data.results)
        let gamesWanted = gamesDb.concat(gamesFilter).slice(0,15);
        if(gamesWanted.length > 0){
            res.status(200).send(gamesWanted);
        } else {
            res.status(200).send('VideoGame not found')
        }
    } else {
        const games = await allGames();
        res.status(200).send(games);
    }
})





module.exports = router;
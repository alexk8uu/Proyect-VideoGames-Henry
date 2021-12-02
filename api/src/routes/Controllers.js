require('dotenv').config();
const axios  = require('axios');
const { API_KEY } = process.env;
const { Videogame, Genre} = require('../db.js');


async function apiGames() {
    const requestApi = await axios.get(`https://api.rawg.io/api/games?key=${API_KEY}`)
 var requestFilter = mapGames(requestApi.data.results);
 let current = requestApi.data.next;
    while(requestFilter.length < 100) {
        const nextCurrent = await axios.get(current);
        const newRequest = await mapGames(nextCurrent.data.results);
        requestFilter = [...requestFilter, ...newRequest];
        current = nextCurrent.data.next;
    }
    console.log(requestFilter.length)
    return requestFilter;
}

function mapGames(arr) {
    const data = arr.map(g => {
        return {
            id: g.id,
            name: g.name,
            img: g.background_image,
            genres: g.genres.map(gen => { return { id: gen.id, name: gen.name}}),
            rating: g.rating,
            released: g.released   
        }
    })
    return data;
}

async function dbGames() {
    return await Videogame.findAll({
        include: Genre
    })
}

async function allGames() {
    const api = await apiGames();
    const db = await dbGames();
    let allGames = api.concat(db);
    return allGames;
}

async function getbyId(req,res) {
    const { id } = req.params;
    if(isNaN(id)) {
        const game = await Videogame.findByPk(id, {include: Genre})
        res.status(200).json(game)
    } else {
        const game = await axios.get(`https://api.rawg.io/api/games/${id}?key=${API_KEY}`)
        const result = {
            id: game.data.id,
            name: game.data.name,
            img: game.data.background_image,
            genres: game.data.genres.map(gen => { return { id: gen.id, name: gen.name}}),
            description: game.data.description,
            rating: game.data.rating_top,
            released: game.data.released,
            platforms: game.data.platforms.map(elem => {return  { id: elem.platform.id , name: elem.platform.name}})
        }  
        res.status(200).json(result);
    }
}

async function getGenres(req,res) {
    const requestGenres = await Genre.findAll();
    res.json(requestGenres)
}

async function addVideogame(req,res) {  
    const { name, description, released, rating, img, genres, platforms } = req.body;
    try {
        const createdVideogame = await Videogame.create({
            name,
            description,
            released,
            rating,
            img,
            platforms,
        })
        console.log(genres)
        genres.forEach(async genre => {
            let gen = await Genre.findOne({ where: { name: genre.name }});
            createdVideogame.addGenre(gen);
        })
        res.status(200).send('Your videogame has been created succesfully')
    } catch (error) {
        console.log(error)
    }
}

module.exports = {
    apiGames,
    mapGames,
    dbGames,
    allGames,
    getbyId,
    getGenres,
    addVideogame
}
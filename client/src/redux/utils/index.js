export function orderRating(type, games) {
    const videogames = JSON.parse(JSON.stringify(games));
    if (type === 'RtgASC') {
        videogames.sort((a, b) => {
            return b.rating - a.rating
        })
    }
    if (type === 'RtgDESC') {
        videogames.sort((a, b) => {
            return a.rating - b.rating
        })
    }
    return videogames;
}


export function orderByOrigen (type, videogames) {
    videogames = JSON.parse(JSON.stringify(videogames));
    if (type === 'Api') {
        videogames= videogames.filter((game) => {return !isNaN(game.id)} )
    } else if (type === 'Created') {
        videogames = videogames.filter((game) => {return isNaN(game.id)})
    }
    return videogames;
}

export function orderByGenres (type, games) {
    const videogames = JSON.parse(JSON.stringify(games));
    var filterGenres = videogames.filter((videogame) => 
        videogame.genres.map((elem) => elem.name).includes(type)
    );
    return filterGenres;
}

export function orderAlpha (type, games) {
    const videogames = JSON.parse(JSON.stringify(games));
    if (type === 'Asc') {
    var filterList = videogames.sort((a, b) => {
            if ( a.name > b.name) return 1;
            if ( b.name > a.name ) return -1 
            return 0;
        })
    }
    if (type === 'Desc') {
    var filterList =  videogames.sort((a, b) => {
            if ( a.name > b.name) return -1;
            if ( b.name > a.name ) return 1 
            return 0;
        })
    }
    return filterList;
}

export function obtainPlatforms(games) {
    const videogames = JSON.parse(JSON.stringify(games));
    const allPlataforms = videogames.map(elem => elem.platforms)
    let platformsSet = new Set(allPlataforms.flat(Infinity))
    let platforms = [...platformsSet]
    return platforms;
}
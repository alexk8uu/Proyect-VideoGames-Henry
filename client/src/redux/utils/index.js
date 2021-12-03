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


export function orderByOrigen (type, games) {
    const videogames = JSON.parse(JSON.stringify(games));
    if( type === 'Created') {
       var filterOrigin = videogames.filter((game) => { return game.id.length > 10 })
    } else if (type === 'Api'){
       var filterOrigin = videogames.filter((game) => { return !isNaN(game.id) })
    }
    return filterOrigin;
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
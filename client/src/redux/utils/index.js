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
       var filterList = videogames.filter((game) => { return game.id.length > 10 })
    }
    return filterList;
}

export function orderByGenres (type, games) {
    const videogames = JSON.parse(JSON.stringify(games));
    var filterList = videogames.filter((videogame) => 
        videogame.genres.map((elem) => elem.name).includes(type)
    );
    return filterList;
}

export function orderAlpha (type, games) {
    const videogames = JSON.parse(JSON.stringify(games));
    if (type === 'Asc') {
        videogames.sort((a, b) => {
            return b.name - a.name
        })
    }
    if (type === 'Desc') {
        videogames.sort((a, b) => {
            return a.name - b.name
        })
    }
    return videogames;
}
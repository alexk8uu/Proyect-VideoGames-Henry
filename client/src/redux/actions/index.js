import { axios } from 'axios';
export const GET_ALL_VIDEOGAMES = "GET_ALL_VIDEOGAMES";
/* export const URL_VIDEOGAMES = "http://localhost:3001/videogames"; */


export function getVideogames() {
    return async function(dispatch) {
        try {
            const games = await axios.get('http://localhost:3001/videogames')
            console.log(games.data)
            dispatch({
                type: GET_ALL_VIDEOGAMES,
                payload: games.data
            })
        } catch (error) {
            console.log("Error", error)
        }
    }
}

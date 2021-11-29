import  axios  from 'axios';
export const GET_ALL_VIDEOGAMES = "GET_ALL_VIDEOGAMES";
export const URL_VIDEOGAMES = "http://localhost:3001/videogames";


export function getVideogames() {
    return async function(dispatch) {
        try {
            const games = await axios.get(URL_VIDEOGAMES)
            return dispatch({
                type: GET_ALL_VIDEOGAMES,
                payload: games.data
            })
        } catch (error) {
            console.log("Error", error)
        }
    }
}


/* export function getVideogames() {
    return async function (dispatch) {
        const games = await axios.get(URL_VIDEOGAMES,{})
        return dispatch({
            type: GET_ALL_VIDEOGAMES,
            payload: games.data
        })
    }
}  */
/* 
export function getVideogames() {
    return function (dispatch) {
      axios.get(`http://localhost:3001/videogames`).then((games) => {
        dispatch({ type: "GET_ALL_VIDEOGAMES", payload: games.data });
      });
    };
  } */

import React, { useEffect } from 'react';
import { useSelector, useDispatch } from "react-redux";
import Card from "./Card.jsx";
import { getVideogames } from "../redux/actions/index.js";


//pedir los personajes al back
//escucho y mapeo el estado de los videogames y por cada uno mapeo una Cards
export default function Home() {

    const dispatch = useDispatch();
    const videogames = useSelector((state) => state.videogame)
    

    useEffect( () => {
        dispatch(getVideogames())
    },[dispatch])

    return (
        <div>
            {
                videogames && videogames.map.map((e) => {
                    return <Card name={e.name} img={e.img} id={e.id} genres={e.genres} rating={e.rating}/>
                })
            }
           {/*  {
                console.log(videogames)
            } */}
        </div>
    )
}
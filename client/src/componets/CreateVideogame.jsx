import React from 'react'
import { useSelector, useDispatch } from "react-redux";
import { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { createVideogame, getGenres, getVideogames } from "../actions/index.js";
import styles from "../css_modules/Create.module.css";

export default function CreateVideogame() {
    
    const dispatch = useDispatch();
    const genres = useSelector((state) => state.genres);
    const videogames = useSelector((state) => state.videogames);
    const allPlataforms = videogames.map((elem) => elem.plataforms)
    let platformSet = new Set(allPlataforms.flat(Infinity)) 
    
    
    
    useEffect(() => {
        dispatch(getGenres());
        dispatch(getVideogames());
    },[dispatch])
    
    
    
    return (
        <div>
            
        </div>
    )
}

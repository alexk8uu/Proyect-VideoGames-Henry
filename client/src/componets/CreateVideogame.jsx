import React from 'react'
import { useSelector, useDispatch } from "react-redux";
import { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { NavLink as Link } from 'react-router-dom';
import { createVideogame, getGenres, getPlataforms, getVideogames } from "../redux/actions/index.js"
import styles from "../css_modules/CreateVideogame.module.css"

export default function CreateVideogame() {

    const dispatch = useDispatch();
    const genres = useSelector((state) => state.genres);
    const platforms = useSelector((state) => state.platforms);
    

    let [input, setImput] = useState({
        name: "",
        description: "",
        released: "",
        rating: 0,
        img: "",
        platforms: [],
        genres: []
    })

    useEffect(() => {
        dispatch(getVideogames());
        dispatch(getPlataforms());
        dispatch(getGenres());
    }, [dispatch])



    return (
        <div className={styles.container}>
            <Link to='/home' >
                <button>Back</button>
            </Link>
            <h1>Create your Videogame!</h1>
            <form>
                <div>
                    <label>Name:</label>
                    <input
                        type="text"
                        value={input.name}
                        name="name"
                    />
                </div>
                <div>
                    <label>Description:</label>
                    <textarea
                        name="description"
                        value={input.description}
                    />
                </div>
                <div>
                    <label>Imagen:</label>
                    <input
                        type='Text'
                        name="image"
                        value={input.img}
                    />
                </div>
                <div>
                    <label>Released:</label>
                    <input
                        type="date"
                        name="released"
                        value={input.released}
                    />
                </div>
                <div>
                    <label>Rating:</label>
                    <input
                        type="number"
                        name="rating"
                        value={input.rating}
                        min="0"
                        max="5"
                    />
                </div>
                <div>
                    <label>Genres:</label>
                    <div className={styles.genres}>
                        {
                            genres.map((elem, index) => (
                                <div key={index} className={styles.checkbox} >
                                    {elem.name}
                                    <input
                                        type="checkbox"
                                        name={elem.name}
                                        value={elem.name}
                                        className={styles.checkbox2}
                                    />
                                </div>
                            ))
                        }
                    </div>
                </div>
                <div>
                    {console.log(platforms)}
                    <label>Platforms:</label>
                    <div>
                     {/*    {
                            platforms.map((elem, index) => (
                                <div key= {index}>
                                    {elem}
                                    <input
                                    type = "checkbox"
                                    name = {elem}
                                    value = {elem}
                                    />
                                </div>
                            ))
                        } */}
                    </div>
                </div>
            </form>
        </div>
    )
}

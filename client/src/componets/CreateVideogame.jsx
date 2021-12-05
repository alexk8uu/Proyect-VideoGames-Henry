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
    

    let [input, setInput] = useState({
        name: "",
        description: "",
        released: "",
        rating: 0,
        img: "",
        platforms: [],
        genres: []
    })

    function handleChange (e) {
        setInput({
            ...input,
            [e.target.name] : [e.target.value]
        })
        console.log(input)
    }

    function handleSelectPlatforms (e) {
        setInput({
            ...input,
            platforms: [...input.platforms, e.target.value]
        })
        console.log(input)
    }

    function handleSelectGenres (e) {
        setInput({
            ...input,
            genres: [...input.genres, e.target.value]
        })
        console.log(input)
    }


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
                        onChange={handleChange}
                    />
                </div>
                <div>
                    <label>Description:</label>
                    <textarea
                        name="description"
                        value={input.description}
                        onChange={handleChange}
                    />
                </div>
                <div>
                    <label>Imagen:</label>
                    <input
                        type='Text'
                        name="image"
                        value={input.img}
                        onChange={handleChange}
                    />
                </div>
                <div>
                    <label>Released:</label>
                    <input
                        type="date"
                        name="released"
                        value={input.released}
                        onChange={handleChange}
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
                        onChange={handleChange}
                    />
                </div>
                <div>
                    <label>Genres:</label>
                    <div className={styles.genres}>
                        {
                            genres.map((elem, index) => (
                                <div key={index} className={styles.genres_checkbox} >
                                    {elem.name}
                                    <input
                                        type="checkbox"
                                        name={elem.name}
                                        value={elem.name}
                                        className={styles.checkbox2}
                                        onChange={handleSelectGenres}
                                    />
                                </div>
                            ))
                        }
                    </div>
                </div>
                <div>

                    <label>Platforms:</label>
                    <div className={styles.platforms}>
                        {
                            platforms.map((elem, index) => (
                                <div key= {index} className={styles.platforms_checkbox}>
                                    {elem}
                                    <input
                                    type = "checkbox"
                                    name = {elem}
                                    value = {elem}
                                    onChange={handleSelectPlatforms}
                                    />
                                </div>
                            ))
                        }
                    </div>
                </div>
            </form>
        </div>
    )
}

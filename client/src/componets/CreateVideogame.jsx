import React from 'react'
import { useSelector, useDispatch } from "react-redux";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { NavLink as Link } from 'react-router-dom';
import { createVideogame, getGenres, getPlataforms, getVideogames } from "../redux/actions/index.js"
import styles from "../css_modules/CreateVideogame.module.css"


function validate(input) {
    let error = {};
    if (!input.name) {
        error.name = "Name is required"
    } else if (!input.description) {
        error.description = "Description is required"
    } else if (!input.released) {
        error.released = "Released is required"
    } else if (input.genres.length < 0) {
        error.genres = "Genres is required"
    } else if (input.platforms.length < 0) {
        error.platforms = "Platforms is required"
    }
    return error;
}




export default function CreateVideogame() {

    const dispatch = useDispatch();
    const genres = useSelector((state) => state.genres);
    const platforms = useSelector((state) => state.platforms);
    const history = useNavigate()
    const [errors, setErrors ] = useState({});

    let [input, setInput] = useState({
        name: "",
        description: "",
        released: "",
        rating: 0,
        img: "",
        platforms: [],
        genres: []
    })

    function handleChange(e) {
        setInput({
            ...input,
            [e.target.name]: e.target.value
        })
        setErrors(validate({
            ...input,
            [e.target.name]: e.target.value
        }))
        console.log(input)
    }

    function handleSelectPlatforms(e) {
        setInput({
            ...input,
            platforms: [...input.platforms, e.target.value]
        })
        console.log(input)
    }

    function handleSelectGenres(e) {
        setInput({
            ...input,
            genres: [...input.genres, e.target.value]
        })
        console.log(input)
    }

    function handleSubmit(e) {
        e.preventDefault(e);
        console.log(input);
        dispatch(createVideogame(input));
        alert('Your Videogame ')
        setInput({
            name: "",
            description: "",
            released: "",
            rating: 0,
            img: "",
            platforms: [],
            genres: []
        })
        history('/home');
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
            <form onSubmit={(e) => handleSubmit(e)}>
                <div>
                    <label htmlFor="name">Name:</label>
                    <input
                        id="name"
                        type="text"
                        value={input.name}
                        name="name"
                        onChange={handleChange}
                    />
                    {
                        errors.name && (
                            <p className={styles.error}>{errors.name}</p>
                        )
                    }
                </div>
                <div>
                    <label htmlFor="description">Description:</label>
                    <textarea
                        id="description"
                        name="description"
                        value={input.description}
                        onChange={handleChange}
                    />
                     {
                        errors.description && (
                            <p className={styles.error}>{errors.description}</p>
                        )
                    }
                </div>
                <div>
                    <label htmlFor="img">Imagen:</label>
                    <input
                        id="img"
                        type="text"
                        name="img"
                        value={input.img}
                        onChange={handleChange}
                    />
                </div>
                <div>
                    <label >Released:</label>
                    <input
                        type="date"
                        name="released"
                        value={input.released}
                        onChange={handleChange}
                    />
                      {
                        errors.released && (
                            <p className={styles.error}>{errors.released}</p>
                        )
                    }
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
                                <div key={index} className={styles.platforms_checkbox}>
                                    {elem}
                                    <input
                                        type="checkbox"
                                        name={elem}
                                        value={elem}
                                        onChange={handleSelectPlatforms}
                                    />
                                </div>
                            ))
                        }
                    </div>
                    <div>
                        <button type="submit">
                            Enter
                        </button>
                    </div>
                </div>
            </form>
        </div>
    )
}

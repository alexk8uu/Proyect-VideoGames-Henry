import React from 'react';
import { NavLink as Link } from 'react-router-dom';

export default function Card({name, img, genres, id, rating }) {
    return (
        <div key={id}>
            <Link to={`/videogame/${id}`}>
            <img src={
                img?img:"https://bitsofco.de/content/images/2018/12/Screenshot-2018-12-16-at-21.06.29.png"
            } alt={"Videogame"}/>
            </Link>
        <div>
            <h4>{name}</h4>
            <div>
                {genres.map((genre) => {
                    return <p>{genre}</p>
                })}
            </div>
        </div>
        <div>
            <h4>{rating}</h4>
        </div>
        </div>
    )
}
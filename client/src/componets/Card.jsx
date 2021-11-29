import React from 'react';
/* import { NavLink as Link } from 'react-router-dom'; */

export default function Card({name, img, genres, id, rating }) {
    return (
       <div>
           <img src={img?img:"https://bitsofco.de/content/images/2018/12/Screenshot-2018-12-16-at-21.06.29.png"} alt={"Videogame"}/>
           <h1>{name}</h1>
           <div>
               <div>
                 {/*   {
                   console.log(genres),
                   genres.map((elem) => elem.name).join("/")
                   } */}
               </div>
           </div>
           <div> Rating: {rating}</div>
        </div>
    )
}
/* 
<div>
<Link to={`/videogame/${id}`}>
<img src={
    img?img:"https://bitsofco.de/content/images/2018/12/Screenshot-2018-12-16-at-21.06.29.png"
} alt={"Videogame"}/>
</Link>
<div>
<div>{name}</div>
<div>
    {genres.map((genre) => {
        return <p>{genre}</p>
    })}
</div>
</div>
<div>
<div>{rating}</div>
</div>
</div> */
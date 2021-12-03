import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { searchGameByName } from "../redux/actions/index.js"



export default function SearchBar() {
   
    const dispatch = useDispatch();
    const [name, setName] = useState("");
   
    function handleImputChange (e) {
        e.preventDefault();
        setName(e.target.value);
        console.log(name)
    }

    function handleSubmit (e) {
        e.preventDefault();
        dispatch(searchGameByName(name))
    }
   
   
    return (
        <div>
            <input
            type = 'text'
            placeholder = 'Buscar...'
            onChange = {(e) => handleImputChange(e) }
            />
            <button type='submit' onClick={(e) => handleSubmit(e)}>Buscar</button>
        </div>
    )
}

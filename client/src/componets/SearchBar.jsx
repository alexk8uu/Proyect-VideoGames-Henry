import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { searchGameByName } from "../redux/actions/index.js"
import { BiSearch } from "react-icons/bi"
import styles from '../css_modules/SearchBar.module.css'


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
        <div className={styles.box}>
            <form>
            <input
            type = 'text'
            placeholder = 'Search Game'
            onChange = {(e) => handleImputChange(e) }
            />
            <button type='submit' onClick={(e) => handleSubmit(e)}>Buscar <BiSearch/></button>
            </form>
        </div>
    )
}

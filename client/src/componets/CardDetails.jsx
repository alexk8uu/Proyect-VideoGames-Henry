import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getDetailsByID } from "../redux/actions";
import { useParams } from "react-router";
import styles from "../css_modules/CardDetails.module.css"
import { useNavigate } from "react-router-dom";


export default function CardDetails() {

    
    let details = useSelector((state) => state.details);
    let dispatch = useDispatch()
    let params = useParams()
    const { id } = params
    let history = useNavigate();


    useEffect(() => {
        dispatch(getDetailsByID(id))
    }, [dispatch, id])

    function handleClick() {
        history('/home')
    }
    return (
        <div className={styles.container}>
            <div className={styles.card}>
                <a className={styles.button} onClick={e => handleClick(e)}>x</a>
                <img src={details.img} alt="Game Detail" />
                <div>
                    <div className={styles.details}>{details.name}</div>
                    <div className={styles.details}>Description: <p dangerouslySetInnerHTML={{ __html: details.description, }} /></div>
                    <div className={styles.details}>{details.rating}</div>
                    <div className={styles.details}>{details.released}</div>
                    <div>
                        {
                        details.platforms && details.platforms?.map(elem => <span key={elem.id}  className={styles.details}>{elem.name}</span>)
                        }
                    </div>
                    {
                        details.genres && details.genres?.map(gen => <span key={details.id}  className={styles.details}>{gen.name} </span>)
                    }
                </div>
            </div>
        </div>
    )
}
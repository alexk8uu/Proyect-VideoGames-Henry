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
            <a className={styles.button} onClick={e => handleClick(e)}>x</a>
            <div className={styles.title}>
                <h1>{details.name}</h1>
            </div>
            <div className={styles.img}>
                <img src={details.img} alt="Game Detail" />
            </div>
            <div className={styles.description}>
                <div className={styles.descriptionText}>
                    <h2>Description</h2>
                    <p dangerouslySetInnerHTML={{ __html: details.description, }} />
                </div>
            </div>
            <div className={styles.box}>
                <div className={styles.boxText}>
                    <h4>Platforms</h4>
                    {
                        details.platforms && details.platforms?.map(elem => <span key={elem} className={styles.details}> {elem} /</span>)
                    }
                    <h4>Genres</h4>
                    {
                        details.genres && details.genres?.map(gen => <span key={details.id} className={styles.details}> {gen.name} /</span>)
                    }
                </div>

            </div>
            <div className={styles.rating}>
                <div className={styles.ratingText}>
                    <div className={styles.details2}> Rating : {details.rating}</div>
                    <div className={styles.details2}> Released: {details.released}</div>
                </div>
            </div>
        </div>



    )




    /*(
        { <div className={styles.container}>
            <div className={styles.card}>
                <a className={styles.button} onClick={e => handleClick(e)}>x</a>
                <img src={details.img} alt="Game Detail" />
                <div className={styles.details_name}>{details.name}</div>
                <div className={styles.box}>
                    <div className={styles.details_descTitle}>Description <p dangerouslySetInnerHTML={{ __html: details.description, }} /></div>
                    
                    <div className={styles.boxDates}>
                        <div className={styles.details2}> Rating : {details.rating}</div>
                        <div className={styles.details2}> Released: {details.released}</div>
                    </div>
                    
                        <div className={styles.boxDates2}>
                            <h4>Platforms</h4>
                            {
                                details.platforms && details.platforms?.map(elem => <span key={elem.id} className={styles.details}>{elem.name}</span>)
                            }
                        </div>
                        <div className={styles.boxDates}>
                            <h4>Genres</h4>
                            {
                                details.genres && details.genres?.map(gen => <span key={details.id} className={styles.details}>{gen.name} </span>)
                            }
                        
                    </div>

                </div>
            </div>
        </div>
    ) }*/
}
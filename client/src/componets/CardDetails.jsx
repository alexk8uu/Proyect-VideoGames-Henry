import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getDetailsByID } from "../redux/actions";
import { useParams } from "react-router";
import styles from "../css_modules/CardDetails.module.css"


export default function CardDetails() {


    let details = useSelector((state) => state.details);
    let dispatch = useDispatch()
    let params = useParams()
    const { id } = params

    useEffect(() => {
        dispatch(getDetailsByID(id))
    }, [dispatch, id])

    return (
        <div className={styles.container}>
            <div className={styles.card}>
                <img src={details.img} alt="Game Detail" />
                <div>
                    <div>{details.name}</div>
                    <div>Description: <p dangerouslySetInnerHTML={{ __html: details.description, }} /></div>
                    <div>{details.rating}</div>
                    <div>{details.released}</div>
                    <div>
                        {
                        details.platforms && details.platforms?.map(elem => <span key={elem.id}>{elem.name}</span>)
                        }
                    </div>
                    {
                        details.genres && details.genres?.map(gen => <span key={details.id}>{gen.name} </span>)
                    }
                </div>
            </div>
        </div>
    )
}
import React from 'react'
import classes from './MovieCard.module.scss'
import {Link} from "react-router-dom";

const MovieCard = ({params}) => {
    return (
        <li className={ classes["movie_card-container"] }>
            <Link to={`/${params.link}`}>
                <img src={ params.imgLocation } className={ classes["card-img"] } alt=""/>
                <div className={ classes["card-description"] }>{params.description}</div>
                <h3 className={ classes["card-title"] }>{params.title}</h3>
            </Link>
        </li>
    )
}

export default MovieCard;
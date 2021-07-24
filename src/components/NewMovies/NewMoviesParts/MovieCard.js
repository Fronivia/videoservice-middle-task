import React from 'react'
import classes from './MovieCard.module.scss'

const MovieCard = ({params}) => {

    return (
        <li className={ classes["movie_card-container"] }>
            <a href={"/"}>
                <img src={ params.imgLocation } className={ classes["card-img"] } alt=""/>
                <div className={ classes["card-description"] }>{params.description}</div>
                <h3 className={ classes["card-title"] }>{params.title}</h3>
            </a>
        </li>
    )
}

export default MovieCard;
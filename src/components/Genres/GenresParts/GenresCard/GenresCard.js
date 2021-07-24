import React from 'react'
import clsx from "clsx";
import classes from './GenresCard.module.scss'

const GenresCard = ({params}) => {

    return (
        <a className={ classes["genres_card-container"] } href="/">
            <div className={ classes["genres-card"] }>
                <img src={ params.imgLocation } alt="params.class"/>
                <h3>{params.genre}</h3>
            </div>
            <div className={ clsx(classes["genres_card-background"], classes[params.class]) }>

            </div>
        </a>
    )
}

export default GenresCard;
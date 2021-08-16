import React from 'react';
import clsx from "clsx";
import classes from './GenresCard.module.scss';

const GenresCard = ({params}) => {

    return (
        <li className={ classes["genres_card-container"] }>
            <a  href="/" className={ classes["genres_card-link"] }>
                <div className={ classes["genres_card"] }>
                    <img className={ classes["genres_card-img"] } src={ params.imgLocation } alt="params.class"/>
                    <h3 className={ classes["genres_card-title"] }>{params.genre}</h3>
                </div>
                <div className={ clsx(classes["genres_card-background"], classes[params.class]) }>

                </div>
            </a>
        </li>
    )
}

export default GenresCard;
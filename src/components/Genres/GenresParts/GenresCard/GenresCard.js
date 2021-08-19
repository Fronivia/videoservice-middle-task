import React from 'react';
import clsx from "clsx";
import classes from './GenresCard.module.scss';

const GenresCard = ({params}) => (
    <li className={ classes["genres_card_container"] }>
        <a  href="/" className={ classes["genres_card_link"] }>
            <div className={ classes["genres_card"] }>
                <img className={ classes["genres_card_img"] } src={ params.imgLocation } alt="params.class"/>
                <h3 className={ classes["genres_card_title"] }>{params.genre}</h3>
            </div>
            <div className={ clsx(classes["genres_card_background"], classes[params.class]) }>

            </div>
        </a>
    </li>
);

export default GenresCard;
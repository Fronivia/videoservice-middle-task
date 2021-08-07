import React from 'react'
import classes from './SearchCard.module.scss'
import {Link} from "react-router-dom";
import clsx from "clsx";

const SearchCard = ({params, condition}) => {

    if (condition && !params.title.toLowerCase().includes(condition.toLowerCase())){
        return null
    }

    return (
        <li className={ clsx(classes["movie_card-container"]) }>
            <Link to={`/${params.link}`}>
                <img src={ params.img } className={ classes["card-img"] } alt=""/>
                <div className={ classes["card-description"] }>{params.description}</div>
                <h3 className={ classes["card-title"] }>{params.title}</h3>
            </Link>
        </li>
    )
}

export default SearchCard;
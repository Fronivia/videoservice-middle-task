import React from 'react';
import classes from './MovieCard.module.scss';
import {Link} from "react-router-dom";
import clsx from "clsx";
import Scrollbar from "../../UI/Scrollbar/Scrollbar";

const MovieCard = ({params, condition}) => {

    if (condition && !params.title.toLowerCase().includes(condition.toLowerCase())){
        return null;
    };

    return (
        <li className={ clsx(classes["movie_card_container"]) }>
            <Link to={`/${params.link}`}>
                <img src={ params.img } className={ classes["card_img"] } alt=""/>
                <div className={ classes["card_description"] } >
                    <Scrollbar height={"338px"} showScroller={true}>
                        <p>{params.description}</p>
                    </Scrollbar></div>
                <h3 className={ classes["card_title"] }>{params.title}</h3>
            </Link>
        </li>
    );
};

export default MovieCard;
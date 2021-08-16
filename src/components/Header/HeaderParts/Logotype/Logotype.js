import React from 'react';
import {Link} from "react-router-dom";
import classes from './Logotype.module.scss';

const Logotype = () => {

    return (
        <Link to={"/"} className={ classes["logotype-container"] }>
                <img className={ classes.logotype } src="/assets/Header/logotype.svg" alt=""/>
                <h1 className={ classes["logotype_title"] }>Видеосервис</h1>
        </Link>
    )
}

export default Logotype;
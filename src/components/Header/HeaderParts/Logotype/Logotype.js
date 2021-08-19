import React from 'react';
import {Link} from "react-router-dom";
import classes from './Logotype.module.scss';

const Logotype = () => (
    <Link to={"/"} className={ classes["logotype_container"] }>
            <img className={ classes.logotype } src="/assets/Header/logotype.svg" alt=""/>
            <h1 className={ classes["logotype_title"] }>Видеосервис</h1>
    </Link>
);

export default Logotype;
import React from 'react'
import classes from './Logotype.module.scss'

const Logotype = () => {

    return (
        <div className={ classes["logotype-container"] }>
            <img src="/assets/Header/logotype.svg" alt=""/>
            <a href="/" >
                <h1>Видеосервис</h1>
            </a>
        </div>
    )
}

export default Logotype;
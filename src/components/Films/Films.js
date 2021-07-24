import React from 'react'
import classes from './Films.module.scss'
import NewMovies from "../NewMovies/NewMovies";
import Genres from "../Genres/Genres";

const Films = () => {

    return (
        <main className={ classes.films }>
            <NewMovies/>
            <Genres/>
        </main>
    )
}

export default Films;
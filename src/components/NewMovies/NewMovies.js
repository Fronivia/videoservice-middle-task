import React from 'react'
import classes from './NewMovies.module.scss'
import MovieCard from "./NewMoviesParts/MovieCard";

const NewMovies = () => {

    const arr = [
        {title:"Мульт в кино. Выпуск №103. Некогда грустить!", imgLocation:"/assets/Films/catMovie.png", alt:"Мульт в кино", description:""},
        {title:"Новый Бэтмен", imgLocation:"/assets/Films/batmanMovie.png", alt:"Новый Бэтмен", description:""},
        {title:"Однажды... в Голливуде", imgLocation:"/assets/Films/hollywoodMovie.png", alt:"Однажды... в Голливуде", description:"Фильм повествует о череде событий, произошедших в Голливуде в 1969 году, на закате его «золотого века». Известный актер Рик Далтон и его дублер Клифф Бут пытаются найти свое место в стремительно меняющемся мире киноиндустрии."},
        {title:"Стриптизерши", imgLocation:"/assets/Films/stripperMovie.png", alt:"Стриптизерши", description:""}
    ]

    const movieCardHandler = () => {
        return arr.map((item) => <MovieCard params={item} key={item.title}/>)
    }

    return (
        <>
            <h2 className={ classes["films-section"] }><img src="/assets/Films/fire.png" alt="fire_icon"/>Новинки</h2>
            <ul className={ classes["movies-list"] }>
                {movieCardHandler()}
            </ul>
        </>
    )
}

export default NewMovies;
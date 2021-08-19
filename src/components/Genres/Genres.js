import React from 'react';
import classes from './Genres.module.scss';
import GenresCard from "./GenresParts/GenresCard/GenresCard";

const Genres = () => {

    const arr = [
        {genre:"Комедии", imgLocation:"/assets/Genres/comedySmile.svg", class:"comedy"},
        {genre:"Драмы", imgLocation:"/assets/Genres/dramaSmile.svg", class:"drama"},
        {genre:"Фантастика", imgLocation:"/assets/Genres/fantasySmile.svg", class:"fantasy"},
        {genre:"Ужасы", imgLocation:"/assets/Genres/horrorSmile.svg", class:"horror"},
    ]

    //функция, которая рендерит карточки жанров
    const genresCardHandler = () => {
        return arr.map(item => <GenresCard params={ item } key={item.genre}/>)
    }

    return (
        <>
            <h2 className={ classes["films_section"] }>Жанры</h2>
            <ul className={ classes["genres_list"] }>
                { genresCardHandler() }
            </ul>
        </>
    )
};

export default Genres;
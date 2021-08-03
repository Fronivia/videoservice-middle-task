import React from 'react'
import classes from './FilmDescribe.module.scss'

const FilmDescribe = ({params}) => {
    console.log(params)
    return (

        <div className={ classes["cinema_describe-container"] }>
            <div className={ classes["cinema_poster"] }>
                <img src={params.poster} alt=""/>
            </div>
            <div>
                <div className={ classes["cinema_info"] }>
                    <div className={ classes["cinema_general_data"] }>
                        <p>Название:</p>
                        <p>Страна:</p>
                        <p>Жанр:</p>
                    </div>
                    <div className={ classes["cinema_current_data"] }>
                        <h2 className={ classes["cinema_title"] }>{params.title}</h2>
                        <p>{params.country}</p>
                        <p>{params.genre}</p>
                    </div>
                </div>
                <div className={ classes["cinema_description"] }>
                    {params.description}
                </div>
            </div>
        </div>
    )
}

export default FilmDescribe;
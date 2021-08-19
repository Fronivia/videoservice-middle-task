import React from 'react';
import classes from './FilmDescribe.module.scss';

const FilmDescribe = ({params}) => (
    <div className={ classes["cinema_describe-container"] }>
        <div className={ classes["cinema_poster"] }>
            <img src={params.poster} alt=""/>
        </div>
        <div>
            <div className={ classes["cinema_info_container"] }>
                <div className={ classes["cinema_info"] }>
                    <p className={ classes["cinema_general_data"] }>Название:</p>
                    <h2 className={ classes["cinema_title"] }>{params.title}</h2>
                </div>
                <div className={ classes["cinema_info"] }>
                    <p className={ classes["cinema_general_data"] } >Страна:</p>
                    <p className={ classes["cinema_current_data"] }>{params.country}</p>
                </div>
                <div className={ classes["cinema_info"] }>
                    <p className={ classes["cinema_general_data"] }>Жанр:</p>
                    <p className={ classes["cinema_current_data"] }>{params.genre}</p>
                </div>
            </div>
            <div className={ classes["cinema_description"] }>
                {params.description}
            </div>
        </div>
    </div>
);

export default FilmDescribe;
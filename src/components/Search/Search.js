import React, { useState, useEffect, useContext } from 'react';
import axios from "axios";
import classes from './Search.module.scss';
import MovieCard from "../NewMovies/MovieParts/MovieCard";
import {WindowContext} from "../../store/windowContext/windowContext";
import Loader from "../UI/Loader/Loader";
import clsx from "clsx";

const Search = () => {

    const [data, setData] = useState(false);
    let {searchQuery} = useContext(WindowContext);
    //Рендерим карточки фильмов
    const renderList = () => {
        let arr = [];
        for (let item in data){
            arr.push(<MovieCard params={data[item]} condition={searchQuery} key={item}/>);
        };
        return arr;
    };

    const loadData = async () => {
        const response = await axios.get(
            "https://testovoe-htc-middle-default-rtdb.firebaseio.com/Movies.json"
        ).then( r => r.data)
        setData(response)
    }

    useEffect(() =>{
        loadData();
    }, []);
    //Показывает лоадер во время загрузки
    if (!data){
        return (
            <section className={ clsx(classes.loader) }>
                <Loader/>
            </section>
        )
    }

    return (
        <section className={ classes["search_container"] }>
            <h2 className={ classes["search_title"] }>
                Поиск
            </h2>
            <ul className={ classes["result_list"] }>
                {data ? renderList() : false}
            </ul>
        </section>
    )
}

export default Search;
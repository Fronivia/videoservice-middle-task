import React, { useState, useEffect, useContext } from 'react'
import axios from "axios";
import classes from './Search.module.scss'
import SearchCard from "./SearchParts/SearchCard";
import {WindowContext} from "../../store/windowContext/windowContext";
import Loader from "../UI/Loader/Loader";
import clsx from "clsx";

const Search = () => {

    const [data, setData] = useState(false)
    let {searchQuery} = useContext(WindowContext)
    const renderList = () => {

        let arr = [];

        for (let item in data){
            arr.push(<SearchCard params={data[item]} condition={searchQuery} key={item}/>)
        }

        return arr;
    }

    const loadData = async () => {
        const response = await axios.get("https://testovoe-htc-middle-default-rtdb.firebaseio.com/Movies.json").then( r => r.data)
        setData(() => response)
    }

    useEffect(() =>{
        loadData()
    }, [])

    if (!data){
        return (
            <section className={ clsx(classes.loader) }>
                <Loader/>
            </section>
        )
    }

    return (
        <section className={ classes["search-container"] }>
            <h2>
                Поиск
            </h2>
            <div className={ classes["result-container"] }>
                <ul className={ classes["result-list"] }>
                    {data ? renderList() : false}
                </ul>
            </div>
        </section>
    )
}

export default Search;
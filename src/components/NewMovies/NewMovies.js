import React, { useState, useEffect, useRef } from 'react'
import classes from './NewMovies.module.scss'
import axios from "axios";
import Loader from "../UI/Loader/Loader";
import SearchCard from "../Search/SearchParts/SearchCard";
import clsx from "clsx";

const NewMovies = () => {

    const [data, setData] = useState(false)
    const ulRef = useRef()

    const loadData = async () => {
        const response = await axios.get("https://testovoe-htc-middle-default-rtdb.firebaseio.com/Movies.json").then( r => r.data)
        setData(() => response)
    }

    const clickHandler = ({currentTarget : target}) => {
        const ul = ulRef.current
        let i = 0;
        if (target.getAttribute("name") === "left"){
            console.log(ul.scrollLeft)
            let a  = setInterval(()=>{
                if( i === 300) {
                    clearInterval(a)
                } else {
                    ul.scrollBy(-10,0)
                    i +=10
                }
            }, 1)
            // ul.scrollBy(-300,0)
        } else {
            let a  = setInterval(()=>{
                if( i === 300) {
                    clearInterval(a)
                } else {
                    ul.scrollBy(10,0)
                    i +=10
                }
            }, 1)
            // ul.scrollBy(300,0)
        }
    }

    const renderList = () => {

        let arr = [];

        for (let item in data){
            arr.push(<SearchCard params={data[item]} key={item}/>)
        }

        return arr;
    }


    useEffect(() => {
        loadData()
    }, [])

    if (!data){
        return (
            <>
                <h2 className={ classes["films-section"] }><img src="/assets/Films/fire.png" alt="fire_icon"/>Новинки</h2>
                <Loader/>
            </>
        )
    }

    return (
        <>
            <h2 className={ classes["films-section"] }><img src="/assets/Films/fire.png" alt="fire_icon"/>Новинки</h2>

            <div className={ classes["list-container"] }>
                <div className={ clsx(classes["arrow-left"], classes.arrow) } name="left" onClick={  clickHandler }><img src="/assets/Films/backArrow.svg" alt=""/></div>
                <div className={ clsx(classes["arrow-right"], classes.arrow) } name="right" onClick={  clickHandler }><img src="/assets/Films/backArrow.svg" alt="" /></div>
                <ul className={ classes["movies-list"] } ref={ ulRef }>
                    {renderList()}
                </ul>
            </div>
        </>
    )
}

export default NewMovies;
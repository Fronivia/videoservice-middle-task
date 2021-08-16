import React, { useState,useEffect } from 'react'
import axios from "axios";
import classes from './FilmSection.module.scss'
import FilmDescribe from "./FilmSectionParts/FilmDescribe/FilmDescribe";
import FilmComments from "./FilmSectionParts/FilmComments/FilmComments";
import Loader from "../UI/Loader/Loader";

const FilmSection = (props) => {
    const [data,setData] = useState(false)
    const loadData = async () => {
        const response = await axios.get(`https://testovoe-htc-middle-default-rtdb.firebaseio.com/Films${props.match.url}.json`).then(
            r=> r.data,
            e=> e.name
        )
        setData(()=> response)
    }

    useEffect(()=>{
        loadData()
    },[])

    if (data === null) {
        return (
            <section className={ classes["Film_section-container"] }>
                <button onClick={()=> props.history.goBack()} className={ classes["back_arrow"] }>
                    <img className={ classes["back_arrow-img"] } src="/assets/Films/backArrow.svg" alt="" />
                    <span className={ classes["back-arrow_text"] }>Назад</span>
                </button>
                <h1 className={ classes["Film_section_alert"] }>Данной страницы пока еще не существует</h1>
            </section>

        )
    }

    if (!data) {
        return (
            <section className={ classes["Film_section-container"] }>
                <button onClick={()=> props.history.goBack()} className={ classes["back_arrow"] }>
                    <img className={ classes["back_arrow-img"] } src="/assets/Films/backArrow.svg" alt="" />
                    <span className={ classes["back-arrow_text"] }>Назад</span>
                </button>
                <div className={ classes["loader-container"]}>
                    <Loader/>
                </div>
            </section>
        )
    }


    return (
        <section className={ classes["Film_section-container"] }>
            <button onClick={()=> props.history.goBack()} className={ classes["back_arrow"] }>
                <img className={ classes["back_arrow-img"] } src="/assets/Films/backArrow.svg" alt="" />
                <span className={ classes["back_arrow-text"] }>Назад</span>
            </button>
            <FilmDescribe params={data}/>
            <FilmComments params={ data.comments } url={props.match.url}/>
        </section>
    )
}

export default FilmSection;
import React, { useState, useEffect, useRef } from 'react';
import classes from './NewMovies.module.scss';
import axios from "axios";
import Loader from "../UI/Loader/Loader";
import MovieCard from "./MovieParts/MovieCard";
import clsx from "clsx";

const NewMovies = () => {

    const [data, setData] = useState(false);
    const [step, setStep] = useState(0);
    const ulRef = useRef();
    const listContainerRef = useRef();

    //загружаем данные с бд
    const loadData = async () => {
        const response = await axios.get("https://testovoe-htc-middle-default-rtdb.firebaseio.com/Movies.json").then( r => r.data);
        setData(() => response);
    };

    //получаем информацию для работы слайдера.
    //Учитывается активный шаг, размер окна и количество элементов
    const getSliderData = () => ({
        ul : ulRef.current,
        listContainer : listContainerRef.current,
        ratio : 300,
        listWidth : 280,
        get ulLength(){
            return this.ul.childNodes.length;
        },
        get viewportLength() {
            return Math.floor(this.listContainer.offsetWidth / this.listWidth);
        },
        get currentPosition(){
            return step * this.ratio;
        },
        get difference(){
            return this.ulLength - this.viewportLength;
        }
    })
    //обработчик клика на слайдер
    const clickHandler = ({currentTarget : target}) => {
        let { ul, ratio, difference, currentPosition } = getSliderData();

        if (target.getAttribute("name") === "left") {
            if (step === 0) {
                setStep(difference);
                ul.style.transform = `translateX(${-ratio * difference}px)`;
            } else {
                setStep(prev => prev-1);
                ul.style.transform = `translateX(${ -(currentPosition) + ratio}px)`;
            }
        } else {
            if (step >= (difference)) {
                ul.style.transform = `translateX(${0}px)`;
                setStep( 0);
            } else {
                setStep(prev => prev+1);
                ul.style.transform = `translateX(${ -(currentPosition) - ratio}px)`;
            }
        }
    }

    //При ресайзе слайдер отображает корректное количество элементов
    const resizeHandler = () => {
        if (!data) return;
        const { listContainer, difference, ul, ratio, currentPosition } = getSliderData();
        if (listContainer.offsetWidth === 580 && step === (difference + 1) ){
            setStep(prev => prev - 1);
            ul.style.transform = `translateX(${ -(currentPosition) + ratio}px)`;
        }
        if (listContainer.offsetWidth === 880 && step === (difference + 1) ){
            setStep(prev => prev - 1);
            ul.style.transform = `translateX(${ -(currentPosition) + ratio}px)`;
        }
        if (listContainer.offsetWidth === 1180 && step === (difference + 1) ){
            setStep(prev => prev - 1);
            ul.style.transform = `translateX(${ -(currentPosition) + ratio}px)`;
        }
    }
    //рендерим карточки фильмов
    const renderList = () => {
        let arr = [];
        for (let item in data){
            arr.push(<MovieCard params={data[item]} key={item}/>);
        };
        return arr;
    }

    useEffect(() => {
        loadData()
    }, []);

    useEffect(() =>{
        window.addEventListener("resize", resizeHandler);
        return () => {
            window.removeEventListener("resize", resizeHandler);
        };
    });
    //Пока грузится показываем экран загрузки
    if (!data){
        return (
            <>
                <h2 className={ classes["films_section"] }>
                    <img className={ classes["films_section_img"] } src="/assets/Films/fire.png" alt="fire_icon"/>
                    <span>Новинки</span>
                </h2>
                <Loader/>
            </>
        );
    };

    return (
        <>
            <h2 className={ classes["films_section"] }>
                <img className={ classes["films_section_img"] } src="/assets/Films/fire.png" alt="fire_icon"/>
                <span>Новинки</span>
            </h2>
            <div className={ classes["list_container"] }>
                <div
                    className={ clsx(classes["arrow_left"], classes.arrow) }
                    name="left"
                    onClick={  clickHandler }
                >
                    <img className={ classes["arrow_img"] } src="/assets/Films/backArrow.svg" alt="arrow left"/>
                </div>
                <div className={ clsx(classes["arrow_right"], classes.arrow) }
                     name="right"
                     onClick={  clickHandler }
                >
                    <img className={ classes["arrow_img"] } src="/assets/Films/backArrow.svg" alt="arrow right" />
                </div>
                <div className={ classes["movies_list_container"] } ref={listContainerRef}>
                    <ul className={ classes["movies_list"] } ref={ ulRef }>
                        {renderList()}
                     </ul>
                </div>
            </div>
        </>
    )
};

export default NewMovies;
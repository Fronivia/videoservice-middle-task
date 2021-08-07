import React, { useContext,useRef } from 'react'
import classes from './Searcher.module.scss'
import Input from "../../../UI/Input/Input";
import Button from "../../../UI/Button/Button";
import {Link} from "react-router-dom";
import {WindowContext} from "../../../../store/windowContext/windowContext";

const Searcher = () => {

    const {setQuery} = useContext(WindowContext)

    const inputRef = useRef()

    const clickHandler = () =>{
        setQuery(inputRef.current.value)
    }

    return (
        <div className={ classes['searcher-container'] }>
            <form>
                <Input Ref={inputRef} >Поиск...</Input>
                <Link to={"/search"}><Button transparent={ true } onClick={ clickHandler }>Найти</Button></Link>
            </form>
        </div>
    )
}

export default Searcher;
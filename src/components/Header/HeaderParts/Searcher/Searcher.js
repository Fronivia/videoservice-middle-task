import React, { useContext,useRef } from 'react';
import classes from './Searcher.module.scss';
import Input from "../../../UI/Input/Input";
import Button from "../../../UI/Button/Button";
import {Link} from "react-router-dom";
import {WindowContext} from "../../../../store/windowContext/windowContext";
import clsx from "clsx";

const Searcher = ({Mobile}) => {

    const {setQuery} = useContext(WindowContext);

    const inputRef = useRef();

    const clickHandler = () => {
        setQuery(inputRef.current.value);
    };

    return (
        <form className={ clsx(classes['searcher_container'], Mobile && classes.mobile) }>
                <Input Ref={inputRef} >Поиск...</Input>
                <Link to={"/search"}>
                    <Button transparent={ true } onClick={ clickHandler }>Найти</Button>
                </Link>
        </form>
    )
};

export default Searcher;
import React from 'react'
import classes from './Searcher.module.scss'
import Input from "../../../UI/Input/Input";
import Button from "../../../UI/Button/Button";

const Searcher = () => {

    return (
        <div className={ classes['searcher-container'] }>
            <Input>Поиск...</Input>
            <Button transparent={ true }>Найти</Button>
        </div>
    )
}

export default Searcher;
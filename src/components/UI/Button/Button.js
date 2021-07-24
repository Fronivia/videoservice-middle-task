import React from 'react'
import clsx from "clsx";
import classes from './Button.module.scss'

const Button = (props) => {

    return (
        <button className={ clsx(classes.button, !props.transparent ? classes["red-button"] : classes["transparent-button"]) }>{props.children}</button>
    )
}

export default Button;
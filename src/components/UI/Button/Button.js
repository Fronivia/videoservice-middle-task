import React from 'react'
import clsx from "clsx";
import classes from './Button.module.scss'

const Button = (props) => {

    return (
        <button onClick={ props.onClick } className={ clsx(classes.button, props.additionalClass, !props.transparent ? classes["red-button"] : classes["transparent-button"]) } disabled={ props.disabled }>{props.children}</button>
    )
}

export default Button;
import React from 'react'
import classes from './Input.module.scss'

const Input = (props) => {

    return (
        <input className={ classes.input } placeholder={ props.children }/>
    )
}

export default Input;
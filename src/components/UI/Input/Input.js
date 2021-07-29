import React from 'react'
import classes from './Input.module.scss'

const Input = (props) => {

    return (
        <input className={ classes.input } placeholder={ props.children } onChange={ props.onChange } name={ props.name }/>
    )
}

export default Input;
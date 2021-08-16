import React from 'react'
import classes from './Input.module.scss'

const Input = (props) => (
    <input
        className={ classes.input }
        placeholder={ props.children }
        onChange={ props.onChange }
        name={ props.name }
        ref={ props.Ref }
        type={props.type}
    />
)

export default Input;
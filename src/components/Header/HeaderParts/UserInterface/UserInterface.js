import React from 'react'
import classes from './UserInterface.module.scss'
import Button from "../../../UI/Button/Button";

const UserInterface = () => {

    return (
        <div className={ classes["user_interface-container"] }>
            <p></p>
            <Button transparent={false}>Войти</Button>
        </div>
    )
}

export default UserInterface;
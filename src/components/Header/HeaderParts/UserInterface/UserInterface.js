import React, { useState, useContext } from 'react';
import ReactDOM from 'react-dom';
import axios from "axios";
import { Transition } from "react-transition-group";
import classes from './UserInterface.module.scss';
import Button from "../../../UI/Button/Button";
import ModalWindow from "../../../ModalWindow/ModalWindow";
import { WindowContext } from "../../../../store/windowContext/windowContext";
import clsx from "clsx";

const UserInterface = () => {
    const { modal, addModalWindow, logged, logOut } = useContext(WindowContext);
    const [clicked, setClicked] = useState(false)
    const [alert, setAlert] = useState(false)

    const clickHandler = () => {
        setClicked(() => true)
    }

    const blurHandler = async ({ target : { value }}) => {

        if ((value.length <= 2) || (value.length >= 26) ) {
            setClicked(()=> false)
            renderAlert()
            return
        }

        if (sessionStorage.getItem("login")) {
            const response = await axios.patch(`https://testovoe-htc-middle-default-rtdb.firebaseio.com/users/${sessionStorage.getItem("login")}.json`, { name:value });
            sessionStorage.setItem("name", value);
        } else {
            const response = await axios.patch(`https://testovoe-htc-middle-default-rtdb.firebaseio.com/users/${localStorage.getItem("login")}.json`, { name:value });
            localStorage.setItem("name", value);
        }

        setClicked(()=> false)
    }

    const renderAlert = () => {
        setAlert(() => true)
        setTimeout(() => {
            setAlert(() => false)
        }, 3000)
    }

    return (
        <>
            {logged ? (
                <div className={ classes["user_interface-container"] }>
                    {clicked
                        ? <input type={"text"} onBlur={ blurHandler } autoFocus defaultValue={ localStorage.name ?? sessionStorage.name }/>
                        : <p className={ classes.username } onClick={ clickHandler }>{localStorage.name ?? sessionStorage.name}</p>}
                    <Button onClick={ logOut } transparent={ true }>Выйти</Button>
                    <Transition
                        in={alert}
                        timeout={1500}
                        mountOnEnter
                        unmountOnExit
                    >
                        { state => <div className={clsx( classes.alert, classes[state]) }>Пожалуйста, введите корректное имя пользователя. Оно должно содержать от 2 до 26 символов</div> }
                    </Transition>
                </div>
            ) : (
                <div className={ classes["user_interface-container"] }>
                    <p></p>
                    <Button onClick={ addModalWindow } transparent={ false }>Войти</Button>
                </div>
            )}
            {modal && ReactDOM.createPortal(
                <ModalWindow/>, document.getElementById("portal")
            )}
        </>
    );
};

export default UserInterface;
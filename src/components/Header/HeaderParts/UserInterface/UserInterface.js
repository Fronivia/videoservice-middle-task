import React, { useState, useContext } from 'react';
import ReactDOM from 'react-dom';
import axios from "axios";
import classes from './UserInterface.module.scss';
import Button from "../../../UI/Button/Button";
import ModalWindow from "../../../ModalWindow/ModalWindow";
import { WindowContext } from "../../../../store/windowContext/windowContext";
import Warning from "../../../UI/Warning/Warning";
import clsx from "clsx";

const UserInterface = ({Mobile}) => {
    const { modal, addModalWindow, logged, logOut } = useContext(WindowContext);
    const [clicked, setClicked] = useState(false);
    const [alert, setAlert] = useState(false);

    const clickHandler = () => {
        setClicked(() => true);
    };

    const blurHandler = async ({ target : { value }}) => {

        if ( (value.length <= 2) || (value.length >= 26) ) {
            setClicked(false);
            renderAlert();
            return;
        };

        if (sessionStorage.getItem("login")) {
            await axios.patch(
                `https://testovoe-htc-middle-default-rtdb.firebaseio.com/users/${sessionStorage.getItem("login"
                )}.json`, { name:value });
            sessionStorage.setItem("name", value);
        } else {
            await axios.patch(
                `https://testovoe-htc-middle-default-rtdb.firebaseio.com/users/${localStorage.getItem("login"
                )}.json`, { name:value });
            localStorage.setItem("name", value);
        }

        setClicked(false);
    };

    const renderAlert = () => {
        setAlert(true);
        setTimeout(() => {
            setAlert(false);
        }, 3000);
    };

    return (
        <>
            {logged ? (
                <div className={ clsx(classes["user_interface_container"], Mobile && classes.mobile) }>
                    {clicked ? (
                        <input
                            className={ classes["user_input"] }
                            type={"text"}
                            onBlur={ blurHandler }
                            autoFocus
                            defaultValue={ localStorage.name ?? sessionStorage.name }
                        />
                        ) : (
                            <p className={ classes.username } onClick={ clickHandler }>
                                {localStorage.name ?? sessionStorage.name}
                            </p>
                        )}
                    <Button
                        onClick={ logOut }
                        transparent={ true }
                        additionalClass={classes["logout_button"]}
                    >
                        Выйти
                    </Button>
                    <Warning toggle={alert}>
                        Пожалуйста, введите корректное имя пользователя. Оно должно содержать от 2 до 26 символов
                    </Warning>
                </div>
            ) : (
                <div className={ clsx(classes["user_interface_container"], Mobile && classes.mobile) }>
                    <Button
                        onClick={ addModalWindow }
                        transparent={ false }
                        additionalClass={
                            clsx(Mobile ? classes["mobile_login_button"] : classes["login_button"])
                        }
                    >
                        Войти
                    </Button>
                </div>
            )}
            {modal && ReactDOM.createPortal(
                <ModalWindow/>, document.getElementById("portal")
            )}
        </>
    );
};

export default UserInterface;
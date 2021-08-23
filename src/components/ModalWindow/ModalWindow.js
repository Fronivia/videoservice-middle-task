import React, { useState, useContext } from 'react';
import axios from "axios";
import classes from './ModalWindow.module.scss';
import Input from "../UI/Input/Input";
import Button from "../UI/Button/Button";
import {WindowContext} from "../../store/windowContext/windowContext";
import Warning from "../UI/Warning/Warning";


const ModalWindow = () => {

    const [alert, setAlert] = useState(false)
    const { removeModalWindow, logIn } = useContext(WindowContext);
    const [userInfo, setUserInfo] = useState({
        login: '',
        password: '',
        checked: false,
    })

    //Проверка введеного пароля и логина
    const authorizationHandler = async (event) => {
        event.preventDefault();
        let successfully = false;
        let data = await axios.get(
            "https://testovoe-htc-middle-default-rtdb.firebaseio.com/users/.json"
        ).then((result)=> result.data);
        for (let item in data) {
            if ( item === userInfo.login) {
                if (String(data[item].password) === userInfo.password) {
                    setUserData(data[item].name, userInfo.checked, item);
                    successfully = true
                }
            }
        };

        !successfully && renderAlert()
    };

    //Оповещение о неверно введеном пароле
    const renderAlert = () => {
        setAlert(true);
        setTimeout(() => {
            setAlert(false)
        }, 3000);
    };

    const loginHandler = ({ target }) => {
        const {value, name} = target
        setUserInfo((prev) =>({...prev,[name]:value}))
    }

    const checkboxHandler = ({ target }) => {
        setUserInfo((prev) => ({...prev, checked: target.checked}))
    }

    const setUserData = (name, checked, login) => {
        logIn(checked,name,login);
        removeModalWindow();
    }

    return (
        <>
            <div className={ classes["modal_window"] } onClick={ removeModalWindow }></div>
            <form className={ classes["modal_window_container"] }>
                <h2 className={ classes.title }>Вход</h2>
                <Input onChange={loginHandler} name={ "login" } type={"text"}>Логин</Input>
                <Input onChange={loginHandler} name={ "password" } type={"password"}>Пароль</Input>

                <label className={  classes.label }>
                    <input type="checkbox" className={ classes.checkbox } onChange={ checkboxHandler }/>
                    <span className={ classes.fake }></span>
                    <span className={ classes.text }>Запомнить</span>
                </label>
                <Button onClick={ authorizationHandler }>Войти</Button>
            </form>
            <Warning toggle={alert}>Вы неверно указали пароль или имя пользователя.</Warning>
        </>

    );
};

export default ModalWindow;
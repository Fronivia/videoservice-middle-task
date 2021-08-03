import React, { createContext, useReducer } from 'react'
import {reducer} from "../reducers/modalReducer";
export const WindowContext = createContext()

const initialState = {
    logged: localStorage.getItem("login") ?? sessionStorage.getItem("login") ?? false,
    modal:false
}

const WindowProvider = ({children}) => {
    const [modalWindow, dispatch] = useReducer(reducer, initialState)

    const removeModalWindow = () => {
        dispatch({type:'removeModalWindow'})
    }

    const addModalWindow = () => {
        dispatch({type:'addModalWindow'})
    }

    const logIn = (checked, name, login) => {
        if (checked){
            localStorage.setItem("name",name)
            localStorage.setItem("login", login)
        } else {
            sessionStorage.setItem("name", name)
            sessionStorage.setItem("login", login)
        }
        dispatch({type:'logIn', payload:login })
    }

    const logOut = () => {
        sessionStorage.removeItem("name");
        localStorage.removeItem("name");
        sessionStorage.removeItem("login");
        localStorage.removeItem("login");
        dispatch({type:'logOut'})
    }


    return (
        <WindowContext.Provider
            value = {{
                modal: modalWindow.modal,
                logged: modalWindow.logged,
                logIn,
                logOut,
                removeModalWindow,
                addModalWindow,

            }}
        >
            { children }
        </WindowContext.Provider>
    )
}

export default WindowProvider;
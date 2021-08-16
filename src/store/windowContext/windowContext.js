import React, { createContext, useReducer } from 'react'
import {reducer, searchReducer} from "../reducers/modalReducer";
export const WindowContext = createContext()

const initialState = {
    logged: localStorage.getItem("login") ?? sessionStorage.getItem("login") ?? false,
    modal:false
}

const WindowProvider = ({children}) => {
    const [modalWindow, dispatch] = useReducer(reducer, initialState);
    const [searchQuery, dispatchSearchQuery] = useReducer(searchReducer, "");

    const setQuery = (query) => {
        dispatchSearchQuery({type:"setQuery", payload: query})
    }

    const removeModalWindow = () => {
        dispatch({type:'removeModalWindow'});
        document.body.style.overflow = "auto";
    }

    const addModalWindow = () => {
        dispatch({type:'addModalWindow'});
        document.body.style.overflow = "hidden";
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
                searchQuery,
                setQuery,
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
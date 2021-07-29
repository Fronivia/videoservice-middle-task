import React, { createContext, useState } from 'react'
export const WindowContext = createContext()

const WindowProvider = ({children}) => {

    const [modalWindow, setModalWindow] = useState({
        logged: localStorage.getItem("login") ?? sessionStorage.getItem("login") ?? false,
        modal:false
    })

    const removeModalWindow = () => {
        setModalWindow((prev) => ({...prev, modal : false}))
    }

    const addModalWindow = () => {
        setModalWindow((prev) => ({...prev, modal : true}))
    }

    const logIn = () => {
        setModalWindow((prev) => ({...prev, logged : true}))
    }

    const logOut = () => {
        sessionStorage.removeItem("name");
        localStorage.removeItem("name");
        sessionStorage.removeItem("login");
        localStorage.removeItem("login");
        setModalWindow((prev) => ({...prev, logged : false}))
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
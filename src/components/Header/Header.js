import React, { useState, useEffect } from 'react';
import classes from './Header.module.scss';
import Logotype from "./HeaderParts/Logotype/Logotype";
import Searcher from "./HeaderParts/Searcher/Searcher";
import UserInterface from "./HeaderParts/UserInterface/UserInterface";
import MobileMenu from "./HeaderParts/MobileMenu/MobileMenu";
import clsx from "clsx";

const Header = () => {

    const [mobile, setMobile] = useState(false);

    const resizeHandler = () => {
        (document.documentElement.clientWidth <= 1260)
            ? setMobile(() => true)
            : setMobile(() => false);
    }

    useEffect(() =>{
        if (document.documentElement.clientWidth <= 1260) setMobile(() => true);
        window.addEventListener("resize", resizeHandler);
        return () => {
            window.removeEventListener("resize", resizeHandler);
        }
    },[]);

    return (
            <header className={ clsx(classes.header, mobile && classes.mobile) }>
                {mobile ? <MobileMenu/> : <>
                    <Logotype/>
                    <Searcher/>
                    <UserInterface/>
                </>}


            </header>

    )
}

export default Header;
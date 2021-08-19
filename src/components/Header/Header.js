import React, { useState, useEffect } from 'react';
import classes from './Header.module.scss';
import MobileMenu from "./HeaderParts/MobileMenu/MobileMenu";
import clsx from "clsx";
import PcMenu from "./HeaderParts/PcMenu/PcMenu";

const Header = () => {

    const [mobile, setMobile] = useState(false);

    const resizeHandler = () => {
        document.documentElement.clientWidth <= 1260 ? setMobile(true) : setMobile(false);
    };

    useEffect(() => {
        document.documentElement.clientWidth <= 1260 && setMobile(true);
        window.addEventListener("resize", resizeHandler);
        return () => {
            window.removeEventListener("resize", resizeHandler);
        }
    },[]);

    return (
        <header className={ clsx(classes.header, mobile && classes.mobile) }>
            { mobile ? <MobileMenu/> : <PcMenu/> }
        </header>
    );
};

export default Header;
import React from 'react'
import classes from './Header.module.scss'
import Logotype from "./HeaderParts/Logotype/Logotype";
import Searcher from "./HeaderParts/Searcher/Searcher";
import UserInterface from "./HeaderParts/UserInterface/UserInterface";

const Header = () => {

    return (
            <header className={ classes.header }>
                <Logotype/>
                <Searcher/>
                <UserInterface/>
            </header>

    )
}

export default Header;
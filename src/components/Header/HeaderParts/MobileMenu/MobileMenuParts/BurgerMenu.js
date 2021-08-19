import React, { useState } from 'react';
import classes from './BurgerMenu.module.scss';
import clsx from "clsx";
import UserInterface from "../../UserInterface/UserInterface";
import Searcher from "../../Searcher/Searcher";
import ReactDOM from "react-dom";

const BurgerMenu = () => {

    const [burgerMenu, setBurgerMenu] = useState(false);

    const burgerMenuHandler = () => {
        !burgerMenu ? setBurgerMenu(true) : setBurgerMenu(false);
    };

    return (
        <>
            <div
                className={ clsx(classes["Burger_menu_container"], burgerMenu && classes.rotated) }
                onClick={ burgerMenuHandler }
            >
                <span className={ classes["Burger_menu_line"] }/>
            </div>
            {burgerMenu &&
            <>
                {ReactDOM.createPortal(
                <div
                    className={ classes["burger_menu_background"] }
                    onClick={ burgerMenuHandler }
                />, document.getElementById("portal")
                )}
                <div className={ classes["menu_list"] }>
                    <div className={ classes["menu_list_item"] }><Searcher Mobile={true}/></div>
                    <div className={ classes["menu_list_item"] }><UserInterface Mobile={true}/></div>
                </div>
            </>
            }
        </>
    )
};

export default BurgerMenu;
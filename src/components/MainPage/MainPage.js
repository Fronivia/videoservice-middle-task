import React, {useRef} from 'react'
import classes from './MainPage.module.scss'
import Tabs from "../Tabs/Tabs";
import Films from "../Films/Films";
import TvChannels from "../TvChannels/TvChannels";

const MainPage = () => {
    const arr = [
        {tabName: "Фильмы", activeComponent: Films, ref: useRef()},
        {tabName: "Телеканалы", activeComponent: TvChannels, ref: useRef()}
    ]

    return (
        <main className={ classes["main_page"] }>
            <Tabs params={arr}/>
        </main>
    )
}

export default MainPage;
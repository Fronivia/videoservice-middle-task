import React from "react"
import classes from './App.module.scss';
import Header from "./components/Header/Header";
import Tabs from "./components/Tabs/Tabs";
import Films from "./components/Films/Films";
import Footer from "./components/Footer/Footer";
import TvChannels from "./components/TvChannels/TvChannels";

function App() {
    const arr = [
        {tabName:"Фильмы", activeComponent: <Films/>},
        {tabName:"Телеканалы", activeComponent: <TvChannels/>}
    ]
    return (
        <div className={ classes.App }>
            <Header />
            <Tabs params={arr}/>
            {/*<Films/>*/}
            {/*<TvChannels/>*/}
            <Footer/>
        </div>
    );
}

export default App;

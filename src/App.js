import React, { useRef } from "react"
import { BrowserRouter, Route, Switch } from "react-router-dom";
import classes from './App.module.scss';
import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";
import MainPage from "./components/MainPage/MainPage";
import FilmSection from "./components/FilmSection/FilmSection";

function App() {

    return (
        <BrowserRouter>
            <div className={ classes.App }>
                <Header />
                <Switch>
                    <Route exact path="/" component={MainPage}/>
                    <Route path="/batman" component={FilmSection}/>
                </Switch>

                <Footer/>
            </div>
        </BrowserRouter>

    );
}

export default App;

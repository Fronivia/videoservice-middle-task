import React from "react"
import { BrowserRouter, Route, Switch } from "react-router-dom";
import classes from './App.module.scss';
import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";
import MainPage from "./components/MainPage/MainPage";
import FilmSection from "./components/FilmSection/FilmSection";
import WindowProvider from "./store/windowContext/windowContext";
import Search from "./components/Search/Search";

function App() {

    return (
        <BrowserRouter>
            <WindowProvider>
                <div className={ classes.App }>
                    <Header />
                    <Switch>
                        <Route exact path="/" component={MainPage}/>
                        <Route exact path="/search" component={Search}/>
                        <Route path="/:name" component={FilmSection}/>
                    </Switch>
                    <Footer/>
                </div>
            </WindowProvider>
        </BrowserRouter>

    );
}

export default App;

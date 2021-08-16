import React from 'react';
import classes from './Footer.module.scss';

const Footer = () => {

    return (
        <footer className={ classes["footer-container"]}>
            <div className={ classes.footer }>
                <div className={ classes["footer-logotype"] }>
                    <img className={ classes["footer-logotype-img"] } src="/assets/Footer/htc-logo.svg" alt=""/>
                </div>
                <address className={ classes["footer-info"] }>
                    <p>426057, Россия, Удмуртская Республика, г. Ижевск, ул. Карла Маркса, 246 (ДК «Металлург»)</p>
                    <p className={ classes["footer-telephone"] }><a href={"tel:+7 (3412) 93-88-61"}>+7 (3412) 93-88-61</a>, <a href={"tel: 43-29-29"}>43-29-29</a></p>
                    <p><a className={ classes["footer-link"] } href={"https://htc-cs.ru/"}>htc-cs.ru</a></p>
                </address>
            </div>
        </footer>
    )
}

export default Footer;
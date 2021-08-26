import React from 'react';
import classes from './Footer.module.scss';

const Footer = () => (
    <footer className={ classes["footer_container"]}>
        <div className={ classes.footer }>
            <div className={ classes["footer_logotype"] }>
                <img className={ classes["footer_logotype_img"] } src="/assets/Footer/htc-logo.svg" alt="htc logotype"/>
            </div>
            <address className={ classes["footer_info"] }>
                <p>
                    426057, Россия, Удмуртская Республика, г. Ижевск, ул. Карла Маркса, 246 (ДК «Металлург»)
                </p>
                <p className={ classes["footer_telephone"] }>
                    <a href={"tel:+7 (3412) 93-88-61"}>
                        +7 (3412) 93-88-61
                    </a>, <a href={"tel: 43-29-29"}>
                    43-29-29
                    </a>
                </p>
                <p>
                    <a className={ classes["footer_link"] } href={"https://htc-cs.ru/"}>htc-cs.ru</a>
                </p>
            </address>
        </div>
    </footer>
);

export default Footer;
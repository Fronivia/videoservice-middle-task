import React from 'react';
import classes from './Warning.module.scss';
import clsx from "clsx";
import {Transition} from "react-transition-group";

const Warning = ({children, toggle}) => (
    <Transition
        in={toggle}
        timeout={1500}
        mountOnEnter
        unmountOnExit
    >
        {state => <div className={ clsx(classes.alert, classes[state]) }>{children}</div>}
    </Transition>
);

export default Warning;
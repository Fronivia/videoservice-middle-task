import React, { useState } from 'react'
import clsx from "clsx";
import classes from './Tabs.module.scss'


const Tabs = ({params}) => {

    const [activeTab, setActiveTab] = useState(params[0]);

    const tabHandler = () => {
        return params.map(item => {
            return(
                <button onClick={ () => setActiveTab(item) } className={ clsx(classes.tab, activeTab.tabName === item.tabName ? classes["active-tab"] : false ) } key={item.tabName}>{item.tabName}</button>
            )
        })
    }

    return (
        <>
            {tabHandler()}
            {activeTab.activeComponent}
        </>
    )
}

export default Tabs;
import React, { useState, useEffect, useRef } from 'react';
import clsx from "clsx";
import classes from './Tabs.module.scss';


const Tabs = ({params}) => {
    //состояние активного таба
    const [activeTab, setActiveTab] = useState(params[0]);

    const activeLineRef = useRef();

    //рендерим табы
    const tabsRender = () => {
        return params.map(item => {
            return(
                <button
                    onClick={ () => setActiveTab(item) }
                    className={ clsx(classes.tab, activeTab.tabName === item.tabName ? classes["active-tab"] : false ) }
                    key={item.tabName}
                    ref={ item.ref }
                >
                    {item.tabName}
                </button>
            );
        });
    };

    useEffect(() => {
        let activeButton = activeTab.ref.current;
        let activeLine = activeLineRef.current;
        // Добавляем плавную анимацию для подчеркивания
        // при первом рендере не учитывает шрифт font-face, поэтому стоит заглушка
        if (!activeLine.style.width) {
            activeLine.style.left = `${activeButton.offsetLeft}px`;
            activeLine.style.width = `${116}px`;
            return
        }
        activeLine.style.left = `${activeButton.offsetLeft}px`;
        activeLine.style.width = `${activeButton.offsetWidth}px`;
    })

    return (
        <>
            <div className={ classes["tab_container"] }>
                {tabsRender()}
                <div className={ classes["active_line"] } ref={activeLineRef}></div>
            </div>
            <activeTab.activeComponent/>
        </>
    );
};

export default Tabs;
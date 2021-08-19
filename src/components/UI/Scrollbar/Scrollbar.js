import React, { useState, useRef, useEffect } from 'react';
import classes from './Scrollbar.module.scss';
import clsx from "clsx";

const Scrollbar = (props) => {

    //состояние по которому смотрим нужно ли рендерить скролбар или нет
    const [renderScroll, setRenderScroll] = useState(true);

    const contentRef = useRef();
    const scrollerRef = useRef();
    const thumbRef = useRef();
    const childrenWrapperRef = useRef();
    let startMousePosition;

    //функция. при вызове которой получаем информацию об элементах
    const createPositions = () => ({
        content : contentRef.current,
        scroller : scrollerRef.current,
        thumb : thumbRef.current,
        step : 50,
        get contentHeight() {
            return this.content.offsetHeight;
        },
        get contentScrollHeight(){
            return this.content.scrollHeight;
        },
        get contentScrolledLength(){
            return this.content.scrollTop;
        },
        get contentMaxScroll(){
            return this.contentScrollHeight - this.contentHeight;
        },
        // на случай если будут отступы
        get scrollerPaddingTop(){
            return parseInt(window.getComputedStyle(this.scroller).getPropertyValue("padding-top"));
        },
        get scrollerPaddingBottom(){
            return parseInt(window.getComputedStyle(this.scroller).getPropertyValue("padding-bottom"));
        },
        get scrollerHeight(){
            return this.scroller.offsetHeight - this.scrollerPaddingTop - this.scrollerPaddingTop;
        },
        get thumbHeight(){
            return this.thumb.offsetHeight;
        },
        get scrollbarMaxScroll(){
            return this.scrollerHeight - this.thumbHeight;
        },
        get ratio(){
            return (this.contentScrollHeight - this.contentHeight) / this.scrollbarMaxScroll;
        }
    });

    // обработчик колесика мышки
    const wheelHandler = (event) => {
        event.preventDefault();

        let { content, contentMaxScroll, contentScrolledLength, step, thumb, ratio, scrollbarMaxScroll} = createPositions();
        if (event.deltaY < 0) { // вверх
            if (contentScrolledLength - step < 0 ){
                content.scrollTop = 0;
                thumb.style.top = `${0}px`;
            } else { // вниз
                content.scrollBy(0, -step);
                thumb.style.top = `${(contentScrolledLength - step)/ratio}px`;
            }
        } else {
            if (contentScrolledLength + step > contentMaxScroll ) {
                content.scrollTop = contentMaxScroll;
                thumb.style.top = `${scrollbarMaxScroll}px`;
            } else {
                content.scrollBy(0, step);
                thumb.style.top = `${(contentScrolledLength+step)/ratio}px`;
            }
        }
    };

    //обработчик клика мышки по ползунку
    const mouseDownHandler = (event) => {
        const { thumb } = createPositions();
        startMousePosition = event.pageY;
        startMousePosition += -(thumb.offsetTop);
        document.body.style.userSelect = "none";

        window.addEventListener('mousemove', mouseMoveHandler);
        window.addEventListener('mouseup', mouseUpHandler);
    };

    //обработчик движения мышки при зажатом клике на ползунке
    const mouseMoveHandler = (event) => {
        const { content, thumb, scrollbarMaxScroll, contentMaxScroll, ratio, contentScrolledLength } = createPositions();
        const { clientY: mousePositionY } = event;
        const thumbPosition = mousePositionY - startMousePosition;

        if (thumbPosition <= 0) {
            thumb.style.top = '0px';
            content.scrollTop = 0;
        } else if (thumbPosition >= scrollbarMaxScroll) {
            thumb.style.top = `${scrollbarMaxScroll}px`;
            content.scrollTop = contentMaxScroll;
        } else {
            thumb.style.top = `${thumbPosition}px`;
            content.scrollBy(0, thumbPosition * ratio - contentScrolledLength);
        }
    };

    //обработчик события, когда пользователь отпускает ползунок
    const mouseUpHandler = () => {
        document.body.style.userSelect = "text";
        window.removeEventListener('mousemove', mouseMoveHandler);
        window.removeEventListener('mouseup', mouseUpHandler);
    };

    //обработчик события, когда пользователь кликает по скроллеру.
    //Ползунок центрируется по месту, куда кликнул пользователь или на максимально допустимое расстояние
    const scrollerClickHandler = (event) => {
        const { content, contentMaxScroll, thumb, thumbHeight, scrollbarMaxScroll, ratio } = createPositions();

        if (event.target === thumb) return;

        const offsetTop = getCoords(content);
        const newThumbLocation = event.pageY - offsetTop  - thumbHeight/2;

        if (newThumbLocation < 0) {
            thumb.style.top = `${0}px`;
            content.scrollTop = 0;
        } else if (newThumbLocation > scrollbarMaxScroll) {
            thumb.style.top = `${ scrollbarMaxScroll }px`;
            content.scrollTop = contentMaxScroll;
        } else {
            thumb.style.top = `${ newThumbLocation }px`;
            content.scrollTop = thumb.offsetTop * ratio;
        }
    };

    //функция для подсчета куда должен переместится ползунок при клике по скроллеру
    const getCoords = (elem) => {
        let { top } = elem.getBoundingClientRect();
        return top - window.pageYOffset;
    };

    //функция, которая проверят необходимость в рендере скроллбара
    const scrollbarCheckUp = () => {
        (contentRef.current?.offsetHeight < childrenWrapperRef.current?.offsetHeight)
            ? setRenderScroll(() => true)
            : setRenderScroll(() => false)
    }

    //при первом рендере проверяем надо ли рендерить скроллбар и вешаем/удаляем обработчики событий
    useEffect(() => {
        if (renderScroll) contentRef.current.addEventListener('wheel', wheelHandler);
        scrollbarCheckUp()
        return () => {
                contentRef.current?.removeEventListener('wheel', wheelHandler)
        }
    },[renderScroll]);


    if ( renderScroll) {
        return (
            <div className={ classes.viewport }>
                <div className={ classes.content } ref={ contentRef } style={{height:props.height}}>
                    <div className={ classes["children-wrapper"] } ref={ childrenWrapperRef }>
                        {props.children}
                    </div>
                </div>
                    <div
                        className={ clsx(classes.scroller, props.showScroller && classes["invisible-scroller"]) }
                        ref={ scrollerRef }
                        onClick={ scrollerClickHandler }
                    >
                        <div
                            className={ clsx(classes.thumb, props.showScroller && classes["film_thumb"]) }
                            ref={ thumbRef }
                            onMouseDown={ mouseDownHandler }
                        />
                    </div>
            </div>
        )
    }

    return (
        <>
            {props.children}
        </>
    )
}

export default Scrollbar;
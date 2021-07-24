import React, { useRef, useEffect } from 'react'
import classes from './Scrollbar.module.scss'

const Scrollbar = (props) => {

    const contentRef = useRef();
    const scrollerRef = useRef();
    const thumbRef = useRef();
    const childrenWrapperRef = useRef();
    let mouse = {};

    const createPositions = () => {
        const positions = {
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
            get scrollerHeight(){
                return this.scroller.offsetHeight;
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
        }

        return positions;
    }

    const wheelHandler = (event) => {

        event.preventDefault();
        let { content, contentMaxScroll, contentScrolledLength, step, thumb, ratio, scrollbarMaxScroll} = createPositions();
        // вверх
        if (event.deltaY < 0) {
            if (contentScrolledLength - step < 0 ){
                content.scrollTop = 0;
                thumb.style.top = `${0}px`;
            } else {
                content.scrollBy(0, -step);
                thumb.style.top = `${(contentScrolledLength - step)/ratio}px`
            }

        } else {
            if (contentScrolledLength + step > contentMaxScroll ) {
                content.scrollTop = contentMaxScroll;
                thumb.style.top = `${scrollbarMaxScroll}px`;
            } else {
                content.scrollBy(0, step);
                thumb.style.top = `${(contentScrolledLength+step)/ratio}px`
            }
        }
    }

    const mouseDownHandler = (event) => {
        const { thumb } = createPositions()
        mouse = {
            startMousePosition: event.pageY,
        };
        mouse.startMousePosition += -(thumb.offsetTop);
        document.body.style.userSelect = "none";
        window.addEventListener('mousemove', mouseMoveHandler);
        window.addEventListener('mouseup', mouseUpHandler);
    }

    const mouseMoveHandler = (event) => {
        const { content, thumb, scrollbarMaxScroll, contentMaxScroll, ratio, contentScrolledLength } = createPositions();
        const { clientY: mousePositionY } = event;
        const thumbPosition = mousePositionY - mouse.startMousePosition;

        if (thumbPosition <= 0) {
            thumb.style.top = '0px';
            content.scrollTop = 0;
        } else if (thumbPosition >= scrollbarMaxScroll) {
            thumb.style.top = `${scrollbarMaxScroll}px`;
            content.scrollTop = contentMaxScroll;
        } else {
            thumb.style.top = `${thumbPosition}px`;
            content.scrollBy(0, thumbPosition * ratio - contentScrolledLength  );
        }
    }

    const mouseUpHandler = () => {
        document.body.style.userSelect = "text";
        window.removeEventListener('mousemove', mouseMoveHandler);
        window.removeEventListener('mouseup', mouseUpHandler);
    }

    const getCoords = (elem) => {
        let { top } = elem.getBoundingClientRect();
        return top - window.pageYOffset;
    }

    const scrollerClickHandler = (event) => {
        const { content, contentMaxScroll, thumb, thumbHeight, scrollbarMaxScroll, ratio } = createPositions();

        if (event.target === thumb ) return;

        const offsetTop = getCoords(content);
        const newThumbLocation = event.pageY - offsetTop  - thumbHeight/2;

        if ( newThumbLocation < 0 ) {
            thumb.style.top = `${0}px`;
            content.scrollTop = 0;
        } else if ( newThumbLocation > scrollbarMaxScroll ) {
            thumb.style.top = `${scrollbarMaxScroll}px`;
            content.scrollTop = contentMaxScroll;
        } else {
            thumb.style.top = `${newThumbLocation}px`;
            content.scrollTop = thumb.offsetTop * ratio;
        }
    };

    useEffect(() => {
        contentRef.current.addEventListener('wheel', wheelHandler);
    });


    return (
        <div className={ classes.viewport }>
            <div className={ classes.content } ref={ contentRef } style={{height:props.height}}>
                <div className={ classes["children-wrapper"] } ref={ childrenWrapperRef }>
                    {props.children}
                </div>
            </div>
            <div className={ classes.scroller } ref={ scrollerRef } onClick={ scrollerClickHandler }>
                <div className={ classes.thumb } ref={ thumbRef } onMouseDown={ mouseDownHandler }></div>
            </div>
        </div>
    )
}

export default Scrollbar;
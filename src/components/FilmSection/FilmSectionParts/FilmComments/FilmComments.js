import React, { useState, useRef, useContext } from 'react'
import axios from "axios";
import classes from './FilmComments.module.scss'
import Button from "../../../UI/Button/Button";
import Comment from "./Comment";
import {WindowContext} from "../../../../store/windowContext/windowContext";
import Warning from "../../../UI/Warning/Warning";

const FilmComments = ({params, url}) => {

    const {logged} = useContext(WindowContext)
    const [data, setData] = useState(null)
    const [alert, setAlert] = useState(false)
    const textAreaRef = useRef()

    const listRender = (params) => {
        const arr = []
         for (let key in params){
             arr.push(
                <Comment key={ key } params={params[key]} url={ url } elem={key}/>
            )
        }
         return arr.reverse()
    }

    const clickHandler = async (event) => {
        const textArea = textAreaRef.current
        if (textArea.value === "") return;

        event.target.disabled = true;

        await axios.post(`https://testovoe-htc-middle-default-rtdb.firebaseio.com/Films${url}/comments.json`, {
            text : textArea.value,
            name : (localStorage.getItem("name") ?? sessionStorage.getItem("name")),
            login : (localStorage.getItem("login") ?? sessionStorage.getItem("login"))
        })
        await loadData()
        textArea.value = ""
        event.target.disabled = false;
    }

    const loadData = async () => {
        const response = await axios.get(`https://testovoe-htc-middle-default-rtdb.firebaseio.com/Films${url}/comments.json`).then(
            r=> r.data,
            e=> e.name
        )
        setData(() => response)
    }

    const resizeArea = (target) => {
        //убираем строку. Если не появляется скроллинг, то повторяем пока не появится или не достигнем минимальной высоты
        target.rows -=1;
        console.log(target.scrollHeight)
        if (target.scrollHeight <= 110){ return }
        if (target.scrollHeight > target.offsetHeight){
            target.rows +=1;
            return
        }
        resizeArea(target)
    }

    // Растягиваем text area  зависимости от количества контента
    const resizeHandler = ({target}) =>{
        //Если появляется скроллинг, то добавляем строку пока он не исчезнет
        while (target.scrollHeight > target.offsetHeight) {
            target.rows +=1;
        }
        // После каждого изменения запускаем рекурсивную проверку на наличие свободного места
        if (target.offsetHeight >= target.scrollHeight &&  target.scrollHeight > 110) {
            resizeArea(target)
        }
    }

    const renderAlert = () => {
        setAlert(() => true)
        setTimeout(() => {
            setAlert(() => false)
        }, 3000)
    }

    return (
        <div className={ classes["comments-container"] }>
            <h2 className={ classes["comments_title"] }>Комментарии</h2>
            <div className={ classes.comments }>
                <textarea type="text" placeholder={ "Введите комментарий..." } onChange={ resizeHandler } ref={textAreaRef} disabled={logged ? false : true}/>
                <Button onClick={ logged ? clickHandler : renderAlert } disabled={ alert ? true : false}>Опубликовать</Button>
                <ul className={ classes["comments_list"] }>
                    {data ? listRender(data) : listRender(params)}
                </ul>
            </div>
            <Warning toggle={alert}>Для того, что бы оставить комментарий необходимо авторизоваться. Пожалуйста, войдите в аккаунт </Warning>
        </div>
    )
}

export default FilmComments;
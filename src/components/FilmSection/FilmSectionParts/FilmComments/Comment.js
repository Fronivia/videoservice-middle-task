import React,{ useState, useContext }  from 'react'
import axios from "axios";
import classes from './Comment.module.scss'
import {WindowContext} from "../../../../store/windowContext/windowContext";

const Comment = ({params, url, elem}) => {
    const {logged} = useContext(WindowContext)
    const [deleted, setDeleted] = useState(false)
    const verification = (logged === params.login)

    const clickHandler = async () => {
        await axios.delete(`https://testovoe-htc-middle-default-rtdb.firebaseio.com/Films${url}/comments/${elem}.json`)
        setDeleted(() => true)
    }

    return (
        <>
            {deleted || <li className={ classes.comment } >
                {verification
                    ? <button className={ classes.cross } onClick={ clickHandler }>
                        <img src="/assets/Films/cross.svg" alt="cross"/>
                    </button>
                    : false}
                <h3>{params.name}</h3>
                <p>{params.text}</p>
            </li> }
        </>
    )
}

export default Comment;
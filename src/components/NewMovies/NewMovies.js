import React from 'react'
import classes from './NewMovies.module.scss'
import MovieCard from "./NewMoviesParts/MovieCard";

const NewMovies = () => {

    const arr = [
        {title:"Мульт в кино. Выпуск №103. Некогда грустить!", imgLocation:"/assets/Films/catMovie.png", alt:"Мульт в кино", description:"В новом выпуске ми-ми-мишки изобретут машину сна, а Дракоша Тоша научит завязывать шнурки. Также зрители увидят новые серии мультфильмов «Четверо в кубе», «Лео и Тиг» и совершенно новый мультсериал «Снежная королева: Хранители чудес».", link:"cartoon-in-the-movie"},
        {title:"Новый Бэтмен", imgLocation:"/assets/Films/batmanMovie.png", alt:"Новый Бэтмен", description:"Бэтмен поднимает ставки в войне с криминалом. С помощью лейтенанта Джима Гордона и прокурора Харви Дента он намерен очистить улицы Готэма от преступности. Сотрудничество оказывается эффективным, но скоро они обнаружат себя посреди хаоса, развязанного восходящим криминальным гением, известным напуганным горожанам под именем Джокер.", link:"batman"},
        {title:"Однажды... в Голливуде", imgLocation:"/assets/Films/hollywoodMovie.png", alt:"Однажды... в Голливуде", description:"Фильм повествует о череде событий, произошедших в Голливуде в 1969 году, на закате его «золотого века». Известный актер Рик Далтон и его дублер Клифф Бут пытаются найти свое место в стремительно меняющемся мире киноиндустрии.", link:"Once-Upon-a-Time-in-Hollywood"},
        {title:"Стриптизерши", imgLocation:"/assets/Films/stripperMovie.png", alt:"Стриптизерши", description:"Танцовщицы элитного стриптиз-клуба, клиенты которого — известные финансисты с Уолл-Стрит, привыкли к большим заработкам и роскошной жизни. Но после финансового кризиса 2008 года посетителей в клубе заметно поубавилось, и деньги к девушкам уже не текут рекой. Тяжёлые времена требуют отчаянных мер, и бывшие танцовщицы решаются на авантюрный шаг.", link:"strippers"}
    ]

    const movieCardHandler = () => {
        return arr.map((item) => <MovieCard params={item} key={item.title}/>)
    }

    return (
        <>
            <h2 className={ classes["films-section"] }><img src="/assets/Films/fire.png" alt="fire_icon"/>Новинки</h2>
            <ul className={ classes["movies-list"] }>
                {movieCardHandler()}
            </ul>
        </>
    )
}

export default NewMovies;
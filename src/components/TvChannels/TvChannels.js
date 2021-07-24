import React, { useRef, useEffect} from 'react'
import classes from './TvChannels.module.scss'
import ChannelCard from "./TvChannelsParts/ChannelCard/ChannelCard";
import Scrollbar from "../UI/Scrollbar/Scrollbar";

const TvChannels = () => {

    const test = useRef()

    const arr = [
        {title:"Первый канал", imgLocation:"/assets/TvChannels/firstChannel.svg", firstShow:"Новости (с субтитрами)", firstShowTime:"13:00", secondShow:"Давай поженимся", secondShowTime:"14:00", thirdShow:"Другие новости", thirdShowTime:"15:00"},
        {title:"2x2", imgLocation:"/assets/TvChannels/2x2.svg", firstShow:"МУЛЬТ ТВ. Сезон 4, 7 серия", firstShowTime:"13:00", secondShow:"ПОДОЗРИТЕЛЬНАЯ СОВА. Сезон 7, 7 серия", secondShowTime:"14:00", thirdShow:"БУРДАШЕВ. Сезон 1, 20 серия", thirdShowTime:"15:00"},
        {title:"РБК", imgLocation:"/assets/TvChannels/rbc.svg", firstShow:"ДЕНЬ. Горючая смесь: как бороться с суррогатом на АЗС", firstShowTime:"13:00", secondShow:"ДЕНЬ. Главные темы", secondShowTime:"14:00", thirdShow:"Главные новости", thirdShowTime:"15:00"},
        {title:"AMEDIA PREMIUM", imgLocation:"/assets/TvChannels/amedia.svg", firstShow:"Клиент всегда мёртв", firstShowTime:"13:00", secondShow:"Голодные игры: Сойка-пересмешница. Часть I", secondShowTime:"14:00", thirdShow:"Секс в большом городе", thirdShowTime:"15:00"},
        {title:"AMEDIA PREMIUM", imgLocation:"/assets/TvChannels/amedia.svg", firstShow:"Клиент всегда мёртв", firstShowTime:"13:00", secondShow:"Голодные игры: Сойка-пересмешница. Часть I", secondShowTime:"14:00", thirdShow:"Секс в большом городе", thirdShowTime:"15:00"},
    ]

    const channelCardHandler = () => {
        return arr.map((item, index) => <ChannelCard params={ item } key={item.title + index}/>)
    }

    useEffect(() => {
        console.log(test.current.offsetHeight,'1')
        console.log(test.current.scrollHeight,'2')
    })

    return (

            <main className={ classes['channels-container'] } >
                <Scrollbar height={"696px"}>
                    <ul className={ classes["channels-list"] } ref={ test }>
                        {channelCardHandler()}
                    </ul>
                </Scrollbar>
            </main>
    )
}

export default TvChannels;
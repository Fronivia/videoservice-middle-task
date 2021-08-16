import React from 'react';
import classes from './ChannelCard.module.scss';

const ChannelCard = ({params}) => {

    return (
        <li className={ classes["channel-card"] }>
            <div className={ classes["channel_logotype-container"] }><img src={params.imgLocation} alt={params.title}/></div>
            <div className={ classes["channel-schedule"] }>
                <h3 className={ classes["channel-title"] }>{params.title}</h3>
                <ul className={ classes["channel-list"] }>
                    <li><span className={ classes["show-time"] }>{params.firstShowTime}</span>{params.firstShow}</li>
                    <li><span className={ classes["show-time"] }>{params.secondShowTime}</span>{params.secondShow}</li>
                    <li><span className={ classes["show-time"] }>{params.thirdShowTime}</span>{params.thirdShow}</li>
                </ul>
            </div>
        </li>
    )
}

export default ChannelCard;
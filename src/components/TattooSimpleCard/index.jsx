import React from "react";
import './style.css';
import heartIcon from '../../img/heart.png'
import heartFilledIcon from '../../img/heart.svg'

function TattooSimpleCard(props) {
    const title = props.title.length > 18 ? props.title.substring(0, 12) + "..." : props.title;

    return (
        <div className="simple-card">
            <img className="heart-icon" onClick={() => alert(props.id)} src={props.isFavorite ? heartIcon : heartFilledIcon} alt="" />
            <img className="tattoo-photo" src={props.tattooPhoto} alt="" />
            <p>{title}</p>
        </div>
    )
}

export default TattooSimpleCard
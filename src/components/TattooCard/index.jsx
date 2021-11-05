import React from "react";
import './style.css';
import heartIcon from '../../img/heart.png'
import heartFilledIcon from '../../img/heart.svg'

function TattooCard(props) {
    const title = props.title.length > 12 ? props.title.substring(0, 12) + "..." : props.title;

    return (
    <div className="card">
        <img className="heart-icon" onClick={() => alert(props.id)} src={props.isFavorite ? heartIcon : heartFilledIcon} alt=""/>
        <img className="tattoo-photo" src={props.tattooPhoto} alt=""/>
        <div className="row">
            <img className="tattoo-artist-photo" src={props.artistPhoto} alt=""/>
            <div className="description">
                <p>{title}</p>
                <p>{props.artistName}</p>
            </div>
        </div>
    </div>
    )
}

export default TattooCard
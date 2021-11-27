import React, { useState } from "react";
import './style.css';
import heartIcon from '../../img/heart.png'
import heartFilledIcon from '../../img/heart.svg'

function TattooSimpleCard(props) {
    let title = props.title;

    if (props.title !== undefined) {
        title = props.title.length > 18 ? props.title.substring(0, 12) + "..." : props.title;
    }

    const [tattooPhoto, setTattooPhoto] = useState(props.tattooPhoto);

    return (
        <div className="simple-card">
            <img className="heart-icon" onClick={() => alert(props.id)} src={props.isFavorite ? heartIcon : heartFilledIcon} alt="" />
            <img className="tattoo-photo" src={props.tattooPhoto.length > 500 ? `data:image/jpeg;base64,${tattooPhoto}` : props.tattooPhoto} alt="" />
            {title && 
                <p>{title}</p>
            }
        </div>
    )
}

export default TattooSimpleCard;
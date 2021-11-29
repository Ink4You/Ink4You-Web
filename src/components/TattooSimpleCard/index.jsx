import React, { useState } from "react";
import './style.css';
import instragramIcon from '../../img/instagramIcon.png';
import ink4youIcon from '../../img/logo.png';
// import heartIcon from '../../img/heart.png'
// import heartFilledIcon from '../../img/heart.svg'

function TattooSimpleCard(props) {
    const [tattooPhoto, setTattooPhoto] = useState(props.tattooPhoto);
    
    let title = props.title;

    if (props.title !== undefined) {
        title = props.title.length > 18 ? props.title.substring(0, 12) + "..." : props.title;
    }

    var icon;
    if (props.title) {
        icon = ink4youIcon;
    } else {
        icon = instragramIcon;
    }

    return (
        <div className="simple-card">
            {/* <img className="heart-icon" onClick={() => alert(props.id)} src={props.isFavorite ? heartIcon : heartFilledIcon} alt="" /> */}
            <img className="heart-icon" src={icon} alt="" />
            <img className="tattoo-photo" src={props.tattooPhoto.length > 500 ? `data:image/jpeg;base64,${tattooPhoto}` : props.tattooPhoto} alt="" />
            {title && 
                <p>{title}</p>
            }
        </div>
    )
}

export default TattooSimpleCard;
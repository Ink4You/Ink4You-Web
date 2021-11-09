import React from "react";
import './style.css';

function TattooArtistCard(props) {
    return (
        <div className="card">
            <img className="artist-photo" src={props.tattooPhoto} alt="" />
            <div className="description">
                <p className="artist-name">{props.artistName}</p>
            </div>
        </div>
    )
}

export default TattooArtistCard
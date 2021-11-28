import React from "react";
import { Link } from "react-router-dom";
import { Ratings } from '../../utils/Adapter';
import DOMPurify from 'dompurify';
import './style.css';

function TattooArtistCard(props) {
    const url = `/artistProfile/${props.id}`;

    return (
        <Link to={url} >
            <div className="card">
                <img className="artist-photo" src={props.artistPhoto} alt="Foto do tatuador" />
                <div className="card-description">
                    <p className="artist-name">{props.artistName}</p>
                    <span>{props.uf}</span>
                </div>
                <div className="avaliation" dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(Ratings(props.rating))}}></div>
            </div>
        </Link>
    )
}

export default TattooArtistCard
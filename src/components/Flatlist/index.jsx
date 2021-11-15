import React from "react";
import TattooCard from "../TattooCard";
import TattooSimpleCard from "../TattooSimpleCard";
import TattooArtistCard from "../TattooArtistCard";
import './style.css';

function Flatlist(props) {
  const data = props.data;

  return (
    <div className="flatlist">
      <p className="label">{props.label}</p>
      <div className="list-container" style={props.type === 'tattooSimple' ? {flexWrap: 'wrap', justifyContent: 'center'} : {}}>
        {props.type === 'tattoo' &&
          data.map((element) =>
            <TattooCard
              key={element.id}
              id={element.id}
              isFavorite={element.isFavorite}
              tattooPhoto={element.photo}
              artistPhoto={element.artistPhoto}
              title={element.title}
              artistName={element.artistName}
            />)}
        {props.type === 'tattooArtist' &&
          data.map((element) =>
            <TattooArtistCard
              key={element.id}
              id={element.id}
              tattooPhoto={element.photo}
              artistPhoto={element.artistPhoto}
              title={element.title}
              artistName={element.artistName}
            />)}
        {props.type === 'tattooSimple' &&
          data.map((element) =>
            <TattooSimpleCard
              key={element.id}
              id={element.id}
              tattooPhoto={element.photo}
              artistPhoto={element.artistPhoto}
              title={element.title}
              artistName={element.artistName}
            />)}
      </div>
    </div>
  );

}

export default Flatlist
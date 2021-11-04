import React from "react";
import TattooCard from "../TattooCard";
import './style.css';

function Flatlist(props) {
  const data = props.data;

  return (
    <>
      {props.type == 'tattoo' &&
        data.map((element) =>
          <TattooCard
            key={element.id}
            tattooPhoto={element.photo}
            artistPhoto={element.artistPhoto}
            title={element.title}
            artistName={element.artistName}
          />)}
    </>
  );

}

export default Flatlist
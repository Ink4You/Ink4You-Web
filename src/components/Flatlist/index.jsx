import React from "react";
import TattooCard from '../TattooCard';
import TattooSimpleCard from '../TattooSimpleCard';
import TattooArtistCard from '../TattooArtistCard';
import Comment from '../Comment'
import './style.css';

function Flatlist(props) {
  const data = props.data;
  console.log(data);
  return (
    <div className="flatlist">
      <p className="label">{props.label}</p>
      <div className="list-container" style={props.type === 'tattooSimple' ? { flexWrap: 'wrap', justifyContent: 'center' } : {}}>
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
              tattooPhoto={element.photo !== undefined ? element.photo : element.image_byte}
              artistPhoto={element.artistPhoto !== undefined ? element.artistPhoto : undefined}
              title={element.title !== undefined ? element.title : undefined}
              artistName={element.artistName !== undefined ? element.artistName : undefined}
            />)}
        {props.type === 'comment' &&
          data.map((element) =>
            <Comment
              key={element.id}
              id={element.id}
              userName={element.userName}
              userPhoto={element.userPhoto}
              comment={element.comment}
              commentDate={element.commentDate}
              ratting={element.ratting}
            />)}
      </div>
    </div>
  );
  
}

export default Flatlist
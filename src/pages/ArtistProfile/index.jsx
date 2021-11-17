import React from 'react';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import StarIcon from '../../img/star.svg';
import EditIcon from '../../img/edit-2.svg';
import MapPin from '../../img/map-pin.png';
import GoogleMapReact from 'google-map-react';
import Flatlist from '../../components/Flatlist';
import './style.css';

const AnyReactComponent = () => <div> <img src={MapPin} alt="" className="pin-img" /> </div>;
const profilePhoto = "http://hornettattoo.com.br/wp-content/uploads/2017/10/zhimpa_perfil-b-330x330.jpg"
const apiKey = "AIzaSyCW-lbUFoYzIdCo5n-7eFHkih5RbB03xHk";
const zoom = 11;
const center = {
    lat: -23.56,
    lng: -46.64
};

const testeCard = [{
    id: '1',
    photo: profilePhoto,
    title: "Tatuagem cachorro",
    artistPhoto: profilePhoto,
    artistName: "Bruno Matos"
},
{
    id: '2',
    photo: profilePhoto,
    title: "Tatuagem cachorro",
    artistPhoto: profilePhoto,
    artistName: "Bruno Matos"
},
{
    id: '3',
    photo: profilePhoto,
    title: "Tatuagem cachorro",
    artistPhoto: profilePhoto,
    artistName: "Bruno Matos"
},
{
    id: '4',
    photo: profilePhoto,
    title: "Tatuagem cachorro",
    artistPhoto: profilePhoto,
    artistName: "Bruno Matos"
},
{
    id: '5',
    photo: profilePhoto,
    title: "Tatuagem cachorro",
    artistPhoto: profilePhoto,
    artistName: "Bruno Matos"
},
{
    id: '6',
    photo: profilePhoto,
    title: "Tatuagem cachorro",
    artistPhoto: profilePhoto,
    artistName: "Bruno Matos"
},
{
    id: '7',
    photo: profilePhoto,
    title: "Tatuagem cachorro",
    artistPhoto: profilePhoto,
    artistName: "Bruno Matos"
},
{
    id: '8',
    photo: profilePhoto,
    title: "Tatuagem cachorro",
    artistPhoto: profilePhoto,
    artistName: "Bruno Matos"
}];

const testeComment = [{
    id: '1',
    userName: "Saulo Ferraz",
    comment: "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Quia, tempore, placeat numquam minima id dolorum quibusdam laborum ex, aliquam iusto in. Rem reiciendis repudiandae nisi, quasi asperiores molestiae repellendus error?",
    userPhoto: profilePhoto,
    commentDate: "31/07/2021",
    ratting: 1
},
{
    id: '2',
    userName: "Paulo Pinto",
    comment: "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Quia, tempore, placeat numquam minima id dolorum quibusdam laborum ex, aliquam iusto in. Rem reiciendis repudiandae nisi, quasi asperiores molestiae repellendus error?",
    userPhoto: profilePhoto,
    commentDate: "28/07/2021",
    ratting: 2
}];

function ArtistProfile() {
    return (
        <>
            <Header />
            <div className="profile-artist-container">
                <div className="profile-infos">
                    <div className="name-and-photo">
                        <p>Robson Lima</p>
                        <img src={profilePhoto} />
                        <div className="stars-row">
                            <img src={StarIcon} alt="" />
                            <img src={StarIcon} alt="" />
                            <img src={StarIcon} alt="" />
                            <img src={StarIcon} alt="" />
                            <img src={StarIcon} alt="" />
                        </div>
                    </div>
                    <div className="description">
                        <div className="instagram-row">
                            <p>@RobsonLima</p>
                        </div>
                        <p className="title-label">Estilos</p>
                        <p>Realismo, Aquarela e Tribal</p>
                        <p className="title-label">Sobre</p>
                        <p>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Itaque animi doloribus quisquam, dolor expedita beatae repellendus sunt atque modi delectus autem eius at commodi ut sed ratione quibusdam reiciendis. Ratione?</p>
                    </div>
                    <div className="location-infos">
                        <div className="location-row">
                            <p>Local - Av.Paulista, 1001 - 08140-125</p>
                            <div className="edit-button">
                                <img src={EditIcon} alt="" />
                            </div>
                        </div>
                        <div className="map">
                            <GoogleMapReact
                                bootstrapURLKeys={{ key: apiKey }}
                                defaultCenter={center}
                                defaultZoom={zoom}
                            >
                                <AnyReactComponent
                                    lat={-23.5677666}
                                    lng={-46.6487763}
                                />
                            </GoogleMapReact>
                        </div>
                    </div>
                </div>
                <Flatlist wrap={true} data={testeCard} type="tattooSimple" label="Destaques" />
                <Flatlist wrap={true} data={testeCard} type="tattooSimple" label="Tatuagens do Instagram" />
                <Flatlist data={testeComment} type="comment" label="Avaliações e feedbacks" />

                <Footer />
            </div>
        </>
    )
}

export default ArtistProfile
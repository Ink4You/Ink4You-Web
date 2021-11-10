import React from 'react';
import Header from "../../components/Header";
import StarIcon from "../../img/star.svg";
import './style.css';

const ProfilePhoto = "http://hornettattoo.com.br/wp-content/uploads/2017/10/zhimpa_perfil-b-330x330.jpg"

function ArtistProfile() {
    return (
        <>
            <Header />
            <div className="profile-artist-container">
                <div className="profile-infos">
                    <div className="name-and-photo">
                        <p>Robson Lima</p>
                        <img src={ProfilePhoto} />
                        <div className="stars-row">
                            <img src={StarIcon} alt="" />
                            <img src={StarIcon} alt="" />
                            <img src={StarIcon} alt="" />
                            <img src={StarIcon} alt="" />
                            <img src={StarIcon} alt="" />
                        </div>
                    </div>
                </div>
            </div>

        </>
    )
}

export default ArtistProfile
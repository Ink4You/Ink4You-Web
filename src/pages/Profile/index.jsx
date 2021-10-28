import React from 'react';
import Header from '../../components/Header';
import { Button } from '@material-ui/core';
import './style.css';

function Profile() {
    return (
        <>
            <Header />
            <section>
                <div className="profile-banner" />
                <div className="profile-div">
                    <div className="profile-img" />
                    <button
                        className="edit-profile-btn">
                        Editar Perfil
                    </button>
                </div>
                <div className="profile-information">
                    <p>Saulo Ferraz, 27</p>
                    <p>São Paulo - SP</p>
                </div>
                <div className="edit-profile">
                    
                </div>
            </section>
        </>
    );
}

export default Profile
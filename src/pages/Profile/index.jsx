import React from 'react';
import { useState } from 'react';
import Header from '../../components/Header';
import Input from '../../components/Input';
import Footer from '../../components/Footer';
import './style.css';

function Profile() {
    const dataUser = JSON.parse(localStorage.getItem('@dataUser'));
    const [showEditProfile, setShowEditProfile] = useState(false);
    const [name, setName] = useState(dataUser.nome)
    const [age, setAge] = useState(dataUser.data_nascimento)
    const link = "http://hornettattoo.com.br/wp-content/uploads/2017/10/zhimpa_perfil-b-330x330.jpg";

    if(showEditProfile) {
        document.documentElement.style.overflow = 'hidden';
    } else {
        document.documentElement.style.overflow = 'auto';
    }
    
    return (
        <>
            <Header />
            <section>
                <div className="profile-banner" />
                <div className="profile-div">
                    <img className="profile-img" style={{
                            marginLeft: showEditProfile ? 150 : 0,
                            width: showEditProfile ? 100 : 80,
                            height: showEditProfile ? 100 : 80}}
                        src={link}
                        alt="" />
                    <button
                        className="edit-profile-btn"
                        onClick={() => setShowEditProfile(!showEditProfile)}>
                        Editar Perfil
                    </button>
                </div>
                <div className="profile-information">
                    <p>{name}, {age}</p>
                    <p>São Paulo - SP</p>
                </div>
                <div className="edit-profile" style={{ left: showEditProfile ? 0 : -700 }}>
                    <div className="edit-profile-container">
                        <p>Edição de Perfil</p>
                        <Input text="Nome" value={name} />
                        <Input text="CPF" />
                        <Input text="Data nascimento" />
                        <Input text="Telefone" />
                        <Input text="Email" />
                        <Input text="Senha" />
                        <button
                            className="save-btn"
                            onClick={() => setShowEditProfile(!showEditProfile)}>
                            Salvar
                        </button>
                    </div>
                </div>
                <div className="container" style={{overflow: 'hidden'}}>
                    <div className="tattoo-list">
                    
                    </div>
                </div>
                <Footer />
            </section>
        </>
    );
}

export default Profile
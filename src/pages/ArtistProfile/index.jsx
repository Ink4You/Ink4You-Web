import React, { useState } from 'react';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import StarIcon from '../../img/star.png';
import EditIcon from '../../img/edit.png';
import MapPinIcon from '../../img/map-pin.png';
import GoogleMapReact from 'google-map-react';
import Flatlist from '../../components/Flatlist';
import Input from '../../components/Input';
import InstagramIcon from '../../img/instagramIcon.png';
import {testeCard, testeComment} from '../../utils/MockData'; // Dados usados para teste.
import { CepValidator, CnpjValidator, EmailValidator, NameValidator, PasswordValidator, PhoneValidator, InstagramAccountValidator } from '../../utils/Validator';
import './style.css';

const MapPin = () => <div> <img src={MapPinIcon} alt="" className="pin-img" /> </div>;
const apiKey = "AIzaSyCW-lbUFoYzIdCo5n-7eFHkih5RbB03xHk";
const zoom = 11;
const center = {lat: -23.56, lng: -46.64};

function ArtistProfile() {
    const [showEditProfile, setShowEditProfile] = useState(false);

    const dataUser = JSON.parse(localStorage.getItem('@dataUser'));
    const [name, setName] = useState(dataUser.nome);
    const [birthdayDate, setBirthdayDate] = useState(dataUser.data_nascimento.substring(0, 10));
    const [cnpj, setCnpj] = useState(dataUser.cnpj);
    const [cep, setCep] = useState(dataUser.cep);
    const [street, setStreet] = useState(dataUser.logradouro);
    const [streetNumber, setStreetNumber] = useState(dataUser.numero_logradouro);
    const [profilePhoto, setProfilePhoto] = useState(dataUser.foto_perfil);
    const [email, setEmail] = useState(dataUser.email);
    const [password, setPassword] = useState(dataUser.senha);
    const [instagramUsername, setInstagramUsername] = useState(dataUser.conta_instagram);
    const [phone, setPhone] = useState(dataUser.telefone);

    const [respInputName, setRespInputName] = useState(true);
    const [respInputCpfOrCnpj, setRespInputCpfOrCnpj] = useState(true);
    const [respInputBirthDate, setRespInputBirthDate] = useState(true);
    const [respInputPhone, setRespInputPhone] = useState(true);
    const [respInputCep, setRespInputCep] = useState(true);
    const [respInputEmail, setRespInputEmail] = useState(true);
    const [respInputPassword, setRespInputPassword] = useState(true);
    const [respInstagramUsername, setRespInstagramUsername] = useState(true);

    function ValidationStep() {
        let isValid = false;

        if (respInputName && respInputCpfOrCnpj && respInputBirthDate && respInputPhone
            && respInputCep && respInputEmail && respInputPassword && respInstagramUsername)
            isValid = true;

        return !isValid;
    }

    showEditProfile ? document.documentElement.style.overflow = 'hidden' : document.documentElement.style.overflow = 'auto';  // Travar scrool da tela quando o modal de edição estiver aberto.

    return (
        <>
            <Header />
            <div className="edit-profile" style={{ left: showEditProfile ? 0 : -700 }}>
                <div className="edit-profile-container">
                    <div className="edit-profile-container-row">
                        <img src={profilePhoto} alt="" srcset="" />
                        <p>Edição de Perfil</p>
                    </div>
                    <Input text="Nome"
                            onChange={e => setName(e.target.value)}
                            validate={name}
                            value={name} />
                        <div className="inputs-row">
                            <Input text="CNPJ"
                                marginRight={15}
                                onChange={e => setCnpj(e.target.value)}
                                value={cnpj}
                                validator={CnpjValidator}
                                validate={cnpj}
                                setRespValidation={setRespInputCpfOrCnpj} />
                            <Input text="Data nascimento"
                                type={"date"}
                                onChange={e => setBirthdayDate(e.target.value)}
                                value={birthdayDate}
                                validator={NameValidator}
                                validate={name}
                                setRespValidation={setRespInputEmail} />
                        </div>
                        <div className="inputs-row">
                            <Input text="CEP"
                                onChange={e => setCep(e.target.value)}
                                value={cep}
                                validator={CepValidator}
                                validate={cep}
                                setRespValidation={setRespInputCep} />
                            <Input text="Telefone"
                                marginLeft={15}
                                onChange={e => setPhone(e.target.value)}
                                value={phone}
                                validator={PhoneValidator}
                                validate={phone}
                                setRespValidation={setRespInputPhone} />
                        </div>
                        <div className="inputs-row">
                            <Input text="Email"
                                onChange={e => setEmail(e.target.value)}
                                value={email}
                                validator={EmailValidator}
                                validate={email}
                                setRespValidation={setRespInputEmail} />
                            <Input text="Senha"
                                marginLeft={15}
                                onChange={e => setPassword(e.target.value)}
                                value={password}
                                validator={PasswordValidator}
                                validate={password}
                                setRespValidation={setRespInputPassword} />
                        </div>
                        <div className="inputs-row">
                            <Input text="Instagram"
                                onChange={e => setInstagramUsername(e.target.value)}
                                value={instagramUsername}
                                validator={InstagramAccountValidator}
                                validate={instagramUsername}
                                setRespValidation={setRespInstagramUsername} />
                        </div>
                        <button
                            className="save-btn"
                            disabled={ValidationStep()}
                            // onClick={() => HandleEdit()}>
                           > Salvar
                        </button>
                  
                </div>
            </div>
            <div className="profile-artist-container">
                <div className="profile-infos">
                    <div className="name-and-photo">
                        <p>{name}</p>
                        <img src={profilePhoto} alt="" />
                        <div className="stars-row">
                            <img src={StarIcon} alt="" />
                            <img src={StarIcon} alt="" />
                            <img src={StarIcon} alt="" />
                            <img src={StarIcon} alt="" />
                            <img src={StarIcon} alt="" />
                        </div>
                    </div>
                    <div className="description">
                        <div className="instagram-row" onClick={() => window.location.href = `https://www.instagram.com/${instagramUsername}/`}>
                            <img src={InstagramIcon} alt="" />
                            <p className="instagram-user">{instagramUsername}</p>
                        </div>
                        <p className="title-label">Estilos</p>
                        <p>Realismo, Aquarela e Tribal</p>
                        <p className="title-label">Sobre</p>
                        <p>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Itaque animi doloribus quisquam, dolor expedita beatae repellendus sunt atque modi delectus autem eius at commodi ut sed ratione quibusdam reiciendis. Ratione?</p>
                    </div>
                    <div className="location-infos">
                        <div className="location-row">
                            <p>Local - {street}, {streetNumber} - {cep}</p>
                            <div className="edit-button" onClick={()=> setShowEditProfile(!showEditProfile)}>
                                <img src={EditIcon} alt="" />
                            </div>
                        </div>
                        <div className="map">
                            <GoogleMapReact
                                bootstrapURLKeys={{ key: apiKey }}
                                defaultCenter={center}
                                defaultZoom={zoom} >
                                <MapPin
                                    lat={-23.5677666}
                                    lng={-46.6487763} />
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

export default ArtistProfile;
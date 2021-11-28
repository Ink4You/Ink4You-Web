import React, { useState, useEffect } from 'react';
import LinearProgress from '@material-ui/core/LinearProgress';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import StarIcon from '../../img/star.png';
import EditIcon from '../../img/edit.png';
import PlusIcon from '../../img/plus.svg';
import RefreshIcon from '../../img/refresh.svg';
import MapPinIcon from '../../img/map-pin.png';
import GoogleMapReact from 'google-map-react';
import CircularLoading from '../../img/circularLoading.gif';
import Flatlist from '../../components/Flatlist';
import Input from '../../components/Input';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';
import { FormGroup, FormControlLabel, Switch } from '@material-ui/core';
import InstagramIcon from '../../img/instagramIcon.png';
import { apiKey, testeCard, testeComment, randomTatooImg } from '../../utils/MockData'; // Dados usados para teste.
import { CepValidator, CnpjValidator, EmailValidator, NameValidator, PasswordValidator, PhoneValidator, InstagramAccountValidator } from '../../utils/Validator';
import { InstagramImagesResponseToJson } from '../../utils/Adapter';
import api from '../../api';
import HandleCepAPI from '../../viaCep';
import GeocodingApi from '../../geocodingApi';
import './style.css';

function ArtistProfile() {
    const [isAdmin, setIsAdmin] = useState(false);
    const [showEditProfile, setShowEditProfile] = useState(false);
    const [showAddTattoo, setShowAddTattoo] = useState(false);
    const [updateStatus, setUpdateStatus] = useState(false);
    const [loading, setLoading] = useState(false);
    const [showSnack, setShowSnack] = useState(false);
    const [error, setError] = useState(false);

    const dataUser = JSON.parse(localStorage.getItem('@dataUser'));
    const [id, setId] = useState();
    const [name, setName] = useState();
    const [birthdayDate, setBirthdayDate] = useState();
    const [cnpj, setCnpj] = useState();
    const [cep, setCep] = useState();
    const [street, setStreet] = useState();
    const [streetNumber, setStreetNumber] = useState();
    const [profilePhoto, setProfilePhoto] = useState();
    const [aboutArtist, setAboutArtist] = useState();
    const [email, setEmail] = useState();
    const [password, setPassword] = useState();
    const [instagramIntegration, setInstagramIntegration] = useState();
    const [instagramUsername, setInstagramUsername] = useState();
    const [phone, setPhone] = useState();
    const userData = {
        "nome": name,
        "username": null,
        "data_nascimento": birthdayDate,
        "cnpj": cnpj,
        "cep": cep,
        "telefone": phone,
        "email": email,
        "senha": password,
        "conta_instagram": instagramUsername,
        "foto_perfil": "http://hornettattoo.com.br/wp-content/uploads/2017/10/zhimpa_perfil-b-330x330.jpg",
        "sobre": aboutArtist
    };

    const [respInputName, setRespInputName] = useState(true);
    const [respInputCpfOrCnpj, setRespInputCpfOrCnpj] = useState(true);
    const [respInputBirthDate, setRespInputBirthDate] = useState(true);
    const [respInputPhone, setRespInputPhone] = useState(true);
    const [respInputCep, setRespInputCep] = useState(true);
    const [respInputEmail, setRespInputEmail] = useState(true);
    const [respInputPassword, setRespInputPassword] = useState(true);
    const [respInstagramUsername, setRespInstagramUsername] = useState(true);
    const [pinCenter, setPinCenter] = useState({ lat: Number(localStorage.getItem('latitude')), lng: Number(localStorage.getItem('longitude')) });
    const [instagramImages, setInstagramImages] = useState([]);

    useEffect(() => {
        async function WorkAround() {
            await GeocodingApi(cep);
            setStreet(localStorage.getItem('logradouro'));
            setPinCenter({ lat: Number(localStorage.getItem('latitude')), lng: Number(localStorage.getItem('longitude')) });
            RenderMap();
        }
        WorkAround();
    }, [loading]);

    useEffect(() => {
        async function WorkAround2() {
            const instaImages = await GetInstagramImages(id);
            setInstagramImages(instaImages);
        }
        WorkAround2();
    }, [updateStatus]);

    useEffect(() => {
        GetArtistId();
    }, []);

    const MapPin = () => <div> <img src={MapPinIcon} alt="" className="pin-img" /> </div>;

    function GetArtistId() {
        const url = window.location.href.split('?');

        url[1] == dataUser.id_tatuador ? setIsAdmin(true) : setIsAdmin(false)

        if (url[1] !== undefined) {
            GetArtistInfos(url[1]);
        } else {
            GetArtistInfos(dataUser.id_tatuador);
        }
    }

    async function GetArtistInfos(id) {
        const { data } = await api.get(`/tatuadores/${id}`);

        setId(data.id_tatuador);
        setName(data.nome);
        setBirthdayDate(data.data_nascimento);
        setCnpj(data.cnpj);
        setCep(data.cep);
        setStreet(data.logradouro);
        setStreetNumber(data.numero_logradouro);
        setProfilePhoto(data.foto_perfil);
        setAboutArtist(data.sobre);
        setEmail(data.email);
        setPassword(data.senha);
        setInstagramIntegration(data.conta_instagram ? true : false);
        setInstagramUsername(data.conta_instagram);
        setPhone(data.telefone);

        GetInstagramImages(data.id_tatuador);

    }

    function ValidationStep() {
        let isValid = false;

        if (respInputName && respInputCpfOrCnpj && respInputBirthDate && respInputPhone
            && respInputCep && respInputEmail && respInputPassword && respInstagramUsername)
            isValid = true;

        return !isValid;
    }

    async function HandleEdit() {
        setLoading(true);
        try {
            const { data } = await api.put(`/tatuadores/${dataUser.id_tatuador}`, userData);
            if (dataUser.conta_instagram !== instagramUsername) {
                setUpdateStatus(true);
                UpdateInstagramImages();
            }
            localStorage.setItem('@dataUser', JSON.stringify(data));
            HandleCepAPI(data.cep);
            GeocodingApi(data.cep);
            setLoading(false);
            setShowEditProfile(false);
        } catch (error) {
            console.log(error);
            setError(true);
            setLoading(false);
        }
        setShowSnack(true);
    }

    showEditProfile || showAddTattoo ? document.documentElement.style.overflow = 'hidden' : document.documentElement.style.overflow = 'auto';  // Travar scrool da tela quando o modal de edição estiver aberto.

    const Alert = React.forwardRef(function Alert(props, ref) {
        return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
    });

    function handleClose(event, reason) {
        if (reason === 'clickaway') {
            return;
        }

        setShowSnack(false);
    };

    async function UpdateInstagramImages() {
        await api.get(`/instagram/atualizar-imagens/${id}`);
        setUpdateStatus(false);
    }

    async function GetInstagramImages(id) {
        const { data } = await api.get(`/instagram/${id}`);
        let dataFormated = InstagramImagesResponseToJson(data);
        setInstagramImages(dataFormated);
        return dataFormated;
    }

    function RenderMap() {
        return (
            <div className="map">
                <GoogleMapReact
                    bootstrapURLKeys={{ key: apiKey }}
                    defaultCenter={pinCenter}
                    defaultZoom={11} >
                    <MapPin
                        lat={pinCenter.lat}
                        lng={pinCenter.lng} />
                </GoogleMapReact>
            </div>
        )
    }

    return (
        <>
            {loading && <LinearProgress />}
            <Header />

            {/* MODAIS */}
            <div className="edit-profile" style={{ left: showEditProfile ? 0 : -700 }}>
                <div className="edit-profile-container" style={{ marginTop: loading ? 140 : 70 }}>
                    <div className="edit-profile-container-row">
                        <img src={profilePhoto} alt="" srcset="" />
                        <p>Edição de Perfil</p>
                    </div>
                    <Input text="Nome"
                        onChange={e => setName(e.target.value)}
                        value={name}
                        validator={NameValidator}
                        validate={name}
                        setRespValidation={setRespInputName} />
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
                        <div className="instagram-slider-button">
                            <p style={{ fontSize: 14, color: '#757575' }}>Integração com Instagram</p>
                            <FormGroup className="instagramSwitch">
                                <FormControlLabel control={
                                    <Switch
                                        checked={instagramIntegration}
                                        onChange={() => {
                                            setInstagramIntegration(!instagramIntegration)
                                        }}
                                    />
                                } label={
                                    <div className="instagramOptions">
                                        <p style={{ fontSize: 14 }}>{instagramIntegration ? 'Ativada' : 'Desativada'}</p>
                                    </div>
                                } />
                            </FormGroup>
                        </div>
                        <Input text="Instagram"
                            onChange={e => setInstagramUsername(e.target.value)}
                            value={instagramUsername}
                            disabled={!instagramIntegration}
                            validator={InstagramAccountValidator}
                            validate={instagramUsername}
                            setRespValidation={setRespInstagramUsername} />
                    </div>
                    <div className="inputs-column">
                        <label htmlFor="sobre">Sobre</label>
                        <textarea
                            onChange={e => setAboutArtist(e.target.value)}
                            value={aboutArtist}
                            placeholder="Conte-nos sobre você..."
                            id="sobre"
                            cols="30"
                            rows="10"></textarea>
                    </div>
                    <button
                        className="save-btn"
                        disabled={ValidationStep()}
                        onClick={() => HandleEdit()}>
                        Salvar
                    </button>
                </div>
            </div>

            <div className="add-tattoo" style={{ left: showAddTattoo ? 0 : -700 }}>
                <div className="add-tattoo-container" style={{ marginTop: loading ? 140 : 70 }}>
                    <div className="add-tattoo-container-row">
                        <img src={randomTatooImg} alt="" srcset="" />
                        <p>Adicionar Destaque</p>
                    </div>
                    <Input text="Título"
                        onChange={e => setName(e.target.value)}
                        value={name}
                        validator={NameValidator}
                        validate={name}
                        setRespValidation={setRespInputName} />
                    <Input text="Local"
                        onChange={e => setCnpj(e.target.value)}
                        value={cnpj}
                        validator={CnpjValidator}
                        validate={cnpj}
                        setRespValidation={setRespInputCpfOrCnpj} />
                    <Input text="SRC da Imagem"
                        onChange={e => setCnpj(e.target.value)}
                        value={cnpj}
                        validator={CnpjValidator}
                        validate={cnpj}
                        setRespValidation={setRespInputCpfOrCnpj} />
                    <button
                        className="save-btn"
                        disabled={ValidationStep()}
                        onClick={() => HandleEdit()}>
                        Salvar
                    </button>

                </div>
            </div>

            <div className="profile-artist-container">
                <div className="profile-infos">
                    <div className="name-and-photo">
                        <p>{name}</p>
                        {profilePhoto &&
                            <img src={profilePhoto} alt="" srcset="" />
                        }
                        {!profilePhoto &&
                            <div className="profile-avatar" alt="">
                                <p>{name !== undefined ? name[0].toUpperCase() : ''}</p>
                            </div>
                        }
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
                        <p>{aboutArtist}</p>
                    </div>
                    <div className="location-infos">
                        <div className="location-row">
                            <p>Local - {street}, {streetNumber} - {cep}</p>
                            {isAdmin &&
                                <div className="edit-button" onClick={() => {
                                    setShowAddTattoo(false);
                                    setShowEditProfile(!showEditProfile);
                                }}>
                                    <img src={EditIcon} alt="" />
                                </div>
                            }
                        </div>
                        {RenderMap()}
                    </div>
                </div>
                {isAdmin &&
                    <div className="new-tattoo-button" id="new-tattoo" onClick={() => {
                        setShowEditProfile(false);
                        setShowAddTattoo(!showAddTattoo);
                    }}>
                        <img src={PlusIcon} alt="" />
                    </div>
                }
                <Flatlist wrap={true} data={testeCard} type="tattooSimple" label="Destaques" />
                {(!updateStatus && isAdmin) &&
                    <div className="update-instagram-button" id="update-instagram-images" onClick={() => {
                        setUpdateStatus(true);
                        UpdateInstagramImages();
                    }}>
                        <img src={RefreshIcon} alt="" />
                    </div>
                }
                {updateStatus &&
                    <div className="circularProgress">
                        <img src={CircularLoading} alt="" />
                    </div>
                }
                {instagramUsername &&
                    <Flatlist wrap={true} data={instagramImages} type="tattooSimple" label="Tatuagens do Instagram" />
                }
                <Flatlist data={testeComment} type="comment" label="Avaliações e feedbacks" />
                <Snackbar open={showSnack}
                    autoHideDuration={6000}
                    onClose={handleClose}
                    anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}>
                    <Alert onClose={handleClose} severity={error ? "error" : "success"}>
                        {error ? "Erro ao editar perfil" : "Perfil editado com sucesso"}
                    </Alert>
                </Snackbar>
                <Footer />
            </div>
        </>
    )
}

export default ArtistProfile;
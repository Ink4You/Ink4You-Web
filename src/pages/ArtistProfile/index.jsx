import React, { useState, useEffect } from 'react';
import LinearProgress from '@material-ui/core/LinearProgress';
import { useHistory } from 'react-router-dom';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import DOMPurify from 'dompurify';
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
import { apiKey, testeCard, tattooListMocked, testeComment, randomTatooImg } from '../../utils/MockData'; // Dados usados para teste.
import { CepValidator, CnpjValidator, EmailValidator, NameValidator, PasswordValidator, PhoneValidator, InstagramAccountValidator } from '../../utils/Validator';
import { InstagramImagesResponseToJson, Ratings } from '../../utils/Adapter';
import api from '../../api';
import CamIcon from '../../img/camera.svg';
import HandleCepAPI from '../../viaCep';
import GeocodingApi from '../../geocodingApi';
import Swal from 'sweetalert2';
import './style.css';

function ArtistProfile() {
    const history = useHistory();
    const [isAdmin, setIsAdmin] = useState(false);
    const [showEditProfile, setShowEditProfile] = useState(false);
    const [showAddTattoo, setShowAddTattoo] = useState(false);
    const [updateStatus, setUpdateStatus] = useState(false);
    const [loading, setLoading] = useState(false);
    const [showSnack, setShowSnack] = useState(false);
    const [showSnack2, setShowSnack2] = useState(false);
    const [error, setError] = useState(false);

    const [dataUser, setDataUser] = useState('');
    const [id, setId] = useState(0);
    const [name, setName] = useState('...');
    const [birthdayDate, setBirthdayDate] = useState();
    const [cnpj, setCnpj] = useState();
    const [cep, setCep] = useState('...');
    const [street, setStreet] = useState('...');
    const [streetNumber, setStreetNumber] = useState('...');
    const [profilePhoto, setProfilePhoto] = useState();
    const [aboutArtist, setAboutArtist] = useState('...');
    const [email, setEmail] = useState();
    const [password, setPassword] = useState();
    const [instagramIntegration, setInstagramIntegration] = useState(false);
    const [instagramUsername, setInstagramUsername] = useState();
    const [phone, setPhone] = useState();
    const [artistRating, setArtistRating] = useState(0);
    const [tattooStylesData, setTattooStylesData] = useState([{}]);
    const [tattooArtistStyles, setTattooArtistStyles] = useState('...');
    const [stylesSelected, setStylesSelected] = useState([]);

    const [file, setFile] = useState();
    const [tattooTitle, setTattooTitle] = useState();
    const [tattooLocal, setTattooLocal] = useState();
    const [tattooList, setTattooList] = useState([]);

    const [respInputName, setRespInputName] = useState(true);
    const [respInputCpfOrCnpj, setRespInputCpfOrCnpj] = useState(true);
    const [respInputBirthDate, setRespInputBirthDate] = useState(true);
    const [respInputPhone, setRespInputPhone] = useState(true);
    const [respInputCep, setRespInputCep] = useState(true);
    const [respInputEmail, setRespInputEmail] = useState(true);
    const [respInputPassword, setRespInputPassword] = useState(true);
    const [respInstagramUsername, setRespInstagramUsername] = useState(true);
    const [instagramImages, setInstagramImages] = useState([]);
    const [pinCenter, setPinCenter] = useState({ lat: Number(localStorage.getItem('latitude')), lng: Number(localStorage.getItem('longitude')) });
    const [mapCenter, setMapCenter] = useState();

    useEffect(() => {
        async function WorkAround() {
            ValidateUser();
            GetTattooArtistRatings();
            GetTattooStyles();
            GetTattooArtistStyles();
        }
        WorkAround();
    }, []);

    useEffect(() => {
        async function WorkAround() {
            setMapCenter(pinCenter);
            RenderMap();
        }
        WorkAround();
    }, [pinCenter]);

    useEffect(() => {
        async function WorkAround() {
            await GeocodingApi(cep);
            setStreet(localStorage.getItem('logradouro'));
            setPinCenter({ lat: Number(localStorage.getItem('latitude')), lng: Number(localStorage.getItem('longitude')) });
            GetTattoos();
        }
        WorkAround();
    }, [loading]);

    useEffect(() => {
        async function WorkAround() {
            const instaImages = await GetInstagramImages(id);
            setInstagramImages(instaImages);
        }
        WorkAround();
    }, [updateStatus]);

    async function ValidateUser() {
        let id = window.location.href.split('?')[1];
        setId(id);

        // localstorage usado para contornar o problema de atualização do state
        localStorage.setItem('id_tatuador_aux', id);

        let data = JSON.parse(localStorage.getItem('@dataUser'));
        setDataUser(data);

        if (id !== undefined) {
            GetArtistInfos();
        } else {
            GetArtistInfos();
        }

        
        if (localStorage.getItem('@dataUser') == null) {
            // history.push('/');
            setIsAdmin(false);
            
        } else {
            
            if (id == data.id_tatuador) {
                setIsAdmin(true);
            } else {
                setIsAdmin(false);
            }

        }
    }

    async function GetArtistInfos() {
        const { data } = await api.get(`/tatuadores/${localStorage.getItem('id_tatuador_aux')}`);

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

        await GeocodingApi(data.cep);
        setPinCenter({ lat: Number(localStorage.getItem('latitude')), lng: Number(localStorage.getItem('longitude')) });

        GetInstagramImages(data.id_tatuador);
    }

    async function GetTattoos() {
        api.get(`/tatuagens/tatuador/${localStorage.getItem('id_tatuador_aux')}`).then((response) => {
            console.log(response.data);
            if (response.data.length > 0){
                setTattooList(response.data);   
            }
        });
    }

    async function GetTattooStyles() {
        console.log("buscando estilos");
        const { data } = await api.get(`/estilo`);
        setTattooStylesData(data);
    }

    async function GetTattooArtistStyles() {
        let stylesList = '';

        const { data } = await api.get(`/estilo-tatuador/id-tatuador/${localStorage.getItem('id_tatuador_aux')}`);

        if (data.length > 0) {
            data.map((element) => {
                stylesList += element.titulo + ", ";
            });

            setTattooArtistStyles(stylesList.slice(0, -2));
            uncheckStylesCheckbox();
            markStylesCheckbox(data);
        } else {
            setTattooArtistStyles('...');
        }

    }

    function markStylesCheckbox(data) {
        try {
            let checked = [];
            data.map((element) => {
                document.getElementById(element.id_estilo).checked = true;
                checked.push(element.id_estilo);
            });
    
            setStylesSelected(checked);
        } catch (error) {
            console.log(error);
        }
    }

    function uncheckStylesCheckbox(params) {
        let selecteds = document.getElementById("tattoo-styles").querySelectorAll("input[type='checkbox']");

        for (let index = 0; index < selecteds.length; index++) {
            selecteds[index].checked = false;
        }
    }

    async function GetTattooArtistRatings() {
        try {
            const { data } = await api.get(`/avaliacao/media/${localStorage.getItem('id_tatuador_aux')}`);
            setArtistRating(data);
        } catch (error) {
            console.log(error);
        }
    }

    async function HandleEdit() {
        setLoading(true);

        try {
            await HandleCepAPI(cep);

            const userData = {
                "nome": name,
                "username": null,
                "data_nascimento": birthdayDate,
                "cnpj": cnpj,
                "cep": cep,
                "logradouro": localStorage.getItem('logradouro'),
                "numero_logradouro": streetNumber,
                "telefone": phone,
                "email": email,
                "senha": password,
                "conta_instagram": instagramIntegration ? instagramUsername : null,
                "foto_perfil": null,
                "sobre": aboutArtist
            };

            const { data } = await api.put(`/tatuadores/${dataUser.id_tatuador}`, userData);
            await api.post(`/estilo-tatuador/atualiza-estilos/${id}`, stylesSelected);

            if (!instagramIntegration) {
                setInstagramUsername(null);
            }

            if (dataUser.conta_instagram !== instagramUsername && instagramUsername !== null) {
                setUpdateStatus(true);
                UpdateInstagramImages();
            }

            localStorage.setItem('@dataUser', JSON.stringify(data));
            HandleCepAPI(data.cep);
            GeocodingApi(data.cep);
            GetTattooArtistStyles();
            setLoading(false);
            setShowEditProfile(false);

        } catch (error) {
            console.log(error);
            setError(true);
            setLoading(false);

        }

        setShowSnack(true);
    }

    function HandleAddTattoo() {
        setLoading(true);

        const data = {
            "titulo": tattooTitle,
            "local_tatuagem": tattooLocal,
            "descricao": null,
            "src_imagem": null,
            "id_tatuador": id
        }

        api.post(`/tatuagens`, data).then((response) => {
            HandleAddTattooPhoto(response.data.id_tatuagem);
        });
    }

    async function HandleAddTattooPhoto(id) {
        let formData = new FormData();
        formData.append('file', file);
    
        try {
            await api.patch(`tatuagens/foto/${id}`, formData, {
                headers: {
                    "Content-type": "multipart/form-data",
                }
            });
            setShowAddTattoo(false);
        } catch (error) {
           setError(error); 
        } 
        
        await GetTattoos();
        setLoading(false);
        setShowSnack2(true);
    }

    function ValidationStep() {
        let isValid = false;

        if (respInputName && respInputCpfOrCnpj && respInputBirthDate && respInputPhone
            && respInputCep && respInputEmail && respInputPassword && respInstagramUsername)
            isValid = true;

        return !isValid;
    }

    async function GetInstagramImages(id) {
        const { data } = await api.get(`/instagram/${id}`);
        let dataFormated = InstagramImagesResponseToJson(data);
        setInstagramImages(dataFormated);
        console.log(dataFormated)
        return dataFormated;
    }

    function showConfirmDialog() {
        Swal.fire({
            title: 'Confirmar Atualização',
            text: "Deseja atualizar seu catálogo de fotos do Instagram?",
            icon: 'info',
            showCancelButton: true,
            confirmButtonText: 'Sim, atualizar fotos!',
            cancelButtonText: 'Não, cancelar',
            reverseButtons: true
        }).then((result) => {
            if (result.isConfirmed) {
                setUpdateStatus(true);
                UpdateInstagramImages();
                Swal.fire(
                    'Feito!',
                    'Seu catálogo de fotos está sendo atualizado!',
                    'success'
                )

            } else if (
                /* Read more about handling dismissals below */
                result.dismiss === Swal.DismissReason.cancel
            ) {
                Swal.fire(
                    'Cancelada',
                    'Volte quando quiser atualizar suas fotos :)',
                    'error'
                )
            }
        })
    }

    async function UpdateInstagramImages() {
        await api.get(`/instagram/atualizar-imagens/${id}`);
        setUpdateStatus(false);
    }

    showEditProfile || showAddTattoo ? document.documentElement.style.overflow = 'hidden' : document.documentElement.style.overflow = 'auto';  // Travar scrool da tela quando o modal de edição estiver aberto.

    const Alert = React.forwardRef(function Alert(props, ref) {
        return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
    });

    const MapPin = () => <div> <img src={MapPinIcon} alt="" className="pin-img" /> </div>;

    function handleClose(event, reason) {
        if (reason === 'clickaway') {
            return;
        }

        setShowSnack(false);
        setShowSnack2(false);
    };

    function RenderMap() {
        return (
            <div className="map">
                <GoogleMapReact
                    bootstrapURLKeys={{ key: apiKey }}
                    defaultCenter={mapCenter}
                    defaultZoom={8} >
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
                        {profilePhoto &&
                            <img src={`data:image/jpeg;base64,${profilePhoto}`} alt="" />
                        }
                        {!profilePhoto &&
                            <div className="profile-avatar" alt="">
                                <p>{name !== undefined ? name[0].toUpperCase() : ''}</p>
                            </div>
                        }
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
                            rows="10"
                            maxLength="240"></textarea>
                    </div>

                    <label>Estilos</label>
                    <div className="tattoo-styles" id="tattoo-styles">
                        {tattooStylesData.map((element) =>
                            <div className="tattoo-styles-row">
                                <input type="checkbox"
                                    id={element.id_estilo}
                                    onChange={(e) => {
                                        let tattooStylesSelected = stylesSelected;

                                        let value_included = tattooStylesSelected.includes(element.id_estilo);
                                        let is_checked = e.target.checked;

                                        if (value_included && !is_checked) {
                                            let position = tattooStylesSelected.indexOf(element.id_estilo);
                                            tattooStylesSelected.splice(position, 1);
                                        }

                                        if (!value_included && is_checked) {
                                            tattooStylesSelected.push(element.id_estilo);
                                        }

                                        setStylesSelected(tattooStylesSelected);
                                    }}
                                />
                                <p key={element.id_estilo}>
                                    {element.titulo}
                                </p>
                            </div>
                        )}
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
                    <div className="container-input">
                        <label htmlFor="file" title="Escolha a imagem">
                            <img src={CamIcon} alt="Adicionar imagem" />
                        </label>
                        <input
                            type="file"
                            name="file"
                            id="file"
                            accept="image/*"
                            onChange={(e) => setFile(e.target.files[0])}
                        />
                    </div>
                    <Input text="Título"
                        onChange={e => setTattooTitle(e.target.value)}
                        value={tattooTitle} />
                    <Input text="Local"
                        onChange={e => setTattooLocal(e.target.value)}
                        value={tattooLocal} />
                    <button
                        className="save-btn"
                        // disabled={ValidationStep()}
                        onClick={() => HandleAddTattoo()}>
                        Salvar
                    </button>

                </div>
            </div>

            <div className="profile-artist-container">
                <div className="profile-infos">
                    <div className="name-and-photo">
                        <p>{name}</p>
                        {profilePhoto &&
                            <img src={`data:image/jpeg;base64,${profilePhoto}`} alt="" />
                        }
                        {!profilePhoto &&
                            <div className="profile-avatar" alt="">
                                <p>{name !== undefined ? name[0].toUpperCase() : ''}</p>
                            </div>
                        }
                        <div className="stars-row" dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(Ratings(artistRating)) }}>
                        </div>
                    </div>

                    <div className="description">
                        {instagramUsername &&
                            <div className="instagram-row" onClick={() => window.location.href = `https://www.instagram.com/${instagramUsername}/`}>
                                <img src={InstagramIcon} alt="" />
                                <p className="instagram-user">{instagramUsername}</p>
                            </div>
                        }
                        <p className="title-label">Estilos</p>
                        <p>{tattooArtistStyles}</p>
                        <p className="title-label">Sobre</p>
                        <p id="title-label">{aboutArtist}</p>
                    </div>

                    <div className="location-infos">
                        <div className="location-row">
                            <p>Local - {street}, {streetNumber} - {cep}</p>
                            {isAdmin &&
                                <div className="edit-button" onClick={() => {
                                    window.scrollTo(0, 0);
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
                        window.scrollTo(0, 0);
                        setShowEditProfile(false);
                        setShowAddTattoo(!showAddTattoo);
                    }}>
                        <img src={PlusIcon} alt="" />
                    </div>
                }
                <Flatlist wrap={true} data={tattooList} type="tattooSimple" label="Destaques" />
                {(!updateStatus && isAdmin) &&
                    <div className="update-instagram-button" id="update-instagram-images" onClick={() => {
                        showConfirmDialog();
                    }}>
                        <img src={RefreshIcon} alt="" />
                    </div>
                }
                {updateStatus &&
                    <div className="circularProgress">
                        <img src={CircularLoading} alt="" />
                    </div>
                }
                {(instagramUsername && instagramImages.length > 0) &&
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

                <Snackbar open={showSnack2}
                    autoHideDuration={6000}
                    onClose={handleClose}
                    anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}>
                    <Alert onClose={handleClose} severity={error ? "error" : "success"}>
                        {error ? "Erro ao adicionar destaque" : "Destaque adicionado com sucesso"}
                    </Alert>
                </Snackbar>
                <Footer />
            </div>
        </>
    )
}

export default ArtistProfile;
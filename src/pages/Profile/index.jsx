import React from 'react';
import { useState, useEffect } from 'react';
import LinearProgress from '@material-ui/core/LinearProgress';
import Header from '../../components/Header';
import Input from '../../components/Input';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';
import Slide from '@material-ui/core/Slide';
import Footer from '../../components/Footer';
import api from '../../api';
import HandleCepAPI from '../../viaCep';
import './style.css';

function Profile() {
    const [showEditProfile, setShowEditProfile] = useState(false);
    const [loading, setLoading] = useState(false);
    const [showSnack, setShowSnack] = useState(false);
    const [error, setError] = useState(false);
    const [headerPosition, setHeaderPosition] = useState("fixed");

    const dataUser = JSON.parse(localStorage.getItem('@dataUser'));
    const [name, setName] = useState(dataUser.nome);
    const [cpf, setCpf] = useState(dataUser.cpf);
    const [age, setAge] = useState(18);
    const [birthdayDate, setBirthdayDate] = useState(dataUser.data_nascimento.substring(0, 10));
    const [cep, setCep] = useState(dataUser.cep);
    const [city, setCity] = useState(localStorage.getItem("cidade"));
    const [uf, setUf] = useState(localStorage.getItem("uf"));
    const [email, setEmail] = useState(dataUser.email);
    const [password, setPassword] = useState(dataUser.senha);
    const [profilePhoto, setProfilePhoto] = useState(dataUser.foto_perfil);
    const [phone, setPhone] = useState(dataUser.telefone);
    const userData = {
        "nome": name,
        "data_nascimento": birthdayDate,
        "cpf": cpf,
        "cep": cep,
        "telefone": phone,
        "email": email,
        "senha": password,
        "foto_perfil": profilePhoto
    };

    showEditProfile ? document.documentElement.style.overflow = 'hidden' : document.documentElement.style.overflow = 'auto';

    if (loading && headerPosition !== "relative") {
        setHeaderPosition("relative")
    }
    else if (!loading && headerPosition === "relative") {
        setHeaderPosition("fixed")
    }

    const Alert = React.forwardRef(function Alert(props, ref) {
        return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
    });

    function handleClose(event, reason) {
        if (reason === 'clickaway') {
            return;
        }

        setShowSnack(false);
    };

    function SlideTransition(props) {
        return <Slide {...props} direction="up" />;
    }

    async function HandleEdit() {
        setLoading(true);
        try {
            const { data } = await api.put(`/usuarios/${dataUser.id_usuario}`, userData);
            localStorage.setItem('@dataUser', JSON.stringify(data));
            HandleCepAPI(data.cep);
            setLoading(false);
            setShowEditProfile(false);
        } catch (error) {
            console.log(error);
            setError(true);
            setLoading(false);
        }
        setShowSnack(true);
    }

    useEffect(() => { setCity(localStorage.getItem("cidade")) }, [])

    return (
        <>
            {loading && <LinearProgress />}
            <Header position={headerPosition} />
            <section>
                <div className="profile-banner" style={{ height: loading ? "105px" : "170px" }} />
                <div className="profile-div">
                    <img className="profile-img" style={{
                        marginLeft: showEditProfile ? 150 : 0,
                        width: showEditProfile ? 100 : 80,
                        height: showEditProfile ? 100 : 80
                    }}
                        src={profilePhoto}
                        alt="" />
                    <button
                        className="edit-profile-btn"
                        onClick={() => setShowEditProfile(!showEditProfile)}>
                        Editar Perfil
                    </button>
                </div>
                <div className="profile-information">
                    <p>{name}, {age}</p>
                    <p>{city} - {uf}</p>
                </div>
                <div className="edit-profile" style={{ left: showEditProfile ? 0 : -700 }}>
                    <div className="edit-profile-container">
                        <p>Edição de Perfil</p>
                        <Input text="Nome"
                            onChange={e => setName(e.target.value)}
                            value={name} />
                        <Input text="CPF"
                            onChange={e => setCpf(e.target.value)}
                            value={cpf} />
                        <Input text="Data nascimento"
                            type={"date"}
                            onChange={e => setBirthdayDate(e.target.value)}
                            value={birthdayDate} />
                        <Input text="CEP"
                            onChange={e => setCep(e.target.value)}
                            value={cep} />
                        <Input text="Telefone"
                            onChange={e => setPhone(e.target.value)}
                            value={phone} />
                        <Input text="Email"
                            onChange={e => setEmail(e.target.value)}
                            value={email} />
                        <Input text="Senha"
                            onChange={e => setPassword(e.target.value)}
                            value={password} />
                        <button
                            className="save-btn"
                            disabled={loading}
                            onClick={() => HandleEdit()}>
                            Salvar
                        </button>
                    </div>
                </div>
                <div className="container" style={{ overflow: 'hidden' }}>
                    <div className="tattoo-list">
                    </div>
                </div>
                <Footer />
            </section>
            <Snackbar open={showSnack}
                autoHideDuration={6000}
                onClose={handleClose}
                TransitionComponent={SlideTransition}
                anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}>
                <Alert onClose={handleClose} severity={error ? "error" : "success"}>
                    {error ? "Erro ao editar perfil" : "Perfil editado com sucesso"}
                </Alert>
            </Snackbar>
        </>
    );
}

export default Profile
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
import Flatlist from '../../components/Flatlist';
import { testeCard } from '../../utils/MockData'; // Dados usados para teste.
// import TattooCard from '../../components/TattooCard';
import { CepValidator, CpfValidator, DateValidator, EmailValidator, NameValidator, PasswordValidator, PhoneValidator } from '../../utils/Validator';
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

    const [respInputName, setRespInputName] = useState(true);
    const [respInputCpfOrCnpj, setRespInputCpfOrCnpj] = useState(true);
    const [respInputBirthDate, setRespInputBirthDate] = useState(true);
    const [respInputPhone, setRespInputPhone] = useState(true);
    const [respInputCep, setRespInputCep] = useState(true);
    const [respInputEmail, setRespInputEmail] = useState(true);
    const [respInputPassword, setRespInputPassword] = useState(true);

    useEffect(() => {
        async function WorkAround() {
            setCity(localStorage.getItem('cidade'));
            setUf(localStorage.getItem('uf'));
        }
        WorkAround();
    }, [loading]);

    function ValidationStep() {
        let isValid = false;

        if (respInputName && respInputCpfOrCnpj && respInputBirthDate && respInputPhone
            && respInputCep && respInputEmail && respInputPassword)
            isValid = true;

        // inverte por conta do disabled do btn, se for invalido o disabled tem que receber true.
        return !isValid;
    }

    // Travar scrool da tela quando o modal de edição estiver aberto.
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

    async function HandleEdit() {
        setLoading(true);
        try {
            const { data } = await api.put(`/usuarios/${dataUser.id_usuario}`, userData);
            localStorage.setItem('@dataUser', JSON.stringify(data));
            await HandleCepAPI(cep);
            setLoading(false);
            setShowEditProfile(false);
        } catch (error) {
            console.log(error);
            setError(true);
            setLoading(false);
        }
        setShowSnack(true);
    }

    return (
        <>
            {loading && <LinearProgress />}
            <Header position={headerPosition} />
            <section>
                <div className="profile-banner" style={{ height: loading ? "105px" : "170px" }} />
                <div className="profile-div">
                    {profilePhoto &&
                        <img className="profile-img" style={{
                            marginLeft: showEditProfile ? 150 : 0,
                            width: showEditProfile ? 100 : 80,
                            height: showEditProfile ? 100 : 80
                        }}
                            src={profilePhoto}
                            alt="" />
                    }
                    {!profilePhoto &&
                        <div className="profile-avatar" id="profile-user-avatar" style={{
                            marginLeft: showEditProfile ? 150 : 0,
                            width: showEditProfile ? 100 : 80,
                            height: showEditProfile ? 100 : 80
                        }}>
                            <p>{dataUser.nome.slice(0, 1).toUpperCase()}</p>
                        </div>
                    }

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
                            validator={NameValidator}
                            validate={name}
                            setRespValidation={setRespInputName}
                            value={name} />
                        <div className="inputs-row">
                            <Input text="CPF"
                                marginRight={15}
                                onChange={e => setCpf(e.target.value)}
                                value={cpf}
                                validator={CpfValidator}
                                validate={cpf}
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
                        <button
                            className="save-btn"
                            disabled={ValidationStep()}
                            onClick={() => HandleEdit()}>
                            Salvar
                        </button>
                    </div>
                </div>
                <div className="profile-container">
                    <Flatlist data={testeCard} type="tattoo" label="Tatuagens favoritas" />
                    <Flatlist data={testeCard} type="tattooArtist" label="Tatuadores favoritos" />
                </div>
                <Footer />
            </section>
            <Snackbar open={showSnack}
                autoHideDuration={6000}
                onClose={handleClose}
                anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}>
                <Alert onClose={handleClose} severity={error ? "error" : "success"}>
                    {error ? "Erro ao editar perfil" : "Perfil editado com sucesso"}
                </Alert>
            </Snackbar>
        </>
    );
}

export default Profile
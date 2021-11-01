import React from 'react';
import { useState } from 'react';
import LinearProgress from '@material-ui/core/LinearProgress';
import Header from '../../components/Header';
import Input from '../../components/Input';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';
import Slide from '@material-ui/core/Slide';
import Footer from '../../components/Footer';
import './style.css';

function Profile() {
    const dataUser = JSON.parse(localStorage.getItem('@dataUser'));
    const [showEditProfile, setShowEditProfile] = useState(false);
    const [name, setName] = useState(dataUser.nome);
    const [age, setAge] = useState(dataUser.data_nascimento);
    const [loading, setLoading] = useState(false);
    const [showSnack, setShowSnack] = useState(false);
    const [error, setError] = useState(false);
    const [headerPosition, setHeaderPosition] = useState("fixed");
    const link = "http://hornettattoo.com.br/wp-content/uploads/2017/10/zhimpa_perfil-b-330x330.jpg";

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

    function HandleEdit() {
        setLoading(true)
        setTimeout(() => {
            setLoading(false);
            setShowEditProfile(false);
            setError(true);
            setShowSnack(true);
        }, 5000);
    }

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
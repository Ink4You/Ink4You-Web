import React, { useState } from 'react';
import './styles.css';
import '../../global.css';
import Input from '../../components/Input';
import InitialSideImage from '../../components/InitialSideImage';
import FormHeader from '../../components/FormHeader';
import { Button } from '@material-ui/core';
import { useHistory } from 'react-router-dom';
import api from '../../api';
import LinearProgress from '@material-ui/core/LinearProgress';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';
import Slide from '@material-ui/core/Slide';

function Alert(props) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
}

function Login() {
    const [step, setStep] = useState(0);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [erroAutentication, setErrorAutenticatin] = useState(false);
    const [loading, setLoading] = useState(false);
    const [open, setOpen] = React.useState(false);
    const history = useHistory();

    const Alert = React.forwardRef(function Alert(props, ref) {
        return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
    });

    const handleClick = () => {
        setOpen(true);
    };

    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }

        setOpen(false);
    };

    async function handleLogin() {
        setLoading(true);
        try {
            const { data } = await api.get(`/tatuadores/login/${email}/${password}`);
            localStorage.setItem('@dataUser', JSON.stringify(data));
            history.push('/Home');
        } catch (err) {
            setErrorAutenticatin(true);
            setTimeout(() => {
                setLoading(false);
                handleClick();
            }, 2000);
        }
    }

    function SlideTransition(props) {
        return <Slide {...props} direction="up" />;
    }

    function LoginStep() {
        return (
            <div className="form-container">
                <FormHeader text="Realizar Login" />

                <Input
                    text="Email"
                    onChange={e => setEmail(e.target.value)}
                />
                <Input
                    text="Senha"
                    onChange={e => setPassword(e.target.value)}
                />
                <div className="forgot-password">
                    <div onClick={() => setStep(1)}>
                        <p>Esqueci minha senha</p>
                    </div>
                </div>
                <Button
                    className="btn-primary"
                    variant="contained"
                    disableElevation
                    fullWidth
                    onClick={handleLogin}
                    disabled={loading}>
                    Entrar
                </Button>
                <div>
                    <p className="btn-text">Não tenho cadastro</p>
                </div>

            </div>
        )
    }

    function PasswordRecuperationStep() {
        return (
            <div className="form-container">
                <FormHeader text="Recuperar senha" description="Informe seu e-mail, e enviaremos um meio de recuperação de senha" />
                <Input
                    text="Email"
                />
                <Button
                    className="btn-primary"
                    variant="contained"
                    disableElevation
                    fullWidth>
                    Prosseguir
                </Button>
                <div onClick={() => setStep(0)}>
                    <p className="btn-text">Cancelar</p>
                </div>
            </div>
        )
    }

    return (
        <>
            {loading && <LinearProgress style={{
            
            }} />}
            <section className="container">
                <InitialSideImage phrase='“Procurando tattoo? Ink4you.”' />
                <section className="form">
                    {step === 0 && LoginStep()}
                    {step === 1 && PasswordRecuperationStep()}
                </section>
            </section>
            <Snackbar open={open}
                autoHideDuration={6000}
                onClose={handleClose}
                TransitionComponent={SlideTransition}
                anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}>
                <Alert onClose={handleClose} severity="error">
                    Email ou senha inválidos
                </Alert>
            </Snackbar>
        </>
    );
}

export default Login;
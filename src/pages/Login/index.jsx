import React, { useState } from 'react';

import './styles.css';
import '../../global.css';
import {
    OptionsLoginStep,
    LoginStep,
    PasswordRecuperationStep
} from './Steps';

import InitialSideImage from '../../components/InitialSideImage';
import { useHistory } from 'react-router-dom';
import UsersTypes from '../../components/EnumUserTypes';
import api from '../../api';
import LinearProgress from '@material-ui/core/LinearProgress';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';
import Slide from '@material-ui/core/Slide';


function Login() {
    const [step, setStep] = useState(0);
    const [accountState, setAccountState] = React.useState({
        userType: UsersTypes.USER,
        email: '',
        password: ''
    });
    const [loading, setLoading] = useState(false);
    const [errorAuthentication, setErrorAuthentication] = React.useState(false);
    const history = useHistory();

    const Alert = React.forwardRef(function Alert(props, ref) {
        return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
    });

    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }

        setErrorAuthentication(false);
    };

    async function HandleLogin() {
        setLoading(true);
        try {
            if (accountState.userType === UsersTypes.TATTOOARTIST) {
                const { data } = await api.get(`/tatuadores/login/${accountState.email}/${accountState.password}`);
                localStorage.setItem('@dataUser', JSON.stringify(data));
                history.push('/Home');
            } else {
                const { data } = await api.get(`/usuarios/login/${accountState.email}/${accountState.password}`);
                localStorage.setItem('@dataUser', JSON.stringify(data));
                history.push('/Home');
            }

        } catch (err) {
            setTimeout(() => {
                setLoading(false);
                setErrorAuthentication(true);
            }, 2000);
        }
    }

    function SlideTransition(props) {
        return <Slide {...props} direction="up" />;
    }

    return (
        <>
            {loading && <LinearProgress />}
            <section className="container">
                <InitialSideImage phrase='“Procurando tattoo? Ink4you.”' />
                <section className="form">
                    {step === 0 && <OptionsLoginStep
                        setAccountState={setAccountState}
                        setStep={setStep} />
                    }
                    {step === 1 && <LoginStep
                        accountState={accountState}
                        setAccountState={setAccountState}
                        setStep={setStep}
                        HandleLogin={HandleLogin}
                        loading={loading} />
                    }
                    {step === 2 && <PasswordRecuperationStep
                        setStep={setStep} />
                    }
                </section>
            </section>
            <Snackbar open={errorAuthentication}
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
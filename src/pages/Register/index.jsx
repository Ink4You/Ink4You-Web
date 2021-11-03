import React, { useState } from 'react';
import InitialSideImage from '../../components/InitialSideImage';
import FormHeader from '../../components/FormHeader';
import { Stepper, Step, StepButton } from '@material-ui/core';
import api from '../../api';
import HandleCepAPI from '../../viaCep';
import './styles.css';
import { PersonalInformationStep, LocationInformationStep, LoginInformationStep } from './Steps';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';
import Slide from '@material-ui/core/Slide';
import { useHistory } from 'react-router-dom';

function Register() {
    const [step, setStep] = useState(0);
    const [stoppedAtStep, setStoppedAtStep] = useState(0);
    const userType = localStorage.getItem('userType');
    const [accountState, setAccountState] = React.useState({ cep: '' });
    const [errorAuthentication, setErrorAuthentication] = useState('');
    const history = useHistory();

    const titleSteps = [
        'Seus dados',
        'Sua localização',
        'Sua conta'
    ];

    const nextStep = () => {
        setStep(step + 1);
    }
    const previousStep = async () => {
        setStep(step - 1);
    }

    async function HandleLogin() {
        if (userType === 'User') {
            setAccountState({
                ...accountState,
                foto_perfil: undefined
            })

            delete accountState.logradouro;
            delete accountState.numLogradouro;

            try {
                const { data } = await api.post('/usuarios/cadastro-usuario', accountState);
                localStorage.setItem('@dataUser', JSON.stringify(data));
                HandleCepAPI(accountState.cep);
                history.push('/home')
            } catch (err) {
                console.log(err);
                setErrorAuthentication('Erro ao realizar cadastro')
            }
        } else {
            console.log(accountState)
            try {
                await api.post('/tatuadores/cadastro-tatuador', accountState)
                    .then(response => {
                        console.log(response.data)
                        HandleCepAPI(accountState.cep);
                        history.push('/home')
                    })
            } catch (err) {
                console.log(err);
                setErrorAuthentication('Erro ao realizar cadastro')
            }
        }

    }

    const Alert = React.forwardRef(function Alert(props, ref) {
        return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
    });

    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }

        setErrorAuthentication(false);
    };

    function SlideTransition(props) {
        return <Slide {...props} direction="up" />;
    }

    async function handleCepAPI() {
        if (accountState.cep !== '') {


            try {
                await api.get(`https://viacep.com.br/ws/${accountState.cep}/json/`)
                    .then(response => {
                        if (response.data.erro) {
                            setErrorAuthentication('CEP inválido!')
                        } else {
                            fillAdressInputs(response.data)
                        }
                    })
            } catch (error) {
                setErrorAuthentication('Erro ao consultar CEP')
                console.log(error)
            }
        }
    }

    function fillAdressInputs(data) {
        if (userType === 'TattooArtist') {
            setAccountState({
                ...accountState,
                cep: data.cep.replace('-', ''),
                logradouro: data.logradouro,
                estado: data.uf,
                cidade: data.localidade
            })
        } else {
            setAccountState({
                ...accountState,
                cep: data.cep.replace('-', ''),
                logradouro: data.logradouro
            })
        }
    }

    return (
        <section className="container">
            <InitialSideImage phrase='“Procurando tattoo? Ink4you.”' />
            <section className="form">
                <div className="form-container">
                    <FormHeader text={titleSteps[step]} />
                    <Stepper style={{ backgroundColor: 'transparent' }} alternativeLabel activeStep={step}>
                        <Step>
                            <StepButton>Dados</StepButton>
                        </Step>
                        <Step>
                            <StepButton>Localização</StepButton>
                        </Step>
                        <Step>
                            <StepButton>Conta</StepButton>
                        </Step>
                    </Stepper>

                    {step === 0 && <PersonalInformationStep
                        userType={userType}
                        stoppedAtStep={stoppedAtStep}
                        setStoppedAtStep={setStoppedAtStep}
                        nextStep={nextStep}
                        previousStep={previousStep}
                        accountState={accountState}
                        setAccountState={setAccountState} />}

                    {step === 1 && <LocationInformationStep
                        userType={userType}
                        stoppedAtStep={stoppedAtStep}
                        setStoppedAtStep={setStoppedAtStep}
                        nextStep={nextStep}
                        previousStep={previousStep}
                        accountState={accountState}
                        setAccountState={setAccountState}
                        handleCepAPI={handleCepAPI}
                    />}

                    {step === 2 && <LoginInformationStep
                        userType={userType}
                        nextStep={nextStep}
                        previousStep={previousStep}
                        handleLogin={HandleLogin}
                        accountState={accountState}
                        setAccountState={setAccountState} />}

                    <Snackbar open={errorAuthentication}
                        autoHideDuration={3000}
                        onClose={handleClose}
                        TransitionComponent={SlideTransition}
                        anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}>
                        <Alert onClose={handleClose} severity="error">
                            {errorAuthentication}
                        </Alert>
                    </Snackbar>
                </div>
            </section>
        </section>

    );
}

export default Register;
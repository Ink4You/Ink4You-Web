import React, { useState } from 'react';
import InitialSideImage from '../../components/InitialSideImage';
import FormHeader from '../../components/FormHeader';
import Input from '../../components/Input';
import { Button, FormGroup, FormControlLabel, Switch, Stepper, Step, StepButton } from '@material-ui/core';
import InstagramIcon from '../../img/instagramIcon.png';
import UsersTypes from '../../components/EnumUserTypes';
import api from '../../api';
import './styles.css';


function Register() {
    const [step, setStep] = useState(0);

    const titleSteps = [
        'Antes...',
        'Seus dados',
        'Sua localização',
        'Seus conta'
    ];
    const [currentTitleStep, setCurrentTitleStep] = useState(titleSteps[0]);


    const nextStep = () => {
        if (step < 3) {
            setStep(step + 1);
            setCurrentTitleStep(titleSteps[step]);
        }
    }
    const previousStep = async () => {
        if (step > 0) {
            setStep(step - 1);
            setCurrentTitleStep(titleSteps[step -1]);
        }
    }


    const [userType, setUserType] = useState(0);
    const [instagramIntegration, setinstagramIntegration] = useState(false);

    // const users = {
    //     TATTOOARTIST: 'TattooArtist',
    //     USER: 'User'
    // }

    function handleApi(){
        console.log("Chamando api");
        const tatuadores = api.post("/tatuadores", );
        // console.log(tatuadores);
    }

    function UserTypeStep() {
        return (
            <div className="form-elements">
                <div className="buttons">
                    <Button
                        className="btn-primary"
                        variant="contained"
                        disableElevation
                        fullWidth
                        onClick={() => {
                            setUserType(UsersTypes.USER);
                            nextStep();
                        }}>
                        Quero me tatuar
                    </Button>
                    <Button
                        className="btn-primary"
                        variant="contained"
                        disableElevation
                        fullWidth
                        onClick={() => {
                            setUserType(UsersTypes.TATTOOARTIST);
                            nextStep();
                            handleApi();
                        }}>
                        Sou tatuador
                    </Button>
                </div>
                <div>
                    <p className="btn-text">Cancelar</p>
                </div>
            </div>
        )
    }

    function PersonalInformationStep() {
        return (
            <div className="form-elements">
                <Input text="Nome" />
                {userType === UsersTypes.TATTOOARTIST &&
                    <Input text="CNPJ" />
                }
                {userType === UsersTypes.USER &&
                    <>
                        <Input text="CPF" />
                        <Input text="Data nascimento" />
                    </>
                }
                <Input text="Telefone" />
                <Button
                    className="btn-primary"
                    variant="contained"
                    disableElevation
                    fullWidth
                    onClick={() => {
                        nextStep();
                    }}>
                    Prosseguir
                </Button>
                <div onClick={() => {
                    previousStep();
                }}>
                    <p className="btn-text">Voltar</p>
                </div>
            </div>
        );
    }

    function LocationInformationStep() {
        return (
            <div className="form-elements">
                <Input text="CEP" />
                {userType === UsersTypes.TATTOOARTIST &&
                    <Input
                        text="Cidade"
                        disabled={true}
                    />
                }
                <div className="smallButtonsContainer">
                    <Input
                        text="Endereço"
                        disabled={true}
                    />
                    <Input
                        text="N°"
                        marginLeft={15}
                        disabled={true}
                    />
                </div>
                <Button
                    className="btn-primary"
                    variant="contained"
                    disableElevation
                    fullWidth
                    onClick={() => {
                        nextStep();
                    }}>
                    Prosseguir
                </Button>
                <div onClick={() => {
                    previousStep();
                }}>
                    <p className="btn-text">Voltar</p>
                </div>
            </div>
        );
    }

    function LoginInformationStep() {
        return (
            <div className="form-elements">
                <Input text="Email" />
                {userType === UsersTypes.TATTOOARTIST &&
                    <>
                        <div className="smallButtonsContainer">
                            <Input
                                text="Senha"
                            />
                            <Input
                                text="Confir. senha"
                                marginLeft={15}
                            />
                        </div>

                        <div className="instagramContainer">

                            <FormGroup className="instagramSwitch">
                                <FormControlLabel control={
                                    <Switch
                                        checked={instagramIntegration}
                                        onChange={() => {
                                            setinstagramIntegration(!instagramIntegration)
                                        }}
                                    />
                                } label={
                                    <div className="instagramOptions">
                                        <img src={InstagramIcon} alt="Logo do instagram" />
                                        <span>Integração com instagram</span>
                                    </div>
                                } />
                            </FormGroup>

                            <Input
                                text="Usuário do instagram"
                                disabled={!instagramIntegration}
                            />
                        </div>
                    </>
                }
                {userType === UsersTypes.USER &&
                    <>
                        <Input
                            text="Senha"
                        />
                        <Input
                            text="Confirmar senha"
                        />
                    </>
                }
                <Button
                    className="btn-primary"
                    variant="contained"
                    disableElevation
                    fullWidth
                    onClick={() => {
                        nextStep();
                    }}>
                    Prosseguir
                </Button>
                <div onClick={() => {
                    previousStep();
                }}>
                    <p className="btn-text">Voltar</p>
                </div>
            </div>
        );
    }

    return (
        <section className="container">
            <InitialSideImage phrase='“Procurando tattoo? Ink4you.”' />
            <section className="form">
                <div className="form-container">
                    <FormHeader text={currentTitleStep} description={step === 0 ? "Conte-me sobre você" : ''} />
                    {step === 0 && UserTypeStep()}

                    {step > 0 &&
                        <Stepper alternativeLabel activeStep={step - 1}>
                            <Step>
                                <StepButton>Personal</StepButton>
                            </Step>
                            <Step>
                                <StepButton>Location</StepButton>
                            </Step>
                            <Step>
                                <StepButton>Account</StepButton>
                            </Step>
                        </Stepper>
                    }

                    {step === 1 && PersonalInformationStep()}
                    {step === 2 && LocationInformationStep()}
                    {step === 3 && LoginInformationStep()}
                </div>
            </section>
        </section>

    );
}

export default Register;
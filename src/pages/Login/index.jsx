import React, { useState } from 'react';
import './styles.css';
import '../../global.css';
import Input from '../../components/Input';
import InitialSideImage from '../../components/InitialSideImage';
import FormHeader from '../../components/FormHeader';
import { Button } from '@material-ui/core';

function Login() {
    const [step, setStep] = useState(0);

    return (
        <section className="container">
            <InitialSideImage phrase='“Procurando tattoo? Ink4you.”' />
            <section className="form">
                {step === 0 && LoginStep()}
                {step === 1 && PasswordRecuperationStep()}
            </section>
        </section>
    );

    function LoginStep() {
        return (
            <div className="form-container">
                <FormHeader text="Realizar Login" />

                <Input 
                    text="Email"
                />
                <Input 
                    text="Senha"
                />
                {/* <TextField
                    fullWidth
                    label="Email"
                    margin="normal" />
                <TextField
                    fullWidth
                    label="Senha"
                    margin="normal" /> */}
                <div className="forgot-password">
                    <div onClick={() => setStep(1)}>
                        <p>Esqueci minha senha</p>
                    </div>
                </div>
                <Button
                    className="btn-primary"
                    variant="contained"
                    disableElevation
                    fullWidth>
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
                {/* <TextField
                    fullWidth
                    label="Email"
                    margin="normal" /> */}
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
}

export default Login;
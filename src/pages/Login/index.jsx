import React from 'react';
import './styles.css';
import InitialSideImage from '../../components/InitialSideImage';
import FormHeader from '../../components/FormHeader';
import { TextField, Button } from '@material-ui/core';

function Login() {
    return (
        <section className="container">
            <InitialSideImage phrase='“Procurando tattoo? Ink4you.”'/>
            <section className="form">
                <div className="form-container">
                <FormHeader text="Realizar Login" />
                    <TextField 
                        fullWidth 
                        label="Email"  
                        margin="normal" />
                    <TextField 
                        fullWidth 
                        label="Senha" 
                        margin="normal" />
                    <div className="forgot-password">
                        <p>Esqueci minha senha</p>
                    </div>
                    <Button
                        className="btn-login"
                        variant="contained" 
                        disableElevation 
                        fullWidth>
                        Entrar
                    </Button>
                    <p className="btn-register">Não tenho cadastro</p>
                </div>
            </section>
        </section>
    );
}

export default Login;
import React from 'react';
import '../../global.css';
import InitialSideImage from '../../components/InitialSideImage';
import FormHeader from '../../components/FormHeader';
import { TextField, Button } from '@material-ui/core';

function PasswordRecuperation() {
    return (
        <section className="container">
            <InitialSideImage phrase='“Procurando tattoo? Ink4you.”'/>
            <section className="form">
                <div className="form-container">
                <FormHeader text="Recuperar senha" />
                <p>Informe seu e-mail, e enviaremos um meio de recuperação de senha:</p>
                    <TextField 
                        fullWidth 
                        label="Email"  
                        margin="normal" />
                    <Button
                        className="btn-login"
                        variant="contained" 
                        disableElevation 
                        fullWidth>
                        Prosseguir
                    </Button>
                    <p className="btn-register">Cancelar</p>
                </div>
            </section>
        </section>
    );
}

export default PasswordRecuperation;
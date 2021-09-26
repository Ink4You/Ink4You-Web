import React from 'react';
import '../../global.css';
import Input from '../../components/Input';
import InitialSideImage from '../../components/InitialSideImage';
import FormHeader from '../../components/FormHeader';
import { TextField, Button } from '@material-ui/core';

function PasswordRecuperation() {
    return (
        <section className="container">
            <InitialSideImage phrase='“Procurando tattoo? Ink4you.”'/>
            <section className="form">
                <div className="form-container">
                <FormHeader text="Recuperar senha" description="Preencha os campos abaixo para atualizar a sua senha!" />
                    <Input 
                        text="Senha"
                    />
                    <Input 
                        text="Confirmar senha"
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
                    <p className="btn-text">Cancelar</p>
                </div>
            </section>
        </section>
    );
}

export default PasswordRecuperation;
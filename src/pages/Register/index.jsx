import React from 'react';
import './styles.css';
import InitialSideImage from '../../components/InitialSideImage';
import FormHeader from '../../components/FormHeader';
import Input from '../../components/Input';
import { Button } from '@material-ui/core';

function Register() {
    return (
        <section className="container">
            <InitialSideImage phrase='“Procurando tattoo? Ink4you.”' />
            <section className="form">
                <div className="form-container">
                    <FormHeader text="Antes..." description="Conte-me sobre você" />
                    <div className="buttons">
                        <Button
                            className="btn-primary"
                            variant="contained"
                            disableElevation
                            fullWidth>
                            Quero me tatuar
                        </Button>
                        <Button
                            className="btn-primary"
                            variant="contained"
                            disableElevation
                            fullWidth>
                            Sou tatuador
                        </Button>
                    </div>
                    <div>
                        <p className="btn-text">Cancelar</p>
                    </div>
                </div>
            </section>
        </section>
    );
}

export default Register;
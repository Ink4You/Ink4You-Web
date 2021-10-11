import React, { useState } from 'react';
import './styles.css';
import '../../global.css';
import Input from '../../components/Input';
import InitialSideImage from '../../components/InitialSideImage';
import FormHeader from '../../components/FormHeader';
import { Button } from '@material-ui/core';
import { useHistory } from 'react-router-dom';
import api from '../../api';

function Login() {
    const [step, setStep] = useState(0);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [erroAutentication, setErrorAutenticatin] = useState(false);
    const history = useHistory();


    async function handleLogin(){
        try{
            const {data} = await api.get(`/tatuadores/login/${email}/${password}`);
            localStorage.setItem('@dataUser', JSON.stringify(data));
            history.push('/Home');
        }catch(err){
            setErrorAutenticatin(true);
        }
    }


    function LoginStep() {
        return (
            <div className="form-container">

                <FormHeader text="Realizar Login" />
                {erroAutentication && (
                    <span> usuario ou senha incorreto </span>
                )}

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
                    onClick={handleLogin}>
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
        <section className="container">
            <InitialSideImage phrase='“Procurando tattoo? Ink4you.”' />
            <section className="form">
                {step === 0 && LoginStep()}
                {step === 1 && PasswordRecuperationStep()}
            </section>
        </section>
    );
}

export default Login;
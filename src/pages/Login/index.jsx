import React, { useState } from 'react';
import './styles.css';
import '../../global.css';
import Input from '../../components/Input';
import InitialSideImage from '../../components/InitialSideImage';
import FormHeader from '../../components/FormHeader';
import { Button } from '@material-ui/core';
import { useHistory } from 'react-router-dom';
import UsersTypes from '../../components/EnumUserTypes';
import api from '../../api';

function Login() {
    const [step, setStep] = useState(0);
    const [userType, setUserType] = useState(0);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [erroAutentication, setErrorAutenticatin] = useState(false);
    const history = useHistory();


    async function handleLogin() {
        try {
            if(UsersTypes.TATTOOARTIST){
                const { data } = await api.get(`/tatuadores/login/${email}/${password}`);
                localStorage.setItem('@dataUser', JSON.stringify(data));
                history.push('/Home');
            }else{
                const { data } = await api.get(`/usuarios/login/${email}/${password}`);
                localStorage.setItem('@dataUser', JSON.stringify(data));
                history.push('/Home');
            }
            
        } catch (err) {
            setErrorAutenticatin(true);
        }
    }


    function OptionsLoginStep() {
        return (
            <div className="form-container">
                <FormHeader text="Selecione uma opção" />

                <div>
                    <Button
                        className="btn-primary"
                        variant="contained"
                        disableElevation
                        fullWidth
                        onClick={() => {
                            setUserType(UsersTypes.USER);
                            setStep(1);
                        }}>
                        Sou usuário
                    </Button>
                    <Button
                        className="btn-primary"
                        variant="contained"
                        disableElevation
                        fullWidth
                        onClick={() => {
                            setUserType(UsersTypes.TATTOOARTIST);
                            setStep(1);
                        }}>
                        Sou tatuador
                    </Button>
                </div>

            </div>

        );
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
                    type="email"
                    onChange={e => setEmail(e.target.value)}
                />
                <Input
                    text="Senha"
                    type="password"
                    onChange={e => setPassword(e.target.value)}
                />
                <div className="forgot-password">
                    <div onClick={() => setStep(2)}>
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
                    type="email"
                />
                <Button
                    className="btn-primary"
                    variant="contained"
                    disableElevation
                    fullWidth>
                    Prosseguir
                </Button>
                <div onClick={() => setStep(1)}>
                    <p className="btn-text">Cancelar</p>
                </div>
            </div>
        )
    }

    return (
        <section className="container">
            <InitialSideImage phrase='“Procurando tattoo? Ink4you.”' />
            <section className="form">
                {step === 0 && OptionsLoginStep()}
                {step === 1 && LoginStep()}
                {step === 2 && PasswordRecuperationStep()}
            </section>
        </section>
    );
}

export default Login;
import React, { useState } from 'react';
import '../styles.css';
import '../../../global.css';
import { useHistory } from 'react-router-dom';
import Input from '../../../components/Input';
import FormHeader from '../../../components/FormHeader';
import { Button } from '@material-ui/core';
import UsersTypes from '../../../components/EnumUserTypes';
import { EmailValidator, PasswordValidator } from '../../../utils/Validator';

function saveUserType(type) {
    localStorage.setItem('userType', type);
}

export function OptionsLoginStep(props) {
    const history = useHistory();
    return (
        <div className="form-container">
            <FormHeader text="Olá ;)" description="Selecione uma opção:" />
            <div>
                <Button
                    className="btn-primary"
                    variant="contained"
                    disableElevation
                    fullWidth
                    onClick={() => {
                        props.setAccountState({
                            userType: UsersTypes.USER
                        });
                        props.setStep(1);
                        saveUserType('User');
                    }}>
                    Sou usuário
                </Button>
                <Button
                    className="btn-primary"
                    variant="contained"
                    disableElevation
                    fullWidth
                    onClick={() => {
                        props.setAccountState({
                            userType: UsersTypes.TATTOOARTIST
                        });
                        props.setStep(1);
                        saveUserType('TattooArtist');
                    }}>
                    Sou tatuador
                </Button>
                <div onClick={() => history.push('/home')}>
                    <p className="btn-text">Voltar</p>
                </div>
            </div>

        </div>

    );
}

export function LoginStep(props) {
    const history = useHistory();

    const [respInputEmail, setRespInputEmail] = useState(false);
    const [respInputPassword, setRespInputPassword] = useState(false);

    function ValidationStep() {
        let isValid = false;

        if (respInputEmail && respInputPassword) {
            isValid = true;
        }

        // inverte por conta do disabled do btn, se for invalido o disabled tem que receber true.
        return !isValid;
    }
    
    return (
        <div className="form-container">
            <FormHeader text="Realizar Login" />

            <Input
                text="Email"
                type="email"
                onChange={e => props.setAccountState({
                    userType: props.accountState.userType,
                    email: e.target.value,
                    password: props.accountState.password
                })}
                validator={EmailValidator}
                validate={props.accountState.email}
                setRespValidation={setRespInputEmail}
            />
            <Input
                text="Senha"
                type="password"
                onChange={e => props.setAccountState({
                    userType: props.accountState.userType,
                    email: props.accountState.email,
                    password: e.target.value
                })}
                validator={PasswordValidator}
                validate={props.accountState.password}
                setRespValidation={setRespInputPassword}
            />
            <div className="forgot-password">
                <div onClick={() => props.setStep(2)}>
                    <p>Esqueci minha senha</p>
                </div>
            </div>
            <Button
                className="btn-primary"
                variant="contained"
                disableElevation
                fullWidth
                onClick={props.HandleLogin}
                disabled={ValidationStep() === false ? props.loading : true}>
                Entrar
            </Button>
            <div onClick={() => history.push('/register')}>
                <p className="btn-text">Não tenho cadastro</p>
            </div>

        </div>
    )
}

export function PasswordRecuperationStep(props) {
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
            <div onClick={() => props.setStep(1)}>
                <p className="btn-text">Cancelar</p>
            </div>
        </div>
    )
}
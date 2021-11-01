import React, { useState } from 'react';
import Input from '../../../components/Input';
import { Button, FormGroup, FormControlLabel, Switch } from '@material-ui/core';
import { useHistory } from 'react-router-dom';
import InstagramIcon from '../../../img/instagramIcon.png';
import UsersTypes from '../../../components/EnumUserTypes';
import { CepValidator, CnpjValidator, CpfValidator, DateValidator, EmailValidator, HouseNumberValidator, InstagramAccountValidator, NameValidator, PasswordConfirmationValidator, PasswordValidator, PhoneValidator } from '../../../utils/Validator';
import '../styles.css';
import { isCallChain } from 'typescript';

export function PersonalInformationStep(props) {
    const history = useHistory();

    const [respInputName, setRespInputName] = useState(false);
    const [respInputCpfOrCnpj, setRespInputCpfOrCnpj] = useState(false);
    const [respInputBirthDate, setRespInputBirthDate] = useState(false);
    const [respInputPhone, setRespInputPhone] = useState(false);

    function ValidationStep() {
        let isValid = false;

        if (respInputName && respInputCpfOrCnpj && respInputBirthDate && respInputPhone)
            isValid = true;

        // inverte por conta do disabled do btn, se for invalido o disabled tem que receber true.
        return !isValid;
    }

    return (
        <div className="form-elements">
            <Input
                text="Nome"
                value={props.accountState.nome}
                onChange={e => props.setAccountState({
                    ...props.accountState,
                    nome: e.target.value
                })}
                validator={NameValidator}
                validate={props.accountState.nome}
                setRespValidation={setRespInputName}
            />
            {props.userType === UsersTypes.TATTOOARTIST &&
                <Input
                    text="CNPJ"
                    value={props.accountState.cnpj}
                    onChange={e => props.setAccountState({
                        ...props.accountState,
                        cnpj: e.target.value
                    })}
                    maxLength={14}
                    validator={CnpjValidator}
                    validate={props.accountState.cnpj}
                    setRespValidation={setRespInputCpfOrCnpj}
                />
            }
            {props.userType === UsersTypes.USER &&
                <Input
                    text="CPF"
                    value={props.accountState.cpf}
                    onChange={e => props.setAccountState({
                        ...props.accountState,
                        cpf: e.target.value
                    })}
                    maxLength={11}
                    validator={CpfValidator}
                    validate={props.accountState.cpf}
                    setRespValidation={setRespInputCpfOrCnpj}
                />
            }
            <Input
                text="Data nascimento"
                type="date"
                value={props.accountState.data_nascimento}
                onChange={e => props.setAccountState({
                    ...props.accountState,
                    data_nascimento: e.target.value
                })}
                validator={DateValidator}
                validate={props.accountState.data_nascimento}
                setRespValidation={setRespInputBirthDate}
            />
            <Input
                text="Telefone"
                value={props.accountState.telefone}
                onChange={e => props.setAccountState({
                    ...props.accountState,
                    telefone: e.target.value
                })}
                maxLength={11}
                validator={PhoneValidator}
                validate={props.accountState.telefone}
                setRespValidation={setRespInputPhone}
            />
            <Button
                className="btn-primary"
                variant="contained"
                disableElevation
                disabled={ValidationStep()}
                fullWidth
                onClick={() => {
                    props.nextStep();
                }}>
                Prosseguir
            </Button>
            <div onClick={() => {
                history.push('/login');
            }}>
                <p className="btn-text">Voltar</p>
            </div>
        </div>
    );
}

export function LocationInformationStep(props) {

    const [respInputCep, setRespInputCep] = useState(false);
    const [respInputNumber, setRespInputNumber] = useState(false);

    function ValidationStep() {
        let isValid = false;

        if (respInputCep && respInputNumber)
            isValid = true;

        // inverte por conta do disabled do btn, se for invalido o disabled tem que receber true.
        return !isValid;
    }

    return (
        <div className="form-elements">
            <Input
                text="CEP"
                value={props.accountState.cep}
                maxLength={8}
                onChange={e =>
                    props.setAccountState({
                        ...props.accountState,
                        cep: e.target.value
                    })
                }
                validator={CepValidator}
                validate={props.accountState.cep}
                setRespValidation={setRespInputCep}
                onBlurFunction={() => props.handleCepAPI()}

            />
            {props.userType === UsersTypes.TATTOOARTIST &&
                <>
                    <Input
                        text="Estado"
                        value={props.accountState.estado}
                        disabled={true}
                        onChange={e => props.setAccountState({
                            ...props.accountState,
                            estado: e.target.value
                        })}
                    />
                    <Input
                        text="Cidade"
                        value={props.accountState.cidade}
                        disabled={true}
                        onChange={e => props.setAccountState({
                            ...props.accountState,
                            cidade: e.target.value
                        })}
                    />
                </>
            }
            <div className="smallButtonsContainer">
                <Input
                    text="Endereço"
                    value={props.accountState.logradouro}
                    disabled={true}
                    onChange={e => props.setAccountState({
                        ...props.accountState,
                        logradouro: e.target.value
                    })}
                />
                <Input
                    text="N°"
                    value={props.accountState.numero_logradouro}
                    marginLeft={15}
                    disabled={!props.accountState.logradouro}
                    onChange={e => props.setAccountState({
                        ...props.accountState,
                        numero_logradouro: e.target.value
                    })}
                    validator={HouseNumberValidator}
                    validate={props.accountState.numero_logradouro}
                    setRespValidation={setRespInputNumber}
                />
            </div>
            <Button
                className="btn-primary"
                variant="contained"
                disableElevation
                disabled={ValidationStep()}
                fullWidth
                onClick={() => {
                    props.nextStep();
                }}>
                Prosseguir
            </Button>
            <div onClick={() => {
                props.previousStep();
            }}>
                <p className="btn-text">Voltar</p>
            </div>
        </div>
    );
}

export function LoginInformationStep(props) {
    const [instagramIntegration, setinstagramIntegration] = useState(false);

    const [confirmPassword, setConfirmPassword] = useState('');

    const [respInputEmail, setRespInputEmail] = useState(false);
    const [respInputPassword, setRespInputPassword] = useState(false);
    const [respInputConfirmPassword, setRespInputConfirmPassword] = useState(false);
    const [respInputInstagramAccount, setRespInputInstagramAccount] = useState(false);

    const [finishRegister, setFinishRegister] = useState(false);

    function ValidationStep() {
        let isValid = false;

        console.log('email: ' + respInputEmail, 'senha: ' + respInputPassword, 'confirm: ' + respInputConfirmPassword);
        if (respInputEmail && respInputPassword && respInputConfirmPassword) {
            
            
            console.log('switch: ' + instagramIntegration)
            if (instagramIntegration) {
                console.log('campoInsta: ' + respInputInstagramAccount)
                isValid = respInputInstagramAccount ? true : false
            } else {
                console.log('campoInsta: ' + respInputInstagramAccount)
                isValid = true
            }
            
            console.log('resultado: ' + isValid)
        }

        // inverte por conta do disabled do btn, se for invalido o disabled tem que receber true.
        setFinishRegister(isValid);
    }

    return (
        <div className="form-elements">
            <Input text="Email"
                onChange={e => props.setAccountState({
                    ...props.accountState,
                    email: e.target.value
                })}
                onBlurFunction={() => {
                    ValidationStep();
                }}
                validate={props.accountState.email}
                validator={EmailValidator}
                setRespValidation={setRespInputEmail}
            />
            <div className="smallButtonsContainer">
                <Input
                    text="Senha"
                    onChange={e => props.setAccountState({
                        ...props.accountState,
                        senha: e.target.value
                    })}
                    onBlurFunction={() => {
                        ValidationStep();
                    }}
                    validate={props.accountState.senha}
                    validator={PasswordValidator}
                    setRespValidation={setRespInputPassword}
                />
                <Input
                    text="Confir. senha"
                    marginLeft={15}
                    onChange={e => { 
                        setConfirmPassword(e.target.value);
                        setFinishRegister(ValidationStep());
                    }}
                    onBlurFunction={() => {
                        setTimeout(() => {
                            ValidationStep();
                        }, 500)
                    }}
                    validate={{
                        password: props.accountState.senha,
                        confirmation: confirmPassword
                    }}
                    validator={PasswordConfirmationValidator}
                    setRespValidation={setRespInputConfirmPassword}
                />
            </div>
            {props.userType === UsersTypes.TATTOOARTIST &&
                <div className="instagramContainer">
                    <FormGroup className="instagramSwitch">
                        <FormControlLabel control={
                            <Switch
                                checked={instagramIntegration}
                                onChange={() => {
                                    setinstagramIntegration(!instagramIntegration)
                                    ValidationStep();
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
                        onChange={e => {
                            props.setAccountState({
                                ...props.accountState,
                                conta_instagram: e.target.value
                            });
                        }}
                        onBlurFunction={() => {
                            ValidationStep();
                        }}
                        validate={props.accountState.conta_instagram}
                        validator={InstagramAccountValidator}
                        setRespValidation={setRespInputInstagramAccount}
                    />
                </div>
            }
            <Button
                className="btn-primary"
                variant="contained"
                disableElevation
                disabled={!finishRegister}
                fullWidth
                onClick={() => {
                    props.handleLogin();
                }}>
                Prosseguir
            </Button>
            <div onClick={() => {
                props.previousStep();
            }}>
                <p className="btn-text">Voltar</p>
                {"instaSwitch: " + instagramIntegration}
            </div>
        </div>
    );
}


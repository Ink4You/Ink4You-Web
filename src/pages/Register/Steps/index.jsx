import React, { useState } from 'react';
import Input from '../../../components/Input';
import { Button, FormGroup, FormControlLabel, Switch } from '@material-ui/core';
import { useHistory } from 'react-router-dom';
import InstagramIcon from '../../../img/instagramIcon.png';
import UsersTypes from '../../../components/EnumUserTypes';
import '../styles.css';

export function PersonalInformationStep(props) {
    const history = useHistory();
    return (
        <div className="form-elements">
            <Input 
                text="Nome"
                value={props.accountState.nome}
                onChange={e => props.setAccountState({
                    ...props.accountState,
                    nome: e.target.value
                })}
            />
            {props.userType === UsersTypes.TATTOOARTIST &&
                <Input 
                    text="CNPJ"
                    value={props.accountState.cnpj}
                    onChange={e => props.setAccountState({
                        ...props.accountState,
                        cnpj: e.target.value
                    })}
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
                />
            }
            <Input 
                text="Data nascimento"
                value={props.accountState.data_nascimento}
                onChange={e => props.setAccountState({
                    ...props.accountState,
                    data_nascimento: e.target.value
                })}
            />
            <Input 
                text="Telefone"
                value={props.accountState.telefone}
                onChange={e => props.setAccountState({
                    ...props.accountState,
                    telefone: e.target.value
                })}
            />
            <Button
                className="btn-primary"
                variant="contained"
                disableElevation
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
                onBlur={() => props.handleCepAPI()}

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
                />
            </div>
            <Button
                className="btn-primary"
                variant="contained"
                disableElevation
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
    return (
        <div className="form-elements">
            <Input text="Email"
                onChange={e => props.setAccountState({
                    ...props.accountState,
                    email: e.target.value
                })}
            />
            <div className="smallButtonsContainer">
                <Input
                    text="Senha"
                    onChange={e => props.setAccountState({
                        ...props.accountState,
                        senha: e.target.value
                    })}
                />
                <Input
                    text="Confir. senha"
                    marginLeft={15}
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
                        onChange={e => props.setAccountState({
                            ...props.accountState,
                            conta_instagram: e.target.value
                        })}
                    />
                </div>
            }
            <Button
                className="btn-primary"
                variant="contained"
                disableElevation
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
            </div>
        </div>
    );
}


import React from 'react';
import Logo from '../../img/logo.png'
import { Link, useHistory } from 'react-router-dom';
import { Button, Avatar, ClickAwayListener, Portal } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import EveningIcon from '../../img/sunset.svg'
import '../../global.css';
import './styles.css';
import { useState } from 'react';

function Header(props) {
    const history = useHistory();
    const [iconTheme, setIconTheme] = useState(EveningIcon);
    const dataUser = JSON.parse(localStorage.getItem('@dataUser'));

    function logout() {
        localStorage.removeItem('@dataUser');
        history.push('/login');
    }
    const [open, setOpen] = React.useState(false);

    const handleClick = () => {
        setOpen((prev) => !prev);
    };

    const handleClickAway = () => {
        setOpen(false);
    };

    return (
        <header className="header-container" style={{position: props.position ? props.position : "fixed"}}>
            <div className="div-logo">
                <img src={Logo} onClick={() => history.push('/')} alt="Logo Ink4You" />
            </div>
            <div className="div-options">
                <Link to='/'>Tatuadores</Link>
                <Link to='/'>Tatuagens</Link>
                <Link to='/'>Informações</Link>
                <Link to='/'>Relatos</Link>
                <img src={iconTheme}
                    alt="Trocar tema"
                    className="theme-icon"
                    onClick={() => alert('Ainda não funfa :)')} />
                {dataUser == null &&
                    <Button
                        id="btn-signin"
                        className="btn-primary"
                        variant="contained"
                        disableElevation
                        fullWidth
                        onClick={() => history.push('/login')}>
                        Entrar
                    </Button>
                }
                    {dataUser != null &&
                        <ClickAwayListener onClickAway={handleClickAway}>
                            <div className="root">
                                <button className="btn-icon" type="button" onClick={handleClick}>
                                    <Avatar className="avatarIcon" src={dataUser.foto_perfil}>{dataUser.nome.slice(0, 1).toUpperCase()}</Avatar>
                                </button>
                                {open ? (
                                    <div className="dropdown">
                                        <div className="btn" onClick={() => history.push('/profile')}>
                                            <div></div>
                                            <span>Perfil</span>
                                        </div>
                                        <div className="btn" onClick={() => logout()}>
                                            <div></div>
                                            <span>Logout</span>
                                        </div>
                                    </div>
                                ) : null}
                            </div>
                        </ClickAwayListener>
                    }
            </div>
        </header>
    );
}

export default Header;
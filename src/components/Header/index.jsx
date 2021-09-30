import React from 'react';
import Logo from '../../img/logo.png'
import { Link, useHistory} from 'react-router-dom';
import { Button } from '@material-ui/core';
import EveningIcon from '../../img/sunset.svg'
import '../../global.css';
import './styles.css';
import { useState } from 'react';

function Header(props) {
    const history = useHistory();
    const [iconTheme, setIconTheme] = useState(EveningIcon);

    return (
        <header className="header-container">
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
                    onClick={() => alert('Ainda não funfa :)')}/>
                <Button
                    id="btn-signin"
                    className="btn-primary"
                    variant="contained"
                    disableElevation
                    fullWidth>
                    Entrar
                </Button>
            </div>
        </header>
    );
}

export default Header;
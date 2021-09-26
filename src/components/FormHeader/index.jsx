import React from 'react';
import './styles.css';
import Logo from '../../img/logo.png';
import EveningIcon from '../../img/sunset.svg'

function FormHeader(props) {
    return (
        <div className="form-header"> 
            <img src={EveningIcon} alt="Trocar tema" />
            <img src={Logo} alt="Logo do Ink4You" />
            <p>{props.text}</p>
            {props.description &&
                <span>{props.description}</span>
            }
        </div>
    );
}

export default FormHeader;
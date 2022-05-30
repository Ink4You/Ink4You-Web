import React from 'react';
import './styles.css';
import Logo from '../../img/logo.png';
import EveningIcon from '../../img/sunset.svg'

function FormHeader(props) {
    return (
        <div className="form-header">
            <div className="brand-and-step">
                <div>
                    <img src={Logo} alt="Logo do Ink4You" />
                    <p>{props.text}</p>
                </div>
                <img src={EveningIcon} alt="Trocar tema" />
            </div>

            {props.description &&
                <span>{props.description}</span>
            }
        </div>
    );
}

export default FormHeader;
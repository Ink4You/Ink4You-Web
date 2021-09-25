import React from 'react';
import './styles.css';

function Input(props) {
    return (
        <input className="input" placeholder={props.placeholder} />
    );
}

export default Input;
import React from 'react';
import './style.css';

function CheckboxFilter(props) {
    return (
        <div>
            <input type="checkbox" id={props.id} />
            <label htmlFor={props.id} >{props.text} </label>
        </div>
    )
}

export default CheckboxFilter;
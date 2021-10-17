import React from 'react';
import './styles.css';

function Input(props) {

    const id = `input${props.text}`;
    const width = props.width === undefined ? 100 : props.width;
    const height = props.height === undefined ? 56 : props.height;
    const marginLeft = props.marginLeft === undefined ? 0 : props.marginLeft;
    const marginRight = props.marginRight === undefined ? 0 : props.marginRight;


    return (
        <div 
            className="container-label-float" 
            style={{
                maxWidth: width + (width === 100 ? '%' : 'px'),
                marginLeft: marginLeft + 'px',
                marginRight: marginRight + 'px',
            }}>
            <input 
                type={props.type} 
                placeholder=" " 
                required 
                style={{
                    height: height + 'px',
                }} 
                id={id} 
                disabled={props.disabled}
                onChange={props.onChange}
                value={props.value}
                onBlur={props.onBlur}
                maxLength={props.maxLength}
            />
            <label 
                htmlFor={id}
                title={props.text}
                style={{
                    marginTop: ((height / 2) + 5) + 'px'
                }}
                id={id}>{props.text}</label>
        </div>
    );
}

export default Input;
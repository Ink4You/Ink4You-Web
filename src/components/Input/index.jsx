import React from 'react';
import './styles.css';

function Input(props) {

    const id = `input${props.text}`;
    const width = props.width == null ? 100 : props.width;
    const height = props.height == null ? 56 : props.height;
    const marginLeft = props.marginLeft == null ? 0 : props.marginLeft;
    const marginRight = props.marginRight == null ? 0 : props.marginRight;

    return (
        <div 
            className="container-label-float" 
            style={{
                maxWidth: width + (width == 100 ? '%' : 'px'),
                marginLeft: marginLeft + 'px',
                marginRight: marginRight + 'px',
            }}>
            <input 
                type="text" 
                placeholder=" " 
                required 
                style={{
                    height: height + 'px',
                }} 
                id={id} 
            />
            <label 
                for="input"
                style={{
                    marginTop: ((height / 2) + 5) + 'px'
                }}
                id={id}>{props.text}</label>
        </div>
    );
}

export default Input;
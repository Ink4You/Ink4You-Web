import React, { useState } from 'react';
import './styles.css';

function Input(props) {

    const id = `input${props.text}`;
    const width = props.width === undefined ? 100 : props.width;
    const height = props.height === undefined ? 56 : props.height;
    const marginLeft = props.marginLeft === undefined ? 0 : props.marginLeft;
    const marginRight = props.marginRight === undefined ? 0 : props.marginRight;

    const [isFocus, setIsFocus] = useState(false);
    const [isValid, setIsValid] = useState(true);

    function Validation() {
        let resp = props.validator(props.validate);
        //console.log(props.validator(props.validate))
        setIsValid(resp);
        return resp;
    }

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
                onFocus={(e) => {
                    setIsFocus(true);
                    e.target.style.borderColor = '#3951b2';
                }}
                onBlur={(e) => {
                    setIsFocus(false);
                    e.target.style.borderColor = Validation() ? 'transparent' : '#ed4245';
                    
                    if (props.onBlurFunction !== undefined) {
                        props.onBlurFunction();
                    }
                }}
                maxLength={props.maxLength}
            />
            <label
                htmlFor={id}
                title={props.text}
                style={{
                    marginTop: ((height / 2) + 5) + 'px',
                    color: isFocus ? '#3951b2' : isValid ? '#757575' : '#ed4245'
                }}
            >{props.text}</label>
        </div>
    );
}

export default Input;
import React from "react";
import api from "../../api";
import CamIcon from '../../img/camera.svg';
import "./style.css";

function InputFileImage(props) {

    function ChangeImage(e) {
        let file = e.target.files[0];
        let formData = new FormData();
        formData.append("foto", file);
       
        props.setTattooImage(formData)

    }

    return (
        <div className="container-input">
            <label htmlFor="file" title="Escolha a imagem">
                <img src={CamIcon} alt="Adicionar imagem" />    
            </label>
            <input
                type="file"
                name="file"
                id="file"
                accept="image/*"
                onChange={(e) => ChangeImage(e)}
            />
        </div>
    );
}

export default InputFileImage;
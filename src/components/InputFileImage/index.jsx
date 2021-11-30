import React from "react";
import api from "../../api";
import "./style.css";

function InputFileImage() {

    function ChangeImage(e) {
        let file = e.target.files[0];
        let formData = new FormData();
        formData.append("file", file)

        api.patch("tatuadores/foto/8", formData, {
            headers: {
                "Content-type": "multipart/form-data",
            },
        });
    }

    return (
        <>
            <input
                type="file"
                name="file"
                accept="image/*"
                onChange={(e) => ChangeImage(e)}
            />
        </>
    );
}

export default InputFileImage;
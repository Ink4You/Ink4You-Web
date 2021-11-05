import React from "react";
import './style.css';
import img from '../../img/option-tattoo.jpg';

function Carousel(props) {
    return (
        <>
            <div className="items-wrapper">
                <div id="items">
                    <div className="item">
                        <div className="report">
                            <img src={img} alt="Foto usuário" />
                            <div>
                                <p>"Lorem ipsum dolor sit amet consectetur, adipisicing elit. Deleniti esse labore expedita officiis eum provident, nemo ab."</p>
                                <span>Nome do usário</span>
                            </div>
                        </div>
                        {/* <img src={img} alt="" /> */}
                    </div>
                  
                </div>
            </div>
        </>
    );
}

export default Carousel;
import React from "react";
import './style.css';
import img from '../../img/option-tattoo.jpg';

function Carousel(props) {
    const { data } = props
    return (
        <>
            <div className="items-wrapper">
                <div id="items">
                    <div className="item">

                        <div className="report">
                            {
                                data.map((element) =>
                                    <> 
                                        <img src={element.imagem} alt="Foto usuário" />
                                        <div>
                                            <p>{element.descricao}</p>
                                            <span>{element.nome_usuario}</span>
                                        </div>
                                    </>
                                )
                            }

                        </div>
                        {/* <img src={img} alt="" /> */}
                    </div>

                </div>
            </div>
        </>
    );
}

export default Carousel;


{/* <img src={data[0].imagem} alt="Foto usuário" />
                            <div>
                                <p>{data[0].descricao}</p>
                                <span>{data[0].nome_usuario}</span>
                            </div> */}
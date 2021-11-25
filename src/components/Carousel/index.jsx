import React, { useEffect, useState } from "react";
import './style.css';
import img from '../../img/option-tattoo.jpg';
import api from '../../api';


function Carousel() {
    const [relatos, setRelatos] = useState([]);


    useEffect(() => {
        async function getData() {
            const { data } = await api.get("/relatos/buscar-relatos");
            setRelatos(data.pilha);
        }
        getData();
    }, []);
    return (
        <>
            <div className="items-wrapper">
                <div id="items">
                    <div className="item">

                        <div className="report">
                            {
                                relatos?.map((element) =>
                                    element !== null && (
                                        <>
                                            <img src={element?.imagem || ""} />
                                            <div>
                                                <p>{element?.descricao || ""}</p>
                                                <span>{element?.nome_usuario || ""}</span>
                                            </div>
                                        </>
                                    )

                                )

                            }
                        </div>
                    </div>

                </div>
            </div>
        </>
    );
}

export default Carousel;
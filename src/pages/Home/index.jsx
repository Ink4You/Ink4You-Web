import React, { useEffect, useState } from 'react';
import Header from '../../components/Header';
import img1 from '../../img/option-tattoo.jpg';
import img2 from '../../img/option-tatuador.jpg';
import img3 from '../../img/SideImage.png';
import Carousel from '../../components/Carousel';
import Footer from '../../components/Footer';
import { useHistory } from 'react-router-dom';
import './styles.css';

function Home() {

    const history = useHistory();

    return (
        <>
            <Header />
            <section className="container-options">
                <div className="tattoo-option-img">
                    <div className="tattoo-option">
                        <p>Tatuagens</p>
                    </div>
                </div>
                <div className="artist-option-img" onClick={() => history.push('/TattooArtists')} >
                    <div className="artist-option">
                        <p>Tatuadores</p>
                    </div>
                </div>
            </section>
            <section className="information-container">
                <section className="styles">
                    <div className="demonstration">
                        <img src={img1} alt="img1" />
                        <img src={img2} alt="img2" />
                        <img src={img3} alt="img3" />
                    </div>
                    <div className="styles-content">
                        <h2>Estilos</h2>
                        <p> A tatuagem evoluiu muito - tanto socialmente como artisticamente - e novas técnicas e estilos surgem
                            para encantar quem curte os desenhos na pele. A boa notícia é que tem para todos os gostos, tanto para o
                            público que procura algo mais delicado quanto àqueles que prezam pelos detalhes do desenho.</p>

                        <table>
                            <tr>
                                <td>PONTILHISMO</td>
                                <td>OLD SCHOOL</td>
                                <td>GEOMÉTRICO</td>
                            </tr>
                            <tr>
                                <td>MINIMALISTA</td>
                                <td>BLACKWORK</td>
                                <td>SINGLE LINE</td>
                            </tr>
                            <tr>
                                <td>GLITCH</td>
                                <td>TINTA BRANCA</td>
                                <td>TINTA VERMELHA</td>
                            </tr>
                            <tr>
                                <td>PRETO E BRANCO</td>
                                <td>SEM CONTORNO</td>
                                <td>AQUARELA</td>
                            </tr>

                        </table>
                    </div>
                </section>
            </section>
            <section className="reports">
                <h2>Experiência de usuários</h2>
                <Carousel />
            </section>
            <Footer />
        </>
    )
}

export default Home;
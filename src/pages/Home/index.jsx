import React from 'react';
import Header from '../../components/Header';
import img1 from '../../img/option-tattoo.jpg';
import img2 from '../../img/option-tatuador.jpg';
import img3 from '../../img/SideImage.png';
import Carousel from '../../components/Carousel';
import Footer from '../../components/Footer';
import './styles.css';

function Home() {
    return (
        <>
            <Header />
            <section className="container-options">
                <div className="tattoo-option-img">
                    <div className="tattoo-option">
                        <p>Tatuagens</p>
                    </div>
                </div>
                <div className="artist-option-img">
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
                        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Exercitationem fugit odio officia ullam, explicabo repellat maiores modi soluta optio dolorem rem reiciendis debitis recusandae pariatur similique deleniti tempora porro quae?</p>

                        <table>
                            <tr>
                                <td>estilo1</td>
                                <td>estilo2</td>
                                <td>estilo3</td>
                            </tr>
                            <tr>
                                <td>estilo4</td>
                                <td>estilo5</td>
                                <td>estilo6</td>
                            </tr>
                            <tr>
                                <td>estilo7</td>
                                <td>estilo8</td>
                                <td>estilo9</td>
                            </tr>
                            <tr>
                                <td>estilo10</td>
                                <td>estilo11</td>
                                <td>estilo12</td>
                            </tr>
                        </table>
                    </div>
                </section>
            </section>
            <section className="reports">
                <h2>Experiência de usuários</h2>
                <Carousel/>
            </section>
            <Footer/>
        </>
    )
}

export default Home;
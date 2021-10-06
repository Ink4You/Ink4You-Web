import React from 'react';
import Header from '../../components/Header';
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
        </>
    )
}

export default Home;
import React, { useEffect, useState } from "react";
import Header from "../../components/Header";
import Input from "../../components/Input";
import Flatlist from "../../components/Flatlist";
import Filters from '../../components/Filters';
import SearchIcon from '../../img/search.svg';
import api from "../../api";
import '../../global.css';
import './style.css';

function ArtistList() {

    const [artistsData, setArtistsData] = useState([]);

    useEffect(async () => {
        const { data } = await api.get("/tatuadores");
        setArtistsData(data);
        // console.log(artistsData)
    }, []);

    return (
        <>
            <Header />
            <section className="container artist-list-container">
                <Filters
                    StyleEnabled={true}
                    LocalizationEnabled={true}
                />

                <section className="artist-list">
                    <div className="header">
                        <h2>Tatuadores</h2>
                        <div className="search-container">
                            <Input text="Pesquisar" type="search" height={46} />
                            <button><img src={SearchIcon} alt="Buscar" /></button>
                        </div>
                    </div>
                    <div className="content">
                        <Flatlist data={artistsData} type="tattooArtist" wrap={true} />
                    </div>
                </section>
            </section>
        </>
    );
}

export default ArtistList;
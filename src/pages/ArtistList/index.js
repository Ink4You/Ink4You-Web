import React, { useEffect, useState } from "react";
import Header from "../../components/Header";
import Input from "../../components/Input";
import Flatlist from "../../components/Flatlist";
import SearchIcon from '../../img/search.svg';
import { profilePhoto, testeCard } from '../../utils/MockData';
import api from "../../api";
import '../../global.css';
import './style.css';

function ArtistList() {

    const [artistsData, setArtistsData] = useState([]);

    useEffect(async () => {
        const { data } = await api.get("/tatuadores");
        setArtistsData(data);
        // console.log(artistsData)
    },[]);

    return (
        <>
            <Header/>
            <section className="container container-artist-list">
                <section className="filters">
                    <h2>Aplicar filtros</h2>
                    <fieldset>
                        <h3>Estilos</h3>
                        <div>
                            <input type="checkbox" id="realist" />
                            <label htmlFor="realist">Realista</label>
                        </div>
                        <div>
                            <input type="checkbox" id="tribal" />
                            <label htmlFor="tribal">Tribal</label>
                        </div>
                        <div>
                            <input type="checkbox" id="watercolor" />
                            <label htmlFor="watercolor">Aquarela</label>
                        </div>
                    </fieldset>
                    <fieldset>
                        <h3>Localização</h3>
                        <div>
                            {/* <Input 
                                text="Estado"
                                height={46}
                            />
                            <Input 
                                text="Cidade"
                                height={46}
                            /> */}

                            <select id="">
                                <option value="">Estado</option>
                            </select>
                            <select id="">
                                <option value="">Cidade</option>
                            </select>
                        </div>
                    </fieldset>
                </section>
                <section className="artist-list">
                    <div className="header">
                        <h2>Tatuadores</h2>
                        <div className="search-container-artist-list">    
                            <Input text="Pesquisar" type="search" height={46} /> 
                            <button><img src={SearchIcon} alt="Buscar" /></button>
                        </div>
                    </div>
                    <div className="content">
                        <Flatlist data={artistsData} type="tattooArtist" wrap={true}/>
                    </div>
                </section>
            </section>
        </>
    );
}

export default ArtistList;
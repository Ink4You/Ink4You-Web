import React, { useState } from 'react';
import Header from '../../components/Header';
import Filters from '../../components/Filters';
import SearchInput from '../../components/SearchInput';
import Flatlist from "../../components/Flatlist";
import { testeCard } from '../../utils/MockData';
import api from '../../api';
import './style.css';

function TattooList() {

    const [tattooList,setTattooList] = useState([]);

    async function GetTattooList() {
        const { data } = await api.get('/tatuagens');
    }

    return (
        <>
            <Header />
            <section className="container tattoo-list-container">
                <Filters
                    StyleEnabled={true}
                    LocalEnabled={true}
                    LocalizationEnabled={true}
                />
                <section className="tattoo-list">
                    <div className="header">
                        <h2>Tatuagens</h2>
                        <SearchInput />
                    </div>
                    <div className="content">
                        <Flatlist data={testeCard} type="tattoo" wrap={true} />
                    </div>
                </section>
            </section>
        </>
    );
}

export default TattooList;
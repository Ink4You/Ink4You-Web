import React, { useEffect, useState } from 'react';
import Header from '../../components/Header';
import Filters from '../../components/Filters';
import SearchInput from '../../components/SearchInput';
import Flatlist from "../../components/Flatlist";
import { testeCard } from '../../utils/MockData';
import api from '../../api';
import './style.css';

function TattooList() {

    const [tattooList,setTattooList] = useState([]);
    const [tattooInstagramList,setTattooInstagramList] = useState([]);


    useEffect(() => {
        async function WorkAround() {
            GetTattoos();
        }
        WorkAround(); 
    },[])
    
    useEffect(() => {
        async function WorkAround() {
            GetTattoosInstagram();
        }
        WorkAround(); 
    },[])

    async function GetTattoos() {
        const { data } = await api.get('/tatuagens');
        
        setTattooList(data);
    }
    
    async function GetTattoosInstagram() {
        const { data } = await api.get('/instagram');
        setTattooInstagramList(data);
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
                        <Flatlist data={tattooList} type="tattooSimple" wrap={true} />
                        {/* <Flatlist data={tattooInstagramList} type="tattooSimple" wrap={true} /> */}
                    </div>
                </section>
            </section>
        </>
    );
}

export default TattooList;
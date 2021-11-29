import React from 'react';
import Input from "../../components/Input";
import SearchIcon from '../../img/search.svg';
import './style.css';

function SearchInput() {
    return (
        <div className="search-container">
            <Input text="Pesquisar" type="search" height={46} />
            <button><img src={SearchIcon} alt="Buscar" /></button>
        </div>
    );
}

export default SearchInput;
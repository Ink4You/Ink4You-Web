import React from 'react';
import './style.css';

function LocalizationFilter(props) {
    return (
        <fieldset>
            <h3>Localização</h3>
            <div>
                <select id="">
                    <option value="">Estado</option>
                </select>
                <select id="">
                    <option value="">Cidade</option>
                </select>
            </div>
        </fieldset>
    );
}

export default LocalizationFilter;
import React, { useEffect, useState } from 'react';
import StyleFilter from './StyleFilter';
import LocalizationFilter from './LocalizationFilter';
import LocalFilter from './LocalFilter';
import './style.css';
import api from '../../api';

function Filters(props) {

    const [tattooStyles, setTattooStyles] = useState([]);

    useEffect(() => {
        GetTattooStyles();
    },[])

    async function GetTattooStyles() {
        const { data } = await api.get('/estilo');
        setTattooStyles(data);
    }

    return (
        <>
            <section className="filters">
                <h2>Aplicar filtros</h2>

                {props.StyleEnabled && 
                    <StyleFilter data={tattooStyles} />
                }
                {props.LocalEnabled && 
                    <LocalFilter/>
                }
                {props.LocalizationEnabled && 
                    <LocalizationFilter/>
                }
            </section>
        </>
    );
}

export default Filters;
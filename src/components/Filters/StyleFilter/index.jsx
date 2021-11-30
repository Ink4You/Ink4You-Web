import React from 'react';
import CheckboxFilter from '../CheckboxFilter';

function StyleFilter(props) {
    const data = props.data;

    return (
        <fieldset>
            <h3>Estilos</h3>

            {data.map((style) => 
                <CheckboxFilter
                    key={style.id_estilo}
                    id={style.titulo}
                    text={style.titulo}
                /> 
            )}    
            
        </fieldset>
    );
}

export default StyleFilter;
import React from 'react';
import CheckboxFilter from '../CheckboxFilter';

function LocalFilter() {
    return (
        <fieldset>
            <h3>Local</h3>
            <div>
                <CheckboxFilter text="Braço" id="arm"/>                
                <CheckboxFilter text="Perna" id="leg"/>                
                <CheckboxFilter text="Costas" id="back"/>                
                <CheckboxFilter text="Mão" id="hand"/>                
            </div>
        </fieldset>
    );
}

export default LocalFilter;
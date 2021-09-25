import React from 'react';
import './styles.css';

function InitialSideImage(props) {
    return (
        <section className="side-image">
            <p>{props.phrase}</p>
        </section>
    );
}

export default InitialSideImage;
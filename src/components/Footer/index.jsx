import React from 'react';
import './styles.css';
import Logo from '../../img/logo.png';
import FacebookLogo from '../../img/facebook-brands.svg'
import TwitterLogo from '../../img/twitter-brands.svg'
import InstagramLogo from '../../img/instagram-brands.svg'

function Footer(props) {
    return (
        <div className="footer"> 
            <img src={Logo} className="logo" alt="Logo do Ink4You" />
            <p className="phrase">Tatuagens não precisam exatamente ter um significado, podem ser apenas um traço da nossa personalidade.</p>
            <div className="footer-menu">
                <p>Informações</p>
                <p>Ink4you@gmail.com</p>
                <p>Relatos</p>
            </div>
            <div className="footer-social-medias">
                <img src={FacebookLogo} />
                <img src={TwitterLogo} />
                <img src={InstagramLogo}/>
            </div>
        </div>
    );
}

export default Footer;
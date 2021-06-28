import React from 'react';
import { Link } from "react-router-dom";
import logoImg from "./images/logoCap2.gif";
Logo.propTypes = {
    
};

function Logo(props) {
    return (
        <div>
            <div class="header__navbar_left-logo">
              <Link to="/home">
                <img className="header__logo" src={logoImg} alt="Logo" />
              </Link>
            </div>
        </div>
    );
}

export default Logo;
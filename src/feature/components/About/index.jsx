import React from 'react';
import PropTypes from 'prop-types';
import Content from './images/content.png';
import "./style.css";
import HeaderAbout from './components/header';
import Footer from '../../../components/footer';


AboutUs.propTypes = {
    
};

function AboutUs(props) {
    return (
        <div>
            <img  src={Content} alt="content about" />
        </div>
    );
}

export default AboutUs;
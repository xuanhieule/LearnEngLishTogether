import React from 'react';
import PropTypes from 'prop-types';
import Logo from '../../../../../components/header/components/logo';
import ListBarAbout from './components/listBar';
import Footer from '../../../../../components/footer';

HeaderAbout.propTypes = {
    
};

function HeaderAbout(props) {
    return (
      
        <header>
        <nav className="nav">
          <div className="logo">
            <Logo />
          </div>
          <div className="action">
            <ListBarAbout />
          
          </div>
        </nav>
      </header>
      

    );
}

export default HeaderAbout;
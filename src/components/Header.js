import React from 'react';
import logo from '../images/logo.svg';

const Header = (props) => {

  return(
    <header className="header">
      <img src={logo} alt="Логотип" className="header__Logo" />
    </header>
  )
};

export default Header;
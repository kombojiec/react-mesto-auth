import React from 'react';
import logo from '../images/logo.svg';

const Header = (props) => {

  let buttonText = '';
  if(props.buttonText === 'login'){
    buttonText = 'Войти';
  }else if(props.buttonText === 'register'){
    buttonText = 'Регистрация';
  }else if(props.buttonText === 'logout'){
    buttonText = 'Выйти';
  }
  // const button = (<button className ='header__button'>{buttonText}</button>)
  return(
    <header className="header">
      <img src={logo} alt="Логотип" className="header__Logo" />      
      {props.mail?
        <div className="header__info">
          <p className="header__mail">{props.mail}</p>
          <button className ='header__button'>{buttonText}</button>
        </div>:
        <button className ='header__button'>{buttonText}</button>
      }
    </header>
  )
};

export default Header;
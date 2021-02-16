import React from 'react'
import { NavLink } from "react-router-dom";

export const AuthForm = props => {

  return(
    <div className="auth">
      <h2 className="auth__title">{props.title}</h2>
      <input type="text" className="auth__input" placeholder='Email' />
      <input type="password" className="auth__input" placeholder='Пароль' />
      <button className="auth__button">{props.button}</button>
      {props.register?
        <div className="auth__redirect">
          <p className="auth__redirect-text">Уже зарегистрированы?</p>
          <NavLink to='/' className="auth__redirect-button">Войти</NavLink>
        </div>
        :null
      }
    </div>
  )
}
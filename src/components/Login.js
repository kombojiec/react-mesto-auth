import React,{  } from "react";
import { NavLink } from "react-router-dom";
import Header from "./Header";
import {AuthForm} from "./AuthForm";

export const Login = props => {

  return (
    <div className='page page_type_auth' >
      <div className="page__container">

      <Header buttonText={'register'} />
      <AuthForm 
        title='Вход'
        button='Войти'
        register={false}
      />
      </div>
    </div>
  )
}
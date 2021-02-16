
import React,{  } from "react";
import Header from "./Header";
import {AuthForm} from "./AuthForm";
import PopupAuth from "./PopupAuth";

export const Register = props => {

  return (
    <div className='page page_type_auth' >
      <div className="page__container">  
      <Header buttonText={'login'} />
      <AuthForm 
        title='Регистрация'
        button='Зарегистрироваться'
        register={true}
      />
      </div>
    </div>
  )
}
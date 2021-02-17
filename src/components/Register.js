
import React,{  } from "react";
import {AuthForm} from "./AuthForm";

export const Register = props => {

  return (
    <div className='page_type_auth' >
      <div className="page__container">  
      {/* <Header buttonText={'login'} /> */}
      <AuthForm 
        title='Регистрация'
        button='Зарегистрироваться'
        register={true}
      />
      </div>
    </div>
  )
}
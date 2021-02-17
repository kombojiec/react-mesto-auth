import React,{  } from "react";
import {AuthForm} from "./AuthForm";

export const Login = props => {

  return (
    <div className='page_type_auth' >
      <div className="page__container">

      {/* <Header buttonText={'register'} /> */}
      <AuthForm 
        title='Вход'
        button='Войти'
        register={false}
      />
      </div>
    </div>
  )
}
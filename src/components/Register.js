
import React,{ useState } from "react";
import {AuthForm} from "./AuthForm";
import {Registration} from './Auth';
import {withRouter } from "react-router-dom";


const Register = (props) => {

  const [data, setData] = useState({
    email: '',
    password: '',
    message: '',
  })
  const inputHandler = (event) => {
    const {name, value} = event.target;
    setData({
      ...data,
      [name]: value,
    })
  }

  const submitHandler = (event) => {
    event.preventDefault()
    Registration(data.email, data.password)
    .then(res => {
      props.onRegister(true, 'success')
      props.history.push('/signin')
    })
    .catch(error => {
      props.onRegister(true,'failure')
    });
  }

  return (
    <div className='page_type_auth' >
      <div className="page__container">  
      <AuthForm 
        onChange={inputHandler}
        onSubmit={submitHandler}
        title='Регистрация'
        button='Зарегистрироваться'
        register={true}
      />
      </div>
    </div>
  )
}

export default  withRouter(Register)
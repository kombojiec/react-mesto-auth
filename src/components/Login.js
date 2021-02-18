import React,{ useState } from "react";
import {AuthForm} from "./AuthForm";
import {Authorization} from './Auth'
import { withRouter } from "react-router-dom";

const Login = props => {

  const [data, setData] = useState({
    email: '',
    password: ''
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
    Authorization(data.email, data.password)
    .then(res => {
      if(res.token){
        props.onLoggedIn(data.email);
        localStorage.setItem('jwt', res.token);
        props.history.push('/');
      }else{
        return
      }
    })
    .catch(error => {
      props.onRegister(true,'failure')
      if(error.status === 400){
        console.log('Не корректно введены данные')
      }else if(error.status === 401){
        console.log('Пользователь не найден')
      }else{
        console.log('Ошибка' + error.status)
      }
    });
  }

  return (
    <div className='page_type_auth' >
      <div className="page__container">

      <AuthForm 
        onChange={inputHandler}
        onSubmit={submitHandler}
        title='Вход'
        button='Войти'
        register={false}
      />
      </div>
    </div>
  )
}

export default withRouter(Login);
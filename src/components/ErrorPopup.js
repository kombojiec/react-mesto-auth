import React from 'react';

const ErrorPopup = (props) => {

  const classes =['popup', 'popup_error'];
  if(props.isOpen){classes.push('popup_opened');}

  return(
    <section className={classes.join(' ')}>
      <div action="#" className="popup__form" noValidate>
        <h2 className="popup__title">Что-то пошло не так...</h2>          
        <p className="popup__text">При отправке данных произошла ошибка. Проверьте данные или повторите запрос позже.</p>
        <button className="popup__close popup__close_place_error" type="button"></button>
      </div>
    </section> 
  )
};

export default ErrorPopup;
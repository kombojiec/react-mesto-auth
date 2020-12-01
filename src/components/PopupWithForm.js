import React from  'react';

const PopupWithForm = (props) => {

  const classes = ['popup', `popup_${props.name}`];

  if(props.isOpen){classes.push('popup_opened');}

  return(
    <section className={classes.join(' ')} onClick={props.onOutsideClose}>
      <form action="#" className="popup__form" noValidate>
        <h2 className="popup__title">{props.title} </h2>
        {props.children}
        <button className="popup__button" type="submit" onSubmit={()=>console.log('submit')}>{props.buttonName}</button>
        <button className="popup__close" type="button" onClick={props.onClose} />
      </form>
    </section>
  )
};

export default PopupWithForm;
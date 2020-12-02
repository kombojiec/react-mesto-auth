// import React from 'react';

const ImagePopup = (props) => {
  
  const classes =['popup', 'popup_image', 'popup_dark'];
  if(props.card){classes.push('popup_opened');}

  return(
    <section className={classes.join(' ')} onClick={props.onOutsideClose}>
      <figure className="popup__figure">
        <img className="popup__image" src={props.card.link}
              alt={props.card.name} />
        <button className="popup__close popup__close_place_image" type="button" onClick={props.onClose}></button>
        <figcaption className="popup__figcaption">{props.card.name}</figcaption>
      </figure>
    </section>
  )
};


export default ImagePopup;
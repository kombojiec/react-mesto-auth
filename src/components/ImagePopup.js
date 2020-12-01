import React from 'react';

const ImagePopup = (props) => {
  
  const classes =['popup', 'popup_image', 'popup_dark'];
  if(props.isOpen){classes.push('popup_opened');}

  return(
    <section className={classes.join(' ')}>
      <figure className="popup__figure">
        <img className="popup__image" src={props.link}
              alt={props.alt} />
        <button className="popup__close popup__close_place_image" type="button"></button>
        <figcaption className="popup__figcaption"></figcaption>
      </figure>
    </section>
  )
};

export default ImagePopup;
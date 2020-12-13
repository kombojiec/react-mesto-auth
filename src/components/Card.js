import React, {useContext} from 'react';
import CurrentUserContext from '../contexts/CurrentUserContext'


const Card = (props) =>{

  const currentUser = useContext(CurrentUserContext);
  const isOwn = props.card.owner_id === currentUser._id
  const cardDeleteButtonClassName = (
    `card__delete-button ${isOwn ? 
    'card__delete-button_visible' :
    'card__delete-button_hidden'}`
  )
  const isLiked = props.card.likes.some(like => like._id === currentUser._id)
  const cardLikeButtonClassName = `...`;
  const handleClick = ()=>{
    props.onCardClick(props.card);
  };
  const handleLikeCard = () =>{
    props.onCardLike(props.card)
  }
  const handleDeleteClick = () =>{
    props.onCardDelete(props.card._id);
  }


  return(
    <article className="element">
      <img src={props.card.link} alt={props.card.name} className="element__image" onClick={handleClick} />
      <div className="element__description">
          <h2 className="element__title">{props.card.name}</h2>
          <div className="element__like-group">
          <button className="element__like" type="button" onClick={handleLikeCard}></button>
          <p className="element__like-counter">{props.card.likes.length}</p>
        </div>
        <button className="element__basket" type="button" onClick={handleDeleteClick}></button>
      </div>
    </article>
  )
};

export default Card;
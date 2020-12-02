
const Card = (props) =>{

  const handleClick = ()=>{
    props.onCardClick(props.card);
  };

  return(
    <article className="element">
      <img src={props.card.link} alt={props.card.name} className="element__image" onClick={handleClick} />
      <div className="element__description">
          <h2 className="element__title">{props.card.name}</h2>
          <div className="element__like-group">
          <button className="element__like" type="button"></button>
          <p className="element__like-counter">{props.card.likes.length}</p>
        </div>
        <button className="element__basket" type="button"></button>
      </div>
    </article>
  )
};

export default Card;
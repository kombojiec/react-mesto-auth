import React, {useState, useEffect, useContext} from 'react';
import api from '../utils/Api';
import Card from './Card';
import CurrentUserContext from '../contexts/CurrentUserContext'

const Main = (props) => {

  // const [userAvatar, setUserAvatar] = useState('');
  // const [userName, setUserName] = useState('');
  // const [userDescription, setUserDescription] = useState('');
  const [cards, setCards] = useState([]);
  const currentUser = useContext(CurrentUserContext);

  // useEffect(()=>{
  //   api.getUser()
  //   .then(promise => {
  //     setUserAvatar(promise.avatar);
  //     setUserName(promise.name);
  //     setUserDescription(promise.about);
  //   })
  //   .catch(result => console.error(result));    
  // },[]);

  useEffect(()=>{
    api.getCards()
    .then(promise =>{
      setCards(promise.map(item => item));
    })
    .catch(result => console.error(result));
  },[]);


  return(
    <main className="content">
      {/* <!--=================Profile=================== --> */}
      <section className="profile">
        <div className="profile__items">
          <div className="profile__avatar-wrap" onClick={props.onEditAvatar}>
            <img src={currentUser.avatar} alt={currentUser.name} className="profile__avatar" />
          </div>
          <div className="profile__info">
            <div className="profile__author">
              <div className="profile__name-wrap">
                <h1 className="profile__name">{currentUser.name}</h1>
                <button className="button profile__edit-button" type="button" onClick={props.onEditProfile} ></button>
              </div>              
                <p className="profile__business">{currentUser.about}</p>
            </div>            
          </div>
        </div>
        <button className="profile__add-button" type="button" onClick={props.onAddPlace}></button>
      </section>

      {/* <!--=================Elements=================== --> */}
      <section className="elements">     
        {cards.map((card) => {
          return (
            <Card 
              key={card._id} card={card} 
              onCardClick={props.onCardClick} 
            />
          )    
        })}
      </section>  

      {/* <!-- Попап подтверждения удаления --> */}
      <section className="popup popup_remove">
        <form className="popup__form ">
          <h2 className="popup__title popup__title_type_dark">Вы уверены?</h2>
          <button className="popup__button popup__button_remove" type="button">Да</button>
          <button className="popup__close popup__close_place_remove" type="submit"></button>
        </form>
      </section>
      
    </main>  
  )
};

export default Main;
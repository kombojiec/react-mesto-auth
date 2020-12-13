import React, {useState, useEffect} from 'react';
import '../index.css';
import Header from './Header';
import Main from './Main';
import Footer from './Footer';
import PopupWithForm from './PopupWithForm';
import ImagePopup from './ImagePopup';
import api from '../utils/Api';
import CurrentUserContext from '../contexts/CurrentUserContext';

function App() {

  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);
  const [selectedCard, setSelectedCard] = useState(null); 
  const [currentUser, setCurrentUser] = useState({});
  

  const handleAddPlace = ()=> setIsAddPlacePopupOpen(true);  
  const handleEditAvatar =()=> setIsEditAvatarPopupOpen(true); 
  const handleEditProfile = ()=> setIsEditProfilePopupOpen(true);
  const handleCardClick = (card)=> {setSelectedCard(card);};



  const closeAllPopups = ()=>{
    setIsEditAvatarPopupOpen(false);
    setIsEditProfilePopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setSelectedCard(null);
  };

  const closePopupOutside =(event)=>{
    if(event.target === event.currentTarget){
      closeAllPopups();
    }
  };


  useEffect(()=>{
    const popupOpened = ()=>{
      if(isEditAvatarPopupOpen || 
        isEditProfilePopupOpen || 
        selectedCard ||
        isAddPlacePopupOpen){return true;}
      return false;
    };

    if(!popupOpened()){
      return
    }
    
    const escapeOutside = (event)=>{
      if(event.key === 'Escape'){
      closeAllPopups();
      }
    };

    if(popupOpened()){
      document.addEventListener('keydown', escapeOutside);
    }

    return()=>{
      document.removeEventListener('keydown', escapeOutside);
    };    

  },[isEditAvatarPopupOpen, isEditProfilePopupOpen, selectedCard, isAddPlacePopupOpen]);

  useEffect(()=>{
    api.getUser()
    .then(response => {
      // console.log(response);
      setCurrentUser(response);
    }); 
  }, [])

  return (
    <CurrentUserContext.Provider value={currentUser} >
      <div className="App page" >
        <div className="page__container"  >  
    
          <Header />

          <Main     
            onEditAvatar={handleEditAvatar}      
            onEditProfile={handleEditProfile}      
            onAddPlace={handleAddPlace}
            onCardClick={handleCardClick}
          />   
            {/* Добавление автара*/}
          <PopupWithForm isOpen={isEditAvatarPopupOpen} onClose={closeAllPopups}
          onOutsideClose={closePopupOutside} title={'Обновить аватар'} name='avatar' buttonName='Сохранить'>
            <input type="url" className="popup__input popup__input_place_avatar" name="avatar-sourse" id="avatar-sourse" placeholder="https://somewebsite.com/someimage.jpg" required />
            <label className="popup__input-error" htmlFor="avatar-sourse" id="avatar-sourse-error"></label>
          </PopupWithForm>
            {/* Изменение профиля*/}
          <PopupWithForm isOpen={isEditProfilePopupOpen} onClose={closeAllPopups} onOutsideClose={closePopupOutside} title={'Редактировать профиль'} name='form_profile' buttonName='Сохранить' >
            <input type="text" className="popup__input popup__input_place_name" name="name" id="edit-name" minLength="2" maxLength="40" required />
            <label className="popup__input-error" htmlFor="edit-name" id="edit-name-error"></label>
            <input type="text" className="popup__input popup__input_place_business" name="about" id="edit-business" minLength="2" maxLength="200" required />
            <label className="popup__input-error" htmlFor="edit-business" id="edit-business-error"></label>
          </PopupWithForm>
            {/* Добавление карточки*/}
          <PopupWithForm isOpen={isAddPlacePopupOpen} onClose={closeAllPopups} onOutsideClose={closePopupOutside} title='Новое место'  name='form_card' buttonName="Создать">
            <input type="text" className="popup__input popup__input_place_place-name" name="card-name" id="card-name" placeholder="Название" minLength="2" maxLength="30" required />
            <label className="popup__input-error" htmlFor="card-name" id="card-name-error"></label>
            <input type="url" className="popup__input popup__input_place_source" name="card-sourse" id="card-sourse" placeholder="Ссылка на картинку" required />
            <label className="popup__input-error" htmlFor="card-sourse" id="card-sourse-error"></label>
          </PopupWithForm>
            {/* Просмотр карточки*/}
          <ImagePopup card={selectedCard} onClose={closeAllPopups} onOutsideClose={closePopupOutside} />

          <Footer />            
        </div>
      </div>
    </CurrentUserContext.Provider>  
  );
}

export default App;
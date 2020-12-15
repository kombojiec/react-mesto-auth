import React, {useState, useEffect} from 'react';
import '../index.css';
import Header from './Header';
import Main from './Main';
import Footer from './Footer';
import PopupWithForm from './PopupWithForm';
import ImagePopup from './ImagePopup';
import api from '../utils/Api';
import CurrentUserContext from '../contexts/CurrentUserContext';
import EditProfilePopup from './EditProfilePopup';
import EditAvatarPopup from './EditAvatarPopup';
import AddPlacePopup from './AddPlacePopup'

function App() {

  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);
  const [selectedCard, setSelectedCard] = useState(null); 
  const [currentUser, setCurrentUser] = useState({});
  const [cards, setCards] = useState([]);
    

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
      setCurrentUser(response);
    }); 
  }, [])

  function handleUpdateUser(data){
    api.setUser(data)
    .then(result => setCurrentUser(result));
    setIsEditProfilePopupOpen(!isEditProfilePopupOpen);
  }

  function handleUpdateAvatar(data){
    api.changeAvatar(data.avatar)
    .then(result => {
      setCurrentUser(result);
      setIsEditAvatarPopupOpen(!isEditAvatarPopupOpen)
    })
  }  

  useEffect(()=>{
    api.getCards()
    .then(promise =>{
      setCards(promise.map(item => item));
    })
    .catch(result => console.error(result));
  },[]);

  function handleCardLike(card){
    const isLiked = card.likes.some(like => like._id === currentUser._id);
    api.changeLikeCardStatus(card._id, !isLiked)
    .then(newCard => {
      const newCards = cards.map(item => item.id === card._id? newCard: item);
      setCards(newCards);
    })
  }

  function handleCardDelete(id){
    api.removeCard(id)
    .then(response => {
      const newCards = cards.filter(item => item._id !== id)
      setCards(newCards);
    })
  }

  function handleAddPlaceSubmit(data){
    api.addCard(data.name, data.link)
    .then(result => {
      setCards([result, ...cards]);
      setIsAddPlacePopupOpen(!isAddPlacePopupOpen);
    })

  }



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
            cards = {cards}
            onCardLike={handleCardLike}
            onCardDelete={handleCardDelete}
          />   
            {/* Добавление автара========================*/}
            <EditAvatarPopup 
              isOpen={isEditAvatarPopupOpen} 
              onClose={closeAllPopups}
              onOutsideClose={closePopupOutside}
              onUpdateAvatar={handleUpdateAvatar}
            >
            </EditAvatarPopup>

            {/* Изменение профиля=========================*/}
          <EditProfilePopup 
            isOpen={isEditProfilePopupOpen} 
            onClose={closeAllPopups} 
            onOutsideClose={closePopupOutside}
            onUpdateUser={handleUpdateUser}           
          >   
          </EditProfilePopup>

            {/* Добавление карточки=======================*/}
            <AddPlacePopup
              isOpen={isAddPlacePopupOpen}
              onClose={closeAllPopups}
              onOutsideClose={closePopupOutside} 
              onAddPlace={handleAddPlaceSubmit}
            >              
            </AddPlacePopup>     
          
            {/* Просмотр карточки==========================*/}
          <ImagePopup card={selectedCard} onClose={closeAllPopups} onOutsideClose={closePopupOutside} />

          <Footer />            
        </div>
      </div>
    </CurrentUserContext.Provider>  
  );
}

export default App;
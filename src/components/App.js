import React, {useState, useEffect} from 'react';
import '../index.css';
import Header from './Header';
import Main from './Main';
import Footer from './Footer';
import ImagePopup from './ImagePopup';
import api from '../utils/Api';
import ownerInfo from '../utils/constants'
import CurrentUserContext from '../contexts/CurrentUserContext';
import EditProfilePopup from './EditProfilePopup';
import EditAvatarPopup from './EditAvatarPopup';
import AddPlacePopup from './AddPlacePopup'
import PopupConfirmation from './PopupConfirmation';
import ErrorPopup from './ErrorPopup';

function App() {

  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);
  const [isPopupConfirmation, setIsPopupConfirmation] = useState(false);
  const [selectedCard, setSelectedCard] = useState({}); 
  const [imageShow, setImageShow] = useState(false);
  const [currentUser, setCurrentUser] = useState({});
  const [cards, setCards] = useState([]);
  const [isErrorPopupOpen, setIsErrorPopupOpen] = useState(false);
  const [errorResponse, setErrorResponse] = useState('')
  const [isLoading, setIsLoading] = useState('')  
  

  const handleAddPlace = ()=> setIsAddPlacePopupOpen(true);  
  const handleEditAvatar =()=> setIsEditAvatarPopupOpen(true); 
  const handleEditProfile = ()=> setIsEditProfilePopupOpen(true);  
  const handleCardClick = (card)=> {
    setSelectedCard(card);
    setImageShow(true)
  };

  const closeAllPopups = ()=>{
    setIsEditAvatarPopupOpen(false);
    setIsEditProfilePopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setImageShow(false)
    setIsPopupConfirmation(false)
    setIsErrorPopupOpen(false)
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
        imageShow ||
        isPopupConfirmation ||
        isErrorPopupOpen ||
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

  },[isEditAvatarPopupOpen, isEditProfilePopupOpen,
    imageShow, isAddPlacePopupOpen, 
    isPopupConfirmation, isErrorPopupOpen]);

  useEffect(()=>{
    api.getUser()
    .then(response => {
      ownerInfo.id = response._id;
      setCurrentUser(response);
    })
    .catch((response)=> {
      setErrorResponse(response);
      setIsErrorPopupOpen(true)
    })    
  }, [])

  function handleUpdateUser(data){
    api.setUser(data)
    .then(result => {
      setCurrentUser(result);
      setIsEditProfilePopupOpen(!isEditProfilePopupOpen);
    }) 
    .catch((response)=>{
      setErrorResponse(response);
      setIsErrorPopupOpen(true)
    })
    .finally(()=> {
      setIsLoading('');
    })
  }

  function handleUpdateAvatar(data){
    api.changeAvatar(data.avatar)
    .then(result => {
      setCurrentUser(result);      
      setIsEditAvatarPopupOpen(!isEditAvatarPopupOpen);
    })
    .catch(result => {
      setErrorResponse(result);
      setIsErrorPopupOpen(true)
    })
    .finally(()=> {
      setIsLoading('');
    });
  }  

  useEffect(()=>{
    api.getCards()
    .then(response =>{
      setCards(response.map(item => item));
    })
    .catch(result => {
      setErrorResponse(result);
      setIsErrorPopupOpen(true)
    });
  },[]);

  function handleCardLike(card){
    const isLiked = card.likes.some(like => like._id === currentUser._id);
    api.changeLikeCardStatus(card._id, !isLiked)
    .then(newCard => {
      const newCards = cards.map(item => item._id === newCard._id? newCard: item);
      setCards(newCards);
    })
    .catch(result => {
      setErrorResponse(result);
      setIsErrorPopupOpen(true)
    })
  }

  function confirmDelete(id){
    setIsPopupConfirmation(id);  
  }
  function handleDeleteCard(event){
    event.preventDefault();
    api.removeCard(isPopupConfirmation)
    .then(response => {
      const newCards = cards.filter(item => item._id !== isPopupConfirmation);
      setCards(newCards);
      setIsPopupConfirmation(false);
    })
    .catch(result => {
      setErrorResponse(result);
      setIsErrorPopupOpen(true)
    })
    .finally(()=> {
      setIsLoading('');
    });
  }  

  function handleAddPlaceSubmit(data){
    api.addCard(data.name, data.link)
    .then(result => {
      setCards([result, ...cards]);
      setIsAddPlacePopupOpen(!isAddPlacePopupOpen);
    })
    .catch(result => {
      setErrorResponse(result);
      setIsErrorPopupOpen(true)
    })
    .finally(()=> {
      setIsLoading('');
    });
  }

  const handleButtonLoading = (value) =>{
    setIsLoading(value);
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
              onCardDelete={confirmDelete}              
            />   
              {/* Добавление автара========================*/}
              <EditAvatarPopup 
                isOpen={isEditAvatarPopupOpen} 
                isLoading={isLoading}
                onChangeButton={handleButtonLoading}
                onClose={closeAllPopups}
                onOutsideClose={closePopupOutside}
                onUpdateAvatar={handleUpdateAvatar}
              >
              </EditAvatarPopup>

              {/* Изменение профиля=========================*/}
            <EditProfilePopup 
              isOpen={isEditProfilePopupOpen} 
              isLoading={isLoading}
              onChangeButton={handleButtonLoading}
              onClose={closeAllPopups} 
              onOutsideClose={closePopupOutside}
              onUpdateUser={handleUpdateUser}           
            >   
            </EditProfilePopup>

            {/* Добавление карточки=======================*/}
            <AddPlacePopup
              isOpen={isAddPlacePopupOpen}
              isLoading={isLoading}
              onChangeButton={handleButtonLoading}
              onClose={closeAllPopups}
              onOutsideClose={closePopupOutside} 
              onAddPlace={handleAddPlaceSubmit}
            >              
            </AddPlacePopup>     
            
            {/* Просмотр карточки==========================*/}
            <ImagePopup 
              card={selectedCard} 
              isOpen={imageShow}
              onClose={closeAllPopups} 
              onOutsideClose={closePopupOutside} />

            {/* <!-- Попап подтверждения удаления --> */}
            <PopupConfirmation 
              isOpen={isPopupConfirmation}
              isLoading={isLoading}
              onChangeButton={handleButtonLoading}
              onClose={closeAllPopups}
              onOutsideClose={closePopupOutside} 
              onDelete={handleDeleteCard}
            >
            </PopupConfirmation>
            
            {/* Вывод ошибки==========================*/}
            <ErrorPopup
              isOpen={isErrorPopupOpen}
              onClose={closeAllPopups}
              onOutsideClose={closePopupOutside} 
              error={errorResponse}
            >
            </ErrorPopup>

            <Footer />            
          </div>
        </div>
    </CurrentUserContext.Provider>  
  );
}

export default App;
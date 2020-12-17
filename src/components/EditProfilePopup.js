import React, {useState, useContext, useEffect, useRef} from 'react';
import PopupWithForm from './PopupWithForm';
import CurrentUserContext from '../contexts/CurrentUserContext';

const EditProfilePopup = (props) =>{

  const inputName = useRef();
  const inputDescription = useRef();
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const currentUser = useContext(CurrentUserContext);

  useEffect(()=>{
    if(!props.isOpen){
      inputName.current.value = currentUser.name;
      inputDescription.current.value = currentUser.about;
    }
  },[props.isOpen, currentUser])

  const handleNameChange = (event => {
    setName(event.target.value)
  })
  const handleDescriptionChange = (event => {
    setDescription(event.target.value);
  })

  useEffect(()=>{
    setName(currentUser.name);
    setDescription(currentUser.about);
  }, [currentUser])

  function handleSubmit(event){
    event.preventDefault();
    props.onChangeButton('Loading...');
    props.onUpdateUser({
      name,
      about: description,
    })
  }

  return(
    <PopupWithForm 
      isOpen={props.isOpen} 
      isLoading={props.isLoading}
      onClose={props.onClose} 
      onOutsideClose={props.onOutsideClose} 
      title={'Редактировать профиль'} name='form_profile' 
      buttonName='Сохранить' onSubmit={handleSubmit} >
<<<<<<< HEAD
      <input type="text" className="popup__input popup__input_place_name" name="name" id="edit-name" minLength="2" maxLength="40" required ref={inputName} onChange={handleNameChange}/>
      <label className="popup__input-error" htmlFor="edit-name" id="edit-name-error"></label>
      <input type="text" className="popup__input popup__input_place_business" name="about" id="edit-business" minLength="2" maxLength="200" required ref={inputDescription} onChange={handleDescriptionChange} />
=======
      <input type="text" className="popup__input popup__input_place_name" name="name" id="edit-name" minLength="2" maxLength="40" value={name || ""} onChange={handleNameChange}/>
      <label className="popup__input-error" htmlFor="edit-name" id="edit-name-error"></label>
      <input type="text" className="popup__input popup__input_place_business" name="about" id="edit-business" minLength="2" maxLength="200" required value={description  || ""} onChange={handleDescriptionChange} />
>>>>>>> develop
      <label className="popup__input-error" htmlFor="edit-business" id="edit-business-error"></label>
    </PopupWithForm>
  )

}

export default EditProfilePopup;
import React from 'react';
import avatar from '../images/avatar.jpg';

const Main = (props) => {

  return(
    <main className="content">
      {/* <!--=================Profile=================== --> */}
      <section className="profile">
        <div className="profile__items">
          <div className="profile__avatar-wrap" onClick={props.onEditAvatar}>
            <img src={avatar} alt="Аватар" className="profile__avatar" />
          </div>
          <div className="profile__info">
            <div className="profile__author">
              <div className="profile__name-wrap">
                <h1 className="profile__name">Жак-Ив Кусто</h1>
                <button className="button profile__edit-button" type="button" onClick={props.onEditProfile} ></button>
              </div>              
              <p className="profile__business">Исследователь океана</p>
            </div>            
          </div>
        </div>
        <button className="profile__add-button" type="button" onClick={props.onAddPlace}></button>
      </section>

      {/* <!--=================Elements=================== --> */}
      <section className="elements">
        <template className="elements__template">
          <article className="element">
            <img src="#" alt="" className="element__image" />
            <div className="element__description">
              <h2 className="element__title">Header</h2>
              <div className="element__like-group">
                <button className="element__like" type="button"></button>
                <p className="element__like-counter"></p>
              </div>
              <button className="element__basket" type="button"></button>
            </div>
          </article>
        </template>        
      </section>      

      {/* <!--=================PopUp=================== --> */}
      {/* <!-- Попам редактирования профиля --> */}
      {/* <section className="popup popup_form_profile">       
        <form action="#" className="popup__form" noValidate>
          <h2 className="popup__title">Редактировать профиль</h2>
          <input type="text" className="popup__input popup__input_place_name" name="name" id="edit-name" minLength="2" maxLength="40" required />
          <label className="popup__input-error" htmlFor="edit-name" id="edit-name-error"></label>
          <input type="text" className="popup__input popup__input_place_business" name="about" id="edit-business" minLength="2" maxLength="200" required />
          <label className="popup__input-error" htmlFor="edit-business" id="edit-business-error"></label>
          <button className="popup__button" type="submit">Сохранить</button>
          <button className="popup__close popup__close_place_profile" type="button"></button>
        </form>
      </section> */}

      {/* <!-- Попам добавления карточки --> */}
      {/* <section className="popup popup_form_card">
        <form action="#" className="popup__form" noValidate>
          <h2 className="popup__title">Новое место</h2>
          <input type="text" className="popup__input popup__input_place_place-name" name="card-name" id="card-name" placeholder="Название" minLength="2" maxLength="30" required />
          <label className="popup__input-error" htmlFor="card-name" id="card-name-error"></label>
          <input type="url" className="popup__input popup__input_place_source" name="card-sourse" id="card-sourse" placeholder="Ссылка на картинку" required />
          <label className="popup__input-error" htmlFor="card-sourse" id="card-sourse-error"></label>
          <button className="popup__button" type="submit">Создать</button>
          <button className="popup__close popup__close_place_card" type="button"></button>
        </form>
      </section> */}

      {/* <!-- Попам просмотра карточки --> */}
      {/* <section className="popup popup_image popup_dark">
        <figure className="popup__figure">
          <img className="popup__image" src="#"
                alt="#" />
          <button className="popup__close popup__close_place_image" type="button"></button>
          <figcaption className="popup__figcaption"></figcaption>
        </figure>
      </section> */}

      {/* <!-- Попам подтверждения удаления --> */}
      <section className="popup popup_remove">
        <form className="popup__form ">
          <h2 className="popup__title popup__title_type_dark">Вы уверены?</h2>
          <button className="popup__button popup__button_remove" type="button">Да</button>
          <button className="popup__close popup__close_place_remove" type="submit"></button>
        </form>
      </section>

      {/* <!-- Попам обновления аватара --> */}
      {/* <section className="popup popup_avatar">
        <form action="#" className="popup__form" noValidate>
          <h2 className="popup__title">Обновить аватар</h2>          
          <input type="url" className="popup__input popup__input_place_avatar" name="avatar-sourse" id="avatar-sourse" placeholder="https://somewebsite.com/someimage.jpg" required />
          <label className="popup__input-error" htmlFor="avatar-sourse" id="avatar-sourse-error"></label>
          <button className="popup__button" type="submit">Сохранить</button>
          <button className="popup__close popup__close_place_card" type="button"></button>
        </form>
      </section> */}

      {/* <!-- Попам оповещения об ошибке --> */}
      {/* <section className="popup popup_error ">
        <div action="#" className="popup__form" noValidate>
          <h2 className="popup__title">Что-то пошло не так...</h2>          
          <p className="popup__text">При отправке данных произошла ошибка. Проверьте данные или повторите запрос позже.</p>
          <button className="popup__close popup__close_place_error" type="button"></button>
        </div>
      </section>    */}
    </main>  
  )
};

export default Main;
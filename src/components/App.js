import React from 'react';
import Header from './Header';
import Main from './Main';
import Footer from './Footer';
import PopupWithForm from './PopupWithForm';
import ImagePopup from './ImagePopup';

function App(props) {
    const [isEditProfilePopupOpen, setProfilePopupStatus] = React.useState(false);
    const [isAddPlacePopupOpen, setAddPlacePopupStatus] = React.useState(false);
    const [isEditAvatarPopupOpen, setEditAvatarPopupStatus] = React.useState(false);
    const [selectedCard, setSelectedCard] = React.useState({});

    function handleEditAvatarClick() {
        setEditAvatarPopupStatus(true);
    }

    function handleEditProfileClick() {
        setProfilePopupStatus(true);
    }

    function handleAddPlaceClick() {
        setAddPlacePopupStatus(true);
    }

    function handleCardClick(props) {
        setSelectedCard(props);
    }

    function closeAllPopups() {
        setProfilePopupStatus(false);
        setAddPlacePopupStatus(false);
        setEditAvatarPopupStatus(false);
        setSelectedCard({});
    }

    return (
        <>
            <Header />
            <Main onEditProfile={handleEditProfileClick} onAddPlace={handleAddPlaceClick} onEditAvatar={handleEditAvatarClick} onCardClick={handleCardClick} />
            <Footer />
            <PopupWithForm name="profile" title="Редактировать профиль" isOpen={isEditProfilePopupOpen} onClose={closeAllPopups}>
                <input type="text" className="popup__input popup__input_type_name" placeholder="Жак-Ив Кусто"
                    name="inputName" required minLength="2" maxLength="40" id="input-name" />
                <span className="popup__error" id="input-name-error"></span>
                <input type="text" className="popup__input popup__input_type_activity" placeholder="Исследователь океана"
                    name="inputActivity" required minLength="2" maxLength="200" id="input-activity" />
                <span className="popup__error" id="input-activity-error"></span>
            </PopupWithForm>
            <PopupWithForm name="update-avatar" title="Обновить аватар" isOpen={isEditAvatarPopupOpen} onClose={closeAllPopups}>
                <input className="popup__input popup__input_type_avatar-link" placeholder="Ссылка на картинку"
                    name="inputAvatarLink" required type="url" id="input-avatar-link" />
                <span className="popup__error" id="input-avatar-link-error"></span>
            </PopupWithForm>
            <PopupWithForm name="card" title="Новое место" isOpen={isAddPlacePopupOpen} onClose={closeAllPopups}>
                <input type="text" className="popup__input popup__input_type_card-name" placeholder="Название"
                    name="inputCardName" required minLength="2" maxLength="30" id="input-card-name" />
                <span className="popup__error" id="input-card-name-error"></span>
                <input className="popup__input popup__input_type_card-link" placeholder="Ссылка на картинку"
                    name="inputCardLink" required id="input-card-link" type="url" />
                <span className="popup__error" id="input-card-link-error"></span>
            </PopupWithForm>
            <PopupWithForm name="delete-card" title="Вы уверены?" onClose={closeAllPopups} />
            <ImagePopup card={selectedCard} onClose={closeAllPopups} />
        </>
    );
}

export default App;

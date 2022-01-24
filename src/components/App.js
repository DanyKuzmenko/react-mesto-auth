import React from 'react';
import Header from './Header';
import Main from './Main';
import Footer from './Footer';
import PopupWithForm from './PopupWithForm';
import ImagePopup from './ImagePopup';

class App extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            isEditProfilePopupOpen: false,
            isAddPlacePopupOpen: false,
            isEditAvatarPopupOpen: false,
            selectedCard: {}
        };
    }

    handleEditAvatarClick = () => {
        this.setState({ isEditAvatarPopupOpen: true });
    }

    handleEditProfileClick = () => {
        this.setState({ isEditProfilePopupOpen: true });
    }

    handleAddPlaceClick = () => {
        this.setState({ isAddPlacePopupOpen: true });
    }

    handleCardClick = (props) => {
        this.setState({ selectedCard: props });
    }

    closeAllPopups = () => {
        this.setState({
            isEditProfilePopupOpen: false,
            isAddPlacePopupOpen: false,
            isEditAvatarPopupOpen: false,
            selectedCard: {}
        })
    }

    render() {
        return (
            <>
                <Header />
                <Main onEditProfile={this.handleEditProfileClick} onAddPlace={this.handleAddPlaceClick} onEditAvatar={this.handleEditAvatarClick} onCardClick={this.handleCardClick} />
                <Footer />
                <PopupWithForm name="profile" title="Редактировать профиль" isOpen={this.state.isEditProfilePopupOpen} onClose={this.closeAllPopups}>
                    <input type="text" className="popup__input popup__input_type_name" placeholder="Жак-Ив Кусто"
                        name="inputName" required minLength="2" maxLength="40" id="input-name" />
                    <span className="popup__error" id="input-name-error"></span>
                    <input type="text" className="popup__input popup__input_type_activity" placeholder="Исследователь океана"
                        name="inputActivity" required minLength="2" maxLength="200" id="input-activity" />
                    <span className="popup__error" id="input-activity-error"></span>
                </PopupWithForm>
                <PopupWithForm name="update-avatar" title="Обновить аватар" isOpen={this.state.isEditAvatarPopupOpen} onClose={this.closeAllPopups}>
                    <input className="popup__input popup__input_type_avatar-link" placeholder="Ссылка на картинку"
                        name="inputAvatarLink" required type="url" id="input-avatar-link" />
                    <span className="popup__error" id="input-avatar-link-error"></span>
                </PopupWithForm>
                <PopupWithForm name="card" title="Новое место" isOpen={this.state.isAddPlacePopupOpen} onClose={this.closeAllPopups}>
                    <input type="text" className="popup__input popup__input_type_card-name" placeholder="Название"
                        name="inputCardName" required minLength="2" maxLength="30" id="input-card-name" />
                    <span className="popup__error" id="input-card-name-error"></span>
                    <input className="popup__input popup__input_type_card-link" placeholder="Ссылка на картинку"
                        name="inputCardLink" required id="input-card-link" type="url" />
                    <span className="popup__error" id="input-card-link-error"></span>
                </PopupWithForm>
                <PopupWithForm name="delete-card" title="Вы уверены?" onClose={this.closeAllPopups} />
                <ImagePopup card={this.state.selectedCard} onClose={this.closeAllPopups} />
            </>
        );
    }
}

export default App;

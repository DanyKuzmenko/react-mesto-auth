import React from 'react';
import Header from './Header';
import Main from './Main';
import Footer from './Footer';
import ImagePopup from './ImagePopup';
import apiClass from '../utils/api';
import { CurrentUserContext } from '../contexts/CurrentUserContext';
import EditProfilePopup from './EditProfilePopup';
import EditAvatarPopup from './EditAvatarPopup';
import AddPlacePopup from './AddPlacePopup';
import DeleteCardPopup from './DeleteCardPopup';

// валидацию форм сделать не успел, сделаю позже:))

function App() {
    const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = React.useState(false);
    const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = React.useState(false);
    const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = React.useState(false);
    const [isDeleteCardPopupOpen, setIsDeleteCardPopupOpen] = React.useState(false);
    const [selectedCard, setSelectedCard] = React.useState({});
    const [currentUser, setCurrentUser] = React.useState({});
    const [cards, addCard] = React.useState([]);
    const [selectedDeleteCard, setSelectedDeleteCard] = React.useState({});
    //Добавил новый пропс, для удаления карточки с помощью попапа
    const [addPlaceButtonName, setAddPlaceButtonName] = React.useState('Создать');
    const [userPopupButtonName, setUserPopupButtonName] = React.useState('Сохранить');
    const [deleteCardPopupButtonName, setDeleteCardPopupButtonName] = React.useState('Да');
    // добавил стейты для управления содержимым кнопки при сабмите формы. Передаю стейт с помощью пропса
    // buttonName, а сам стейт изменяю в App.js. Также для аватара пользователя и его информации сделал один стейт
    // т.к. содержимое кнопки одинаковое

    React.useEffect(() => {
        apiClass.getUserApiInfo()
            .then(res => {
                setCurrentUser(res);
            })
            .catch(err => console.log(err));
        apiClass.getInitialCards()
            .then((res) => {
                addCard(res);
            })
            .catch(error => console.log(error));
        const closeByEscape = (e) => {
            if (e.key === 'Escape') {
                closeAllPopups();
            }
        }
        document.addEventListener('keydown', closeByEscape);
        return () => document.removeEventListener('keydown', closeByEscape);
    }, []);
    // Сначала выполнил проект с помощью классовых компонентов, только потом посмотрел вебинар и понял,
    // что хуки намного современее и нужно использовать их. Переделал все под хуки, но не уверен что правильно.
    // Сделал зависимости от изменения данных, чтобы данные приходили 1 раз. Можете пожалуйста оставить комментарий
    // правильно ли сделал?

    function handleCardLike(card) {
        const isLiked = card.likes.some(i => i._id === currentUser._id);
        apiClass.changeLikeCardStatus(card.id, isLiked).
            then((newCard) => {
                addCard((cards) => cards.map(c => c._id === card.id ? newCard : c))
            })
            .catch(err => console.log(err))
    }

    function handleCardDelete(card) {
        setIsDeleteCardPopupOpen(true);
        setSelectedDeleteCard(card);
    }

    function handleEditAvatarClick() {
        setIsEditAvatarPopupOpen(true);
    }

    function handleEditProfileClick() {
        setIsEditProfilePopupOpen(true);
    }

    function handleAddPlaceClick() {
        setIsAddPlacePopupOpen(true);
    }

    function handleCardClick(props) {
        setSelectedCard(props);
    }

    function closeAllPopups() {
        setIsEditProfilePopupOpen(false);
        setIsAddPlacePopupOpen(false);
        setIsEditAvatarPopupOpen(false);
        setIsDeleteCardPopupOpen(false);
        setSelectedCard({});
    }

    function handleUpdateUser({ name, about }) {
        setUserPopupButtonName('Сохранение...');
        apiClass.sendUserApiInfo(name, about)
            .then((res) => {
                setCurrentUser(res);
                closeAllPopups();
            })
            .catch(err => console.log(err))
            .finally(() => {
                setUserPopupButtonName('Сохранить');
            })
    }

    function handleUpdateAvatar({ avatar }) {
        setUserPopupButtonName('Сохранение...');
        apiClass.updateAvatar(avatar)
            .then((res) => {
                setCurrentUser(res);
                closeAllPopups();
            })
            .catch(err => console.log(err))
            .finally(() => {
                setUserPopupButtonName('Сохранить');
            })
    }

    function handleAddPlaceSubmit({ name, link }) {
        setAddPlaceButtonName('Создание...');
        apiClass.sendCardInfo(name, link)
            .then((newCard) => {
                addCard([newCard, ...cards]);
                closeAllPopups();
            })
            .catch(err => console.log(err))
            .finally(() => {
                setAddPlaceButtonName('Создать');
            })
    }

    function handleDeleteCardSubmit() {
        setDeleteCardPopupButtonName('Удаление...');
        apiClass.deleteApiCard(selectedDeleteCard.id)
            .then(() => {
                addCard((cards) => cards.filter(item => item._id !== selectedDeleteCard.id));
                closeAllPopups();
            })
            .catch(err => console.log(err))
            .finally(() => {
                setDeleteCardPopupButtonName('Да');
            })
    }

    return (
        <CurrentUserContext.Provider value={currentUser}>
            <Header />
            <Main
                onEditProfile={handleEditProfileClick}
                onAddPlace={handleAddPlaceClick}
                onEditAvatar={handleEditAvatarClick}
                onCardClick={handleCardClick}
                cards={cards}
                onCardLike={handleCardLike}
                onCardDelete={handleCardDelete} />
            <Footer />
            <EditProfilePopup
                isOpen={isEditProfilePopupOpen}
                onClose={closeAllPopups}
                onUpdateUser={handleUpdateUser}
                buttonName={userPopupButtonName} />
            <EditAvatarPopup
                isOpen={isEditAvatarPopupOpen}
                onClose={closeAllPopups}
                onUpdateAvatar={handleUpdateAvatar}
                buttonName={userPopupButtonName} />
            <AddPlacePopup
                isOpen={isAddPlacePopupOpen}
                onClose={closeAllPopups}
                onUpdateCard={handleAddPlaceSubmit}
                buttonName={addPlaceButtonName} />
            <DeleteCardPopup
                isOpen={isDeleteCardPopupOpen}
                onClose={closeAllPopups}
                onDeleteCard={handleDeleteCardSubmit}
                buttonName={deleteCardPopupButtonName} />
            <ImagePopup card={selectedCard} onClose={closeAllPopups} />
        </CurrentUserContext.Provider>
    );
}

export default App;

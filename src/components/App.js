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

function App() {
    const [isEditProfilePopupOpen, setProfilePopupStatus] = React.useState(false);
    const [isAddPlacePopupOpen, setAddPlacePopupStatus] = React.useState(false);
    const [isEditAvatarPopupOpen, setEditAvatarPopupStatus] = React.useState(false);
    const [isDeleteCardPopupOpen, setDeleteCardPopupStatus] = React.useState(false);
    const [selectedCard, setSelectedCard] = React.useState({});
    const [currentUser, setCurrentUser] = React.useState({});
    const [cards, addCard] = React.useState([]);
    const [selectedDeleteCard, setSelectedDeleteCard] = React.useState({});
    //Добавил новый пропс, для удаления карточки с помощью попапа

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
    }, [addCard, setCurrentUser]);
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
        setDeleteCardPopupStatus(true);
        setSelectedDeleteCard(card);
    }

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
        setDeleteCardPopupStatus(false);
        setSelectedCard({});
    }

    function handleUpdateUser({ name, about }) {
        apiClass.sendUserApiInfo(name, about)
            .then(() => {
                setCurrentUser({ name, about });
                closeAllPopups();
            })
            .catch(err => console.log(err))
    }

    function handleUpdateAvatar({ avatar }) {
        apiClass.updateAvatar(avatar)
            .then(() => {
                setCurrentUser({ avatar });
                closeAllPopups();
            })
            .catch(err => console.log(err))
    }

    function handleAddPlaceSubmit({ name, link }) {
        apiClass.sendCardInfo(name, link)
            .then((newCard) => {
                addCard([newCard, ...cards]);
                closeAllPopups();
            })
            .catch(err => console.log(err))
    }

    function handleDeleteCardSubmit() {
        apiClass.deleteApiCard(selectedDeleteCard.id)
            .then(() => {
                addCard((cards) => cards.filter(item => item._id !== selectedDeleteCard.id));
                closeAllPopups();
            })
            .catch(err => console.log(err))
    }

    return (
        <>
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
                    onUpdateUser={handleUpdateUser} />
                <EditAvatarPopup
                    isOpen={isEditAvatarPopupOpen}
                    onClose={closeAllPopups}
                    onUpdateAvatar={handleUpdateAvatar} />
                <AddPlacePopup
                    isOpen={isAddPlacePopupOpen}
                    onClose={closeAllPopups}
                    onUpdateCard={handleAddPlaceSubmit} />
                <DeleteCardPopup
                    isOpen={isDeleteCardPopupOpen}
                    onClose={closeAllPopups}
                    onDeleteCard={handleDeleteCardSubmit} />
                <ImagePopup card={selectedCard} onClose={closeAllPopups} />
            </CurrentUserContext.Provider>
        </>
    );
}

export default App;

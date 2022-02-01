import avatarChange from '../images/change-avatar.svg';
import React from 'react';
import apiClass from '../utils/api';
import Card from './Card';

function Main(props) {
    const [userName, setUserName] = React.useState('');
    const [userDescription, setUserDescription] = React.useState('');
    const [userAvatar, setUserAvatar] = React.useState('');
    const [cards, addCard] = React.useState([]);

    React.useEffect(() => {
        apiClass.getUserApiInfo()
            .then((res) => {
                setUserName(res.name);
                setUserDescription(res.about);
                setUserAvatar(res.avatar);
            })
            .catch(error => console.log(error));
        apiClass.getInitialCards()
            .then((res) => {
                addCard(res);
            })
            .catch(error => console.log(error));
    }, [setUserName, setUserDescription, setUserAvatar, addCard])
    // Сначала выполнил проект с помощью классовых компонентов, только потом посмотрел вебинар и понял,
    // что хуки намного современее и нужно использовать их. Переделал все под хуки, но не уверен что правильно.
    // Сделал зависимости от изменения данных, чтобы данные приходили 1 раз. Можете пожалуйста оставить комментарий
    // правильно ли сделал?

    return (
        <main className="content">
            <section className="profile">
                <div className="profile__position">
                    <img src={avatarChange} alt="Изменить аватар." className="profile__avatar-change" />
                    <img src={userAvatar} alt="Жак-Ив Кусто в центре фото, на заднем плане море." className="profile__avatar" onClick={props.onEditAvatar} />
                    <div className="profile__info">
                        <div className="profile__info-position">
                            <h1 className="profile__name">{userName}</h1>
                            <p className="profile__activity">{userDescription}</p>
                        </div>
                        <button type="button" aria-label="Редактировать профиль." className="profile__edit-button" onClick={props.onEditProfile} ></button>
                    </div>
                </div>
                <button type="button" aria-label="Добавить карточку." className="profile__add-button" onClick={props.onAddPlace}></button>
            </section>
            <section className="cards">
                {cards.map(item => <Card name={item.name} link={item.link} likes={item.likes.length} onCardClick={props.onCardClick} key={item._id} />)}
            </section>
        </main>
    )
}

export default Main;
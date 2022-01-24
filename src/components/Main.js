import avatarChange from '../images/change-avatar.svg';
import React from 'react';
import apiClass from '../utils/api';
import Card from './Card';

class Main extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            userName: '',
            userDescription: '',
            userAvatar: '',
            cards: []
        }
    }

    componentDidMount() {
        apiClass.getUserApiInfo()
            .then((res) => {
                this.setState({ userName: res.name })
                this.setState({ userAvatar: res.avatar })
                this.setState({ userDescription: res.about })
            })
            .catch(error => console.log(error));
        apiClass.getInitialCards()
            .then((res) => {
                this.setState({ cards: res })
            })
    }

    render() {
        return (
            <main className="content">
                <section className="profile">
                    <div className="profile__position">
                        <img src={avatarChange} alt="Изменить аватар." className="profile__avatar-change" onClick={this.props.onEditAvatar} />
                        <img src={this.state.userAvatar} alt="Жак-Ив Кусто в центре фото, на заднем плане море." className="profile__avatar" />
                        <div className="profile__info">
                            <div className="profile__info-position">
                                <h1 className="profile__name">{this.state.userName}</h1>
                                <p className="profile__activity">{this.state.userDescription}</p>
                            </div>
                            <button type="button" aria-label="Редактировать профиль." className="profile__edit-button" onClick={this.props.onEditProfile} ></button>
                        </div>
                    </div>
                    <button type="button" aria-label="Добавить карточку." className="profile__add-button" onClick={this.props.onAddPlace}></button>
                </section>
                <section className="cards">
                    {this.state.cards.map(item => <Card name={item.name} link={item.link} likes={item.likes.length} onCardClick={this.props.onCardClick} key={item._id} />)}
                </section>
            </main>
        )
    }
}

export default Main;
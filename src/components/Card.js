import React from "react";

class Card extends React.Component {
    constructor(props) {
        super(props)
    }

    handleClick = () => {
        this.props.onCardClick(this.props);
    }

    render() {
        return (
            <article className="card">
                <img src={this.props.link} alt={this.props.name} className="card__image" onClick={this.handleClick} />
                <button className="card__delete-icon" type="button" aria-label="Удалить карточку."></button>
                <div className="card__body">
                    <h2 className="card__title">{this.props.name}</h2>
                    <div className="card__like-body">
                        <button type="button" aria-label="Добавить в любимые." className="card__like"></button>
                        <p className="card__like-number">{this.props.likes}</p>
                    </div>
                </div>
            </article>
        )
    }
}

export default Card;
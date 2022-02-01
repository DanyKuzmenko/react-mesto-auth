import React from "react";

function Card(props) {
    function handleClick() {
        props.onCardClick(props);
    }

    return (
        <article className="card">
            <img src={props.link} alt={props.name} className="card__image" onClick={handleClick} />
            <button className="card__delete-icon" type="button" aria-label="Удалить карточку."></button>
            <div className="card__body">
                <h2 className="card__title">{props.name}</h2>
                <div className="card__like-body">
                    <button type="button" aria-label="Добавить в любимые." className="card__like"></button>
                    <p className="card__like-number">{props.likes}</p>
                </div>
            </div>
        </article>
    )
}

export default Card;
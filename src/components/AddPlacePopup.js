import React from "react";
import PopupWithForm from "./PopupWithForm";

function AddPlacePopup(props) {
    const [name, setName] = React.useState('');
    const [link, setLink] = React.useState('');
    const [buttonName, setButtonName] = React.useState('Создать');

    function handleNameChange(e) {
        setName(e.target.value);
    }

    function handleLinkChange(e) {
        setLink(e.target.value);
    }

    function handleSubmit(e) {
        e.preventDefault();
        setButtonName('Создание...');
        props.onUpdateCard({
            name: name,
            link: link
        })
        e.target.reset();
        //сделал очистку полей при самбите, или лучше при открытии?
    }

    return (
        <PopupWithForm
            name="card"
            title="Новое место"
            buttonName={buttonName}
            isOpen={props.isOpen}
            onClose={props.onClose} 
            onSubmit={handleSubmit} >
            <input
                type="text"
                className="popup__input popup__input_type_card-name"
                placeholder="Название"
                name="inputCardName"
                required
                minLength="2"
                maxLength="30"
                id="input-card-name"
                onChange={handleNameChange} />
            <span
                className="popup__error"
                id="input-card-name-error"></span>
            <input
                className="popup__input popup__input_type_card-link"
                placeholder="Ссылка на картинку"
                name="inputCardLink"
                required
                id="input-card-link"
                type="url" 
                onChange={handleLinkChange} />
            <span
                className="popup__error"
                id="input-card-link-error"></span>
        </PopupWithForm>
    )
}

export default AddPlacePopup;